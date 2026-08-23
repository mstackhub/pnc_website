# 📁 โครงสร้างโฟลเดอร์สำหรับเก็บภาพผลงานจริง (Portfolio Projects)

แต่ละโปรเจกต์ (ผลงานของรถแต่ละคัน) ถูกจัดแยกเป็นโฟลเดอร์ `project-01`, `project-02`, ... `project-N` ดังนี้:

```text
public/images/portfolio/
├── project-01/          (ตัวอย่าง: รถเก๋ง Honda Civic)
│   ├── before.jpg       (ภาพก่อนล้าง)
│   ├── after.jpg        (ภาพหลังล้าง)
│   └── gallery-01.jpg   (ภาพมุมเก็บรายละเอียด/ล้อ)
├── project-02/          (ตัวอย่าง: รถ SUV Fortuner)
│   ├── before.jpg
│   └── after.jpg
├── project-03/          (ตัวอย่าง: มอเตอร์ไซค์ / Big Bike)
│   ├── before.jpg
│   └── after.jpg
├── project-04/          (ตัวอย่าง: รถไฟฟ้า EV BYD)
│   ├── before.jpg
│   └── after.jpg
├── project-05/          (ตัวอย่าง: รถ 6 ล้อ / 10 ล้อ)
│   ├── before.jpg
│   └── after.jpg
└── project-06/ ... project-N
```

---

### 📝 คำแนะนำในการใส่ภาพ:
1. **ชื่อไฟล์ที่แนะนำ**:
   - `before.jpg` หรือ `before.webp` (ภาพก่อนล้าง)
   - `after.jpg` หรือ `after.webp` (ภาพหลังล้าง)
   - `01.jpg`, `02.jpg` (ภาพผลงานใน Gallery)
2. **เมื่อวางภาพในโฟลเดอร์แล้ว**:
   - Path ที่เรียกใช้งานบนเว็บคือ `/images/portfolio/project-01/before.jpg` และ `/images/portfolio/project-01/after.jpg`
   - สามารถแจ้งชื่อรุ่นรถหรือรายละเอียดให้ AI ช่วยอัปเดตไฟล์ `src/data/portfolio.ts` ได้ทันที!
