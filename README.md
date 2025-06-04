# Smart Parking System

A Final Year Project that combines IoT, computer vision, and Web Development to revolutionise traditional parking with automation and real-time monitoring.

---

## 🎯 Project Goal

To solve urban parking challenges by building a **Smart Parking System** that:
- Detects vehicle presence using IR sensors
- Automates gate control via servo motor
- Uses **ESP32** for real-time communication
- Recognises number plates with **OpenCV**
- Provides a secure and user-friendly web dashboard for booking and management

---

## 📷 System Overview Diagram

You can read the full article on: 
- [Linkedin Link](https://www.linkedin.com/pulse/how-i-built-smart-parking-system-esp32-fastapi-mm-salman-faris-owfgc/?trackingId=wQ4cEASHSXyV88D9k0bERg%3D%3D)
- [Medium Link](https://medium.com/@mmsalmanfaris/how-i-built-a-smart-parking-system-with-esp32-and-fastapi-b2c1bcafcb2e)

![image](https://github.com/user-attachments/assets/459a7844-18c9-4959-b004-1b0fc84c6a8c)


---

## 🛠️ Tech Stack

| Layer       | Technology Used                 |
|-------------|----------------------------------|
| **Frontend** | React.js, Tailwind CSS, Flowbite |
| **Backend**  | FastAPI, Pydantic, JWT, Axios   |
| **Database** | Firebase (Firestore + Storage)  |
| **IoT**      | ESP32, IR Sensors, SG90 Servo, 16x2 Display    |
| **Vision**    | OCR + OpenCV (Number Plate Detection) |
| **Communication** | HTTP via REST APIs (ESP32 ↔ Backend) |

---

## 🔑 Key Features

- 🚗 **Automated Gate Control**  
- 🎯 **Real-time Slot Detection with IR Sensors**  
- 🔐 **Secure Login and Booking with JWT Auth**  
- 🎥 **Computer Vision for License Plate Recognition**  
- 📊 **Admin Dashboard with Analytics, Alerts & Device Management**  
- 📁 **Exportable Reports (CSV & PDF)**  
- 🌐 **Cloud Firestore Integration**

---

## 📸 Demo Screenshots

| User Application |
|----------|
| ![User View](https://github.com/user-attachments/assets/394b6f40-e1f2-41ba-b116-4740ddbae41e)|

 | Admin Dashboard |
|------------------|
 | ![Admin View](https://github.com/user-attachments/assets/14d50750-8c19-44b5-b40f-c46f00bbf16b) |


---

## 🔌 IoT Setup

- ESP32 handles all sensor data, servo control, and communication with the backend.
- IR sensors monitor slot occupancy.
- Number plate detected using camera + OpenCV.
- ESP32 connects to the backend via mobile hotspot or Wi-Fi (configurable).

![image](https://github.com/user-attachments/assets/111e7e14-b622-48c8-b6a7-e7461f266f11)


## Conclusion
This smart parking system merges the power of IoT, computer vision, and web development to tackle real-world challenges. It’s scalable and secure, and solves a common urban problem with automation and innovation.

Let’s connect on [LinkedIn](https://www.linkedin.com/in/mmsalmanfaris/) if you're hiring or have feedback!

