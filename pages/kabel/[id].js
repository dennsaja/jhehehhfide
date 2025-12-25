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
        if (result.error) {
          setError(result.error)
        } else {
          setData(result)
        }
      })
      .catch(() => setError("Gagal memuat data"))
  }, [id])

  if (error) {
    return (
      <div style={styles.container}>
        <h2>❌ {error}</h2>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={styles.container}>
        <p>⏳ Memuat data kabel...</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{data.id_kabel}</h1>

        <table style={styles.table}>
          <tbody>
            <tr>
              <td>Merek</td>
              <td>{data.merek}</td>
            </tr>
            <tr>
              <td>Core</td>
              <td>{data.core}</td>
            </tr>
            <tr>
              <td>Panjang</td>
              <td>{data.panjang_m} meter</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <span style={{
                  ...styles.badge,
                  background:
                    data.status === "belum terpakai" ? "#facc15" : "#22c55e"
                }}>
                  {data.status}
                </span>
              </td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>{new Date((data.tanggal - 25569) * 86400000).toLocaleDateString("id-ID")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  card: {
    background: "#020617",
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 10px 30px rgba(0,0,0,.5)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  badge: {
    color: "#000",
    padding: "4px 10px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 12
  }
}
