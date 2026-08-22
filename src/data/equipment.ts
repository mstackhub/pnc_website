import { EquipmentItem } from "@/types";

export const equipmentData: EquipmentItem[] = [
  {
    id: "pressure-washer",
    title: "เครื่องฉีดน้ำแรงดัน",
    description: "ใช้ในขั้นตอนลดสิ่งสกปรกและล้างผลิตภัณฑ์ออกจากพื้นผิว ปรับแรงดันตามความเหมาะสมของแต่ละชิ้นส่วน",
    iconName: "Gauge",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80",
    imageAlt: "เครื่องฉีดน้ำแรงดันปรับระดับสำหรับการล้างรถ",
    benefits: [
      "ชะล้างโคลนและเศษฝุ่นหนาได้อย่างมีประสิทธิภาพ",
      "ควบคุมแรงดันน้ำให้พอดีกับแต่ละส่วนของรถ",
    ],
  },
  {
    id: "microfiber-towels",
    title: "ผ้าไมโครไฟเบอร์แยกประเภท",
    description: "คัดสรรผ้าไมโครไฟเบอร์ความหนานุ่มต่างกัน และแยกใช้งานเฉพาะจุดระหว่างตัวถัง กระจก และล้อ",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80",
    imageAlt: "ผ้าไมโครไฟเบอร์หนานุ่มสำหรับเช็ดเก็บงานรถยนต์",
    benefits: [
      "แยกผืนตามบริเวณการใช้งานอย่างเคร่งครัด",
      "ซับน้ำได้รวดเร็วและอุ้มน้ำได้ดี",
    ],
  },
  {
    id: "wheel-tools",
    title: "อุปกรณ์ทำความสะอาดล้อ",
    description: "แยกแปรงขัดล้อ แปรงซอกล้อ และผ้าล้อออกจากอุปกรณ์ที่ใช้กับตัวรถโดยเด็ดขาด",
    iconName: "Disc",
    image: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=600&q=80",
    imageAlt: "ชุดแปรงและอุปกรณ์เฉพาะสำหรับการทำความสะอาดล้อแม็กซ์",
    benefits: [
      "เข้าถึงซอกก้านแม็กซ์และร่องลึกได้ทั่วถึง",
      "ป้องกันการปนเปื้อนของผงเบรกไปยังสีรถ",
    ],
  },
  {
    id: "vacuum-cleaner",
    title: "เครื่องดูดฝุ่นพลังดูดสูง",
    description: "สำหรับบริการทำความสะอาดภายใน ดูดฝุ่นตามพรม เบาะ ซอกมุม และที่วางแก้ว",
    iconName: "Wind",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80",
    imageAlt: "เครื่องดูดฝุ่นทำความสะอาดภายในห้องโดยสารรถยนต์",
    benefits: [
      "หัวดูดเฉพาะสำหรับซอกแคบใต้เบาะและร่องคอนโซล",
      "ขจัดเศษขนสัตว์ ฝุ่นผง และเศษทราย",
    ],
  },
  {
    id: "detailing-brushes",
    title: "แปรงสำหรับพื้นที่เฉพาะ",
    description: "ขนแปรงอ่อนนุ่มสำหรับทำความสะอาดช่องแอร์ โลโก้ กระจังหน้า และซอกที่เข้าถึงยาก",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80",
    imageAlt: "แปรง Detailing อ่อนนุ่มสำหรับทำความสะอาดซอกมุมรถ",
    benefits: [
      "ขจัดคราบฝุ่นตามร่องตัวอักษรและกระจังหน้า",
      "ขนแปรงนุ่ม ลดโอกาสเกิดรอยขณะทำความสะอาด",
    ],
  },
  {
    id: "car-care-products",
    title: "ผลิตภัณฑ์ดูแลรถสูตรเฉพาะ",
    description: "เลือกใช้แชมพูสูตรสมดุล pH น้ำยาเคลือบเงา และน้ำยาเคลือบยางที่เหมาะกับลักษณะงานและพื้นผิว",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    imageAlt: "ผลิตภัณฑ์แชมพูและน้ำยาดูแลรักษาสีรถยนต์",
    benefits: [
      "แชมพูสูตรอ่อนโยน ไม่กัดชั้นแว็กซ์เดิม",
      "เคลือบยางดำเงาและปกป้องแก้มยาง",
    ],
  },
];
