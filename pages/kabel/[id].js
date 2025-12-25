import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function DetailKabel() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    fetch(`/api/kabel?id=${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.error) setError(result.error)
        else setData(result)
      })
      .catch(() => setError("Gagal memuat data"))
  }, [id])

  if (error) {
    return <div style={styles.page}>❌ {error}</div>
  }

  if (!data) {
    return <div style={styles.page}>⏳ Memuat data kabel...</div>
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{data.id_kabel}</h1>

        <table style={styles.table}>
          <tbody>
            <Row label="Merek" value={data.merek} />
            <Row label="Core" value={data.core} />
            <Row label="Panjang" value={`${data.panjang_m} meter`} />
            <Row
              label="Status"
              value={
                <span style={{
                  ...styles.badge,
                  background:
                    data.status === "belum terpakai" ? "#fde68a" : "#bbf7d0"
                }}>
                  {data.status}
                </span>
              }
            />
            <Row
              label="Tanggal"
              value={new Date((data.tanggal - 25569) * 86400000)
                .toLocaleDateString("id-ID")}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <tr>
      <td style={styles.label}>{label}</td>
      <td style={styles.value}>{value}</td>
    </tr>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "'Open Sans', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 24,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 700,
    fontSize: 22
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  label: {
    padding: "8px 0",
    color: "#6b7280",
    fontWeight: 600
  },
  value: {
    padding: "8px 0",
    textAlign: "right",
    fontWeight: 600
  },
  badge: {
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 700
  }
}
