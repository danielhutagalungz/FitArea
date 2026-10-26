import { useLayoutEffect, useRef, useState } from "react"
import { dataJadwal } from "../data"

const HARI = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const BATAS_BARIS = 5

export default function Jadwal() {
  const [hari, setHari] = useState("Semua")
  const [semua, setSemua] = useState(false)
  const toggleRef = useRef(null)
  const topSebelum = useRef(null)

  const hasil = hari === "Semua" ? dataJadwal : dataJadwal.filter((d) => d.hari === hari)
  const perluTombol = hasil.length > BATAS_BARIS
  const tampil = perluTombol && !semua ? hasil.slice(0, BATAS_BARIS) : hasil
  const labelHari = hari === "Semua" ? "Senin - Sabtu" : hari

  // Jaga posisi tombol di layar setelah tabel memendek/memanjang
  useLayoutEffect(() => {
    if (topSebelum.current === null) return
    const selisih = toggleRef.current.getBoundingClientRect().top - topSebelum.current
    topSebelum.current = null
    if (selisih !== 0) window.scrollBy({ top: selisih, left: 0, behavior: "instant" })
  }, [semua])

  return (
    <section className="jadwal" id="jadwal">
      <h2>Jadwal Kelas</h2>
      <p className="sub">Pilih hari untuk melihat kelas yang tersedia</p>

      <div className="filter" id="filter">
        {HARI.map((h) => (
          <button key={h} className={hari === h ? "aktif" : undefined} onClick={() => { setHari(h); setSemua(false) }}>
            {h}
          </button>
        ))}
      </div>

      <div className="tabel-wrap">
        <table>
          <thead>
            <tr><th>Hari</th><th>Jam</th><th>Kelas</th><th>Trainer</th><th>Durasi</th></tr>
          </thead>
          <tbody id="isi-jadwal">
            {hasil.length === 0 ? (
              <tr><td colSpan="5" className="kosong">Belum ada kelas di hari ini.</td></tr>
            ) : (
              tampil.map((d) => (
                <tr key={d.hari + d.jam}>
                  <td data-label="Hari"><span className="badge-hari">{d.hari}</span></td>
                  <td data-label="Jam">{d.jam}</td>
                  <td data-label="Kelas" className="nama-kelas">{d.kelas}</td>
                  <td data-label="Trainer">{d.trainer}</td>
                  <td data-label="Durasi">{d.durasi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="area-toggle">
        <button
          ref={toggleRef}
          className={"toggle-jadwal" + (perluTombol && semua ? " terbuka" : "")}
          id="toggle-jadwal"
          type="button"
          style={{ display: perluTombol ? "inline-flex" : "none" }}
          onClick={() => {
            topSebelum.current = toggleRef.current.getBoundingClientRect().top
            setSemua((s) => !s)
          }}
        >
          <span className="teks-tombol">{semua ? "Tampilkan Lebih Sedikit" : "Lihat Selengkapnya"}</span>
          <span className="panah">&#9660;</span>
        </button>
      </div>

      <p className="info-jumlah" id="info-jumlah">
        {hasil.length === 0 ? "" : "Menampilkan " + tampil.length + " dari " + hasil.length + " kelas (" + labelHari + ")"}
      </p>
    </section>
  )
}
