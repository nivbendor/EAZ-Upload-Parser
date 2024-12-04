import xlsx from "xlsx";

export async function createSpreadsheet(data: any, fileName: string): Promise<string> {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const filePath = `/exports/${fileName}`;
  xlsx.writeFile(workbook, filePath);
  return filePath;
}
