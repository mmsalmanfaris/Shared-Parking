#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "Digital Partner";
const char* password = "56B5E807";

AsyncWebServer server(80);
Servo gateServo;
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(115200);
  
  // Attach the servo to pin 13
  gateServo.attach(13); 
  gateServo.write(0);  // Ensure the gate is initially closed

  // Initialize the LCD
  Wire.begin(14, 15);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Starting...");
  
  // Connect to WiFi
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting to WiFi");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    lcd.setCursor(0, 1);
    lcd.print(".");
  }

  // Display the IP address once connected
  Serial.println("\nConnected: " + WiFi.localIP().toString());
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());

  // Handle /command
  server.on("/command", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL,
    [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, data);

      if (error) {
        request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
        return;
      }

      String action = doc["action"];
      String slot = doc["slot"];
      String plate = doc["plate"];

      if (action == "open") {
        // Update the LCD display with the slot and plate
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Slot: " + slot);
        lcd.setCursor(0, 1);
        lcd.print("Plate: " + plate);
        
        // Open the gate and keep it open for 3 seconds
        gateServo.write(90);  // Open gate
        delay(3000);          // Keep open for 3 seconds (adjust as needed)
        gateServo.write(0);   // Close gate

        request->send(200, "text/plain", "Gate opened for slot: " + slot);
      } else {
        request->send(400, "text/plain", "Invalid action. Only 'open' is supported.");
      }
    }
  );

  // Start the server
  server.begin();
}

void loop() {
  // Empty as we use an asynchronous server
}
