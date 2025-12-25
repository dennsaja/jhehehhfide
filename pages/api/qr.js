import QRCode from "qrcode"

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    res.status(400).send("ID kabel wajib")
    return
  }

  const url = `https://data.infinityteknik.net/kabel/${id}`

  try {
    const buffer = await QRCode.toBuffer(url, {
      type: "png",
      width: 300,
      margin: 2
    })

    res.setHeader("Content-Type", "image/png")
    res.status(200).send(buffer)
  } catch (err) {
    console.error(err)
    res.status(500).send("Gagal generate QR")
  }
}
