import cv2
import easyocr
import requests
import time

# Setup EasyOCR
reader = easyocr.Reader(['en'], gpu=True)

# FastAPI Endpoint
BACKEND_URL = "http://127.0.0.1:8000/api/webcam/"

def detect_plate():
    cap = cv2.VideoCapture(0)
    print("[INFO] Starting camera... Press 'q' to quit.")
    
    last_detection_time = 0
    cooldown_seconds = 10  # Cooldown period to avoid multiple detections

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        current_time = time.time()

        # Only process after cooldown
        if current_time - last_detection_time >= cooldown_seconds:
            results = reader.readtext(frame)

            for (bbox, text, prob) in results:
                plate = text.strip().replace(" ", "")
                if 5 <= len(plate) <= 10 and prob > 0.5:
                    print(f"[PLATE DETECTED] {plate} (Confidence: {prob:.2f})")

                    # Wait 3 seconds before capturing final frame
                    print("[INFO] Waiting 3 seconds before confirming plate...")
                    time.sleep(3)

                    # Re-capture for a stable image
                    ret, confirm_frame = cap.read()
                    if ret:
                        confirm_results = reader.readtext(confirm_frame)
                        for (_, confirm_text, confirm_prob) in confirm_results:
                            confirm_plate = confirm_text.strip().replace(" ", "")
                            if confirm_plate == plate:
                                print(f"[CONFIRMED] Sending plate: {confirm_plate}")

                                try:
                                    res = requests.post(BACKEND_URL, json={"plate": confirm_plate})
                                    print(f"[BACKEND RESPONSE] {res.json()}")
                                except Exception as e:
                                    print(f"[ERROR] Failed to send to backend: {e}")
                                
                                last_detection_time = time.time()  # Start cooldown
                                break
                    break  # Exit after one detection (to avoid multiple in loop)

        cv2.imshow("Live Plate Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    detect_plate()
