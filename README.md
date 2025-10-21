# 🧪 Chemical Information Display (React Native + Expo)

แอปพลิเคชันสำหรับ **แสดงข้อมูลสารเคมี** พร้อมภาพและรายละเอียดการใช้งาน  
พัฒนาโดยใช้ **React Native (Expo)** เพื่อให้สามารถใช้งานได้ทั้งบนมือถือและเว็บเบราว์เซอร์

🔗 **ทดลองใช้งานบน Snack:**  
👉 [https://snack.expo.dev/@ohmjk/add-app-new](https://snack.expo.dev/@ohmjk/add-app-new)

---

## 🚀 เทคโนโลยีที่ใช้

- **React Native (Expo)** – พัฒนาแอปข้ามแพลตฟอร์ม  
- **JavaScript (ES6+)** – เขียนฟังก์ชันหลักของแอป  
- **React Hooks (useState, useEffect)** – จัดการ State และข้อมูล  
- **Supabase (optional)** – ใช้เป็นฐานข้อมูลออนไลน์ในการเก็บและดึงข้อมูลสารเคมี  
- **Local Asset Storage** – เก็บรูปภาพและข้อมูลสารเคมีภายในแอป  
- **Responsive Layout** – รองรับมือถือ, iPad และคอมพิวเตอร์  

---

## 📦 โครงสร้างโปรเจกต์

StroageLab/
│
├── App.js # จุดเริ่มต้นของแอป
├── components/ # คอมโพเนนต์ย่อย (Card, Modal ฯลฯ)
├── assets/ # รูปภาพและสื่อ
├── app.json # การตั้งค่า Expo
├── babel.config.js # การตั้งค่า Babel
└── package.json # รายการ dependencies
