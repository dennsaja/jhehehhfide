import QRCode from "qrcode"

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).send("ID kabel wajib")
  }

  const url = `https://data.infinityteknik.net/api/kabel?id=${id}`

  try {
    const qr = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2
    })

    res.status(200).json({ qr })
  } catch (err) {
    res.status(500).send("Gagal membuat QR")
  }
}
