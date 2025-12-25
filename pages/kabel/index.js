import { useEffect, useState } from "react"
import Link from "next/link"

export default function ListKabel() {
  const [min, setMin] = useState("")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = () => {
    setLoading(true)
    fetch(`/api/kabel?min=${min}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📦 Data Kabel</h1>

        {/* SEARCH */}
        <div style={styles.search}>
          <input
            type="number"
            placeholder="Panjang minimal (meter)"
            value={min}
            onChange={e => setMin(e.target.value)}
            style={styles.input}
          />
          <button onClick={loadData} style={styles.button}>
            Cari
          </button>
        </div>

        {loading && <p>⏳ Memuat...</p>}

        {!loading && data.length === 0 && (
          <p>❌ Tidak ada data</p>
        )}

        <ul style={styles.list}>
          {data.map(item => (
            <li key={item.id_kabel} style={styles.item}>
              <Link href={`/kabel/${item.id_kabel}`}>
                <b>{item.id_kabel}</b>
              </Link>
              <span>{item.panjang_m} m</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    fontFamily: "'Open Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: 20
  },
  card: {
    width: "100%",
    maxWidth: 600,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 24
  },
  title: {
    marginBottom: 16
  },
  search: {
    display: "flex",
    gap: 10,
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10,
    border: "1px solid #d1d5db",
    borderRadius: 6
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb"
  }
}
