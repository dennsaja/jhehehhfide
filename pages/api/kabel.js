import * as XLSX from "xlsx"

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "ID kabel wajib" })
  }

  try {
    // fetch file xlsx dari public
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/kabel.xlsx`
    )

    const arrayBuffer = await response.arrayBuffer()

    const workbook = XLSX.read(arrayBuffer, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json(sheet)

    const kabel = data.find(row => row.id_kabel === id)

    if (!kabel) {
      return res.status(404).json({ error: "Data kabel tidak ditemukan" })
    }

    res.json(kabel)
  } catch (err) {
    res.status(500).json({ error: "Gagal membaca file Excel" })
  }
}
