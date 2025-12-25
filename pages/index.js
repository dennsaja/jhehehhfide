export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <h1>📦 Sistem Manajemen Kabel</h1>

      <p style={{ maxWidth: 420, textAlign: "center" }}>
        Sistem identifikasi kabel menggunakan QR Code.
        Scan QR pada kabel untuk melihat detail data kabel.
      </p>

      <div style={{ marginTop: 20 }}>
        <a
          href="/kabel/KBL-000019"
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            borderRadius: 6,
            textDecoration: "none"
          }}
        >
          🔍 Contoh Data Kabel
        </a>
      </div>

      <footer style={{ marginTop: 40, fontSize: 12, opacity: 0.6 }}>
        © Infinity Teknik
      </footer>
    </div>
  )
}
