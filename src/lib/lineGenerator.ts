export interface BookingDetails {
  vehicleType: string;
  service: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
}

export function formatThaiDate(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543; // Buddhist Era
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

export function generateLineMessage(details: BookingDetails): string {
  const formattedDate = formatThaiDate(details.date);
  const notes = details.notes?.trim() ? details.notes.trim() : "-";
  const location = details.location?.trim() ? details.location.trim() : "-";

  return `สวัสดีครับ ต้องการสอบถามคิวบริการ PNC Auto GO

ประเภทรถ: ${details.vehicleType}
บริการ: ${details.service}
วันที่: ${formattedDate}
เวลา: ${details.time || "-"} น.
พื้นที่: ${location}
หมายเหตุ: ${notes}

รบกวนตรวจสอบคิวให้หน่อยครับ`;
}

export function getLineShareUrl(lineUrl: string, message: string): string {
  const encodedMsg = encodeURIComponent(message);
  // If a specific line URL (e.g. line.me/R/ti/p/@xxx) is configured, we can append or open
  if (lineUrl && lineUrl.trim()) {
    // If it's a direct add line link or custom URL
    return `${lineUrl}?text=${encodedMsg}`;
  }
  // Default LINE message share URL
  return `https://line.me/R/msg/text/?${encodedMsg}`;
}
