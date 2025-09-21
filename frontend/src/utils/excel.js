import * as XLSX from 'xlsx';           // 1
import { saveAs } from 'file-saver';    // 2

// 3) JSON → 워크시트 변환
export function jsonToWorksheet(data) {
  return XLSX.utils.json_to_sheet(data);
}

// 4) 엑셀 생성 및 파일 저장
export function exportToExcel(data, fileName = 'stock_data') {
  const ws = jsonToWorksheet(data);     // 5
  const wb = XLSX.utils.book_new();     // 6
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 7
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); // 8
  const blob = new Blob([wbout], { type: 'application/octet-stream' }); // 9
  saveAs(blob, `${fileName}.xlsx`);     // 10
}
