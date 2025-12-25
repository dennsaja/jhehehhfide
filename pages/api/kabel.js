import fs from "fs"
import path from "path"
import * as XLSX from "xlsx"

export default function handler(req, res) {
  const { id, min } = req.query

  try {
    const filePath = path.join(process.cwd(), "public", "kabel.xlsx")
    const fileBuffer = fs.readFileSync(filePath)

    const workbook = XLSX.read(fileBuffer, { type: "buffer" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    let data = XLSX.utils.sheet_to_json(sheet)

    // 🔍 FILTER PANJANG MINIMAL
    if (min) {
      const minMeter = parseInt(min)
      data = data.filter(
        row => Number(row.panjang_m) >= minMeter
      )
    }

    // DETAIL KABEL
    if (id) {
      const kabel = data.find(row => row.id_kabel === id)
      if (!kabel) {
        return res.status(404).json({ error: "Data kabel tidak ditemukan" })
      }
      return res.json(kabel)
    }

    // LIST DATA
    return res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Gagal membaca data kabel" })
  }
}
