import QRCode from "qrcode"

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/kabel?id=${params.id}`
  )

  if (!res.ok) {
    return { notFound: true }
  }

  const data = await res.json()

  const qr = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/kabel/${params.id}`
  )

  return {
    props: { data, qr }
  }
}

export default function Kabel({ data, qr }) {
  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h2>📦 Detail Kabel</h2>

      <img src={qr} width={160} />

      <table style={{ marginTop: 16 }}>
        <tbody>
          <tr><td>ID</td><td>: {data.id_kabel}</td></tr>
          <tr><td>Merek</td><td>: {data.merek}</td></tr>
          <tr><td>Core</td><td>: {data.core}</td></tr>
          <tr><td>Panjang</td><td>: {data.panjang_m} m</td></tr>
          <tr><td>Status</td><td>: {data.status}</td></tr>
          <tr><td>Tanggal</td><td>: {data.tanggal}</td></tr>
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <a href="/" style={{ textDecoration: "none" }}>⬅ Kembali</a>
      </div>
    </div>
  )
}
