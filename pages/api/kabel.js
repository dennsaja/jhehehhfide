import Papa from "papaparse"

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "ID kabel wajib" })
  }

  const response = await fetch(
    "https://raw.githubusercontent.com/USERNAME/REPO/main/kabel.csv"
  )

  const csvText = await response.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const kabel = parsed.data.find(row => row.id_kabel === id)

  if (!kabel) {
    return res.status(404).json({ error: "Data kabel tidak ditemukan" })
  }

  res.json(kabel)
}
