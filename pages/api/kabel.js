import fs from "fs"
import path from "path"
import * as XLSX from "xlsx"

export default function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "ID kabel wajib" })
  }

  try {
    // PATH KE FILE EXCEL DI PUBLIC
    const filePath = path.join(process.cwd(), "public", "kabel.xlsx")

    // BACA FILE
    const fileBuffer = fs.readFileSync(filePath)

    // PARSE EXCEL
    const workbook = XLSX.read(fileBuffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(sheet)

    // CARI DATA
    const kabel = data.find(row => row.id_kabel === id)

    if (!kabel) {
      return res.status(404).json({ error: "Data kabel tidak ditemukan" })
    }

    return res.status(200).json(kabel)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Gagal membaca file Excel" })
  }
}
