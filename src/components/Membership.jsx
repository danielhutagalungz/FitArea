import { PAKET } from "../paket"

const fitur = {
  1: ["Akses gym 05.00–23.00", "Locker & shower", "Booking kelas grup"],
  2: ["Semua fasilitas Basic", "Hemat sekitar 13%", "1x sesi konsultasi trainer"],
  3: ["Semua fasilitas Silver", "Hemat sekitar 20%", "3x sesi personal training"],
  4: ["Semua fasilitas Gold", "Hemat sekitar 27%", "6x sesi personal training"],
}

export default function Membership({ onPilih }) {
  return (
    <section className="membership" id="membership">
      <h2>Paket Membership</h2>
      <p className="sub">Pilih paket yang sesuai dengan komitmen latihanmu</p>

      <div className="membership-grid">
        {PAKET.map((p) => (
          <article key={p.id} className={"paket-card" + (p.id === 3 ? " populer" : "")}>
            {p.id === 3 && <span className="paket-badge">Paling populer</span>}
            <h3>{p.nama}</h3>
            <p className="paket-harga">
              {"Rp" + p.harga.toLocaleString("id-ID")} <span>/ {p.durasi} bulan</span>
            </p>
            <ul>{fitur[p.id].map((f) => <li key={f}>{f}</li>)}</ul>
            <a href="#join" className="btn-paket" onClick={() => onPilih(String(p.id))}>Pilih paket</a>
          </article>
        ))}
      </div>
    </section>
  )
}
