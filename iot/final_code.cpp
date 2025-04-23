#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "Digital Partner";
const char* password = "56B5E807";

// Backend API URLs
const char* backend_match_url = "http://192.168.8.119:8000/api/iot/status";
const char* backend_mismatch_url = "http://192.168.8.119:8000/api/iot/mismatch";
const char* backend_exit_url = "http://192.168.8.119:8000/api/iot/exit";

// Server and peripherals
AsyncWebServer server(80);
Servo gateServo;
LiquidCrystal_I2C lcd(0x27, 16, 2);

// IR sensor pins and slot names
const int irPins[4] = {12, 13, 4, 0};
String irSlotNames[4] = {"SLOT2", "SLOT3", "SLOT5", "SLOT6"};

// State tracking
String bookingIds[4] = {"", "", "", ""};
bool vehicleInside[4] = {false, false, false, false};
bool pendingParking[4] = {false, false, false, false};

// Timing constants
const int SERVO_OPEN = 5;
const int SERVO_CLOSED = 80;
const unsigned long exitOpenTime = 5000;
const unsigned long exitCloseDelay = 3000;

// Display shared parking credit
void showDefaultScreen() {
  delay(4000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Shared Parking");
  lcd.setCursor(0, 1);
  lcd.print("Salman Faris");
}

// Notify backend
void notifyBackend(String slotNo, String bookingId) {
  HTTPClient http;
  http.begin(backend_match_url);
  http.addHeader("Content-Type", "application/json");
  String payload = "{\"bookingId\":\"" + bookingId + "\",\"detectedSlot\":\"" + slotNo + "\",\"status\":\"matched\"}";
  http.POST(payload);
  http.end();
}

void notifyMismatch(String bookingId, String detectedSlot) {
  HTTPClient http;
  http.begin(backend_mismatch_url);
  http.addHeader("Content-Type", "application/json");
  String payload = "{\"bookingId\":\"" + bookingId + "\",\"detectedSlot\":\"" + detectedSlot + "\",\"status\":\"mismatch\"}";
  http.POST(payload);
  http.end();
}

void notifyExit(String bookingId) {
  if (bookingId == "") {
    Serial.println("❌ Booking ID is empty! Not sending.");
    return;
  }

  HTTPClient http;
  http.begin(backend_exit_url);
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"bookingId\":\"" + bookingId + "\"}";
  Serial.println("📤 Sending exit payload: " + payload);

  int httpCode = http.POST(payload);
  String response = http.getString();

  Serial.print("📡 HTTP Response code: ");
  Serial.println(httpCode);
  Serial.print("🔙 Server Response: ");
  Serial.println(response);

  http.end();
}

void setup() {
  Serial.begin(115200);

  gateServo.attach(2);
  gateServo.write(SERVO_CLOSED);
  Wire.begin(14, 15);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Starting...");

  for (int i = 0; i < 4; i++) pinMode(irPins[i], INPUT);

  lcd.clear();
  lcd.print("Connecting WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    lcd.setCursor(0, 1);
    lcd.print(".");
  }

  lcd.clear();
  lcd.print("Connected!");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  showDefaultScreen();

  server.on("/command", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL,
    [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      StaticJsonDocument<300> doc;
      DeserializationError error = deserializeJson(doc, data);
      if (error) {
        request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
        return;
      }

      String action = doc["action"];
      String requestedSlot = doc["slot"];
      String plate = doc["plate"];
      String bookingId = doc["booking_id"];
      String status = doc["status"];

      int requestedSlotIndex = -1;
      for (int i = 0; i < 4; i++) {
        if (irSlotNames[i] == requestedSlot) {
          requestedSlotIndex = i;
          break;
        }
      }

      lcd.clear();

      if (status == "notregistered") {
        lcd.print("Vehicle Not");
        lcd.setCursor(0, 1);
        lcd.print("Registered");
        showDefaultScreen();
        request->send(200, "text/plain", "Vehicle not registered");
        return;
      }

      if (status == "notactive") {
        lcd.print("Booking Not");
        lcd.setCursor(0, 1);
        lcd.print("Found");
        showDefaultScreen();
        request->send(200, "text/plain", "Booking not active");
        return;
      }

      if (status == "active" && action == "open" && requestedSlotIndex != -1) {
        if (!vehicleInside[requestedSlotIndex] && !pendingParking[requestedSlotIndex]) {
          pendingParking[requestedSlotIndex] = true;
          bookingIds[requestedSlotIndex] = bookingId;

          lcd.setCursor(0, 0);
          lcd.print("Slot: " + requestedSlot);
          lcd.setCursor(0, 1);
          lcd.print("Plate: " + plate);

          gateServo.write(SERVO_OPEN);
          delay(4000);
          gateServo.write(SERVO_CLOSED);

          request->send(200, "text/plain", "Gate opened, waiting IR");
        } else {
          lcd.clear();
          lcd.print("Slot Occupied");
          showDefaultScreen();
          request->send(400, "text/plain", "Slot already occupied or pending");
        }
      } else {
        request->send(400, "text/plain", "Invalid request.");
      }
    }
  );

  server.begin();
}

void loop() {
  for (int i = 0; i < 4; i++) {
    int irState = digitalRead(irPins[i]);

    if (pendingParking[i]) {
      for (int j = 0; j < 4; j++) {
        if (digitalRead(irPins[j]) == LOW) {
          pendingParking[i] = false;

          if (j == i) {
            // ✅ Correct slot
            vehicleInside[j] = true;
            notifyBackend(irSlotNames[j], bookingIds[j]);  // bookingId is already at j
            lcd.clear();
            lcd.print("Parked at");
            lcd.setCursor(0, 1);
            lcd.print(irSlotNames[j]);
            Serial.println("✅ Parked correctly in " + irSlotNames[j]);
            showDefaultScreen();
          } else {
            // ❌ Mismatch
            vehicleInside[j] = true;
            notifyMismatch(bookingIds[i], irSlotNames[j]);

            lcd.clear();
            lcd.print("Mismatch Slot!");
            lcd.setCursor(0, 1);
            lcd.print("Parked: " + irSlotNames[j]);
            Serial.println("❌ Mismatch: expected " + irSlotNames[i] + ", parked at " + irSlotNames[j]);

            // Transfer booking ID to correct slot
            bookingIds[j] = bookingIds[i];
            bookingIds[i] = "";
            Serial.println("📦 Moved bookingId from " + irSlotNames[i] + " to " + irSlotNames[j]);

            showDefaultScreen();
          }

          break;
        }
      }
    }

    if (vehicleInside[i] && irState == HIGH) {
      String currentBookingId = bookingIds[i];

      Serial.println("➡️ Preparing to exit with bookingId: " + currentBookingId);
      lcd.clear();
      lcd.print("Exit: " + irSlotNames[i]);
      Serial.println("🚗 Exit: " + irSlotNames[i]);

      gateServo.write(SERVO_OPEN);
      delay(exitOpenTime);
      gateServo.write(SERVO_CLOSED);
      delay(exitCloseDelay);

      notifyExit(currentBookingId);
      delay(1000);

      bookingIds[i] = "";
      vehicleInside[i] = false;

      showDefaultScreen();
    }
  }

  delay(100);
}
