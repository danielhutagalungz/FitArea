import { useRef, useState } from "react"

// Kategori BMI (klasifikasi WHO untuk dewasa)
const kategori = [
  { maks: 18.5, kunci: "kurang", nama: "Berat badan kurang",
    pesan: "Berat badanmu di bawah rentang sehat. Fokus ke asupan kalori dan protein yang cukup, ditambah latihan beban untuk membangun massa otot." },
  { maks: 25, kunci: "normal", nama: "Berat badan normal",
    pesan: "Mantap! Berat badanmu ada di rentang sehat. Pertahankan dengan latihan rutin dan pola makan seimbang." },
  { maks: 30, kunci: "berlebih", nama: "Berat badan berlebih",
    pesan: "Berat badanmu sedikit di atas rentang sehat. Kombinasi kardio, HIIT, dan latihan beban bisa membantu menurunkannya secara bertahap." },
  { maks: Infinity, kunci: "obesitas", nama: "Obesitas",
    pesan: "Risiko kesehatan meningkat di kategori ini. Mulai pelan-pelan dengan kardio ringan dan konsultasikan program latihan dengan trainer atau dokter." },
]
const SKALA_MIN = 15
const SKALA_MAX = 40
const fmt = (n, d = 1) => n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d })

const KOSONG = {
  angka: "--", kategori: "Belum dihitung", pesan: "Isi tinggi dan berat badan, lalu tekan Hitung BMI.",
  ideal: "-", selisih: "-", kunci: "", marker: false,
}

function baca(nilaiStr, min, max, nama) {
  const nilai = parseFloat(String(nilaiStr).replace(",", "."))
  if (!nilaiStr.trim() || Number.isNaN(nilai)) return [null, nama + " wajib diisi."]
  if (nilai < min || nilai > max) return [null, nama + " harus antara " + min + " dan " + max + "."]
  return [nilai, ""]
}

export default function Bmi() {
  const [tinggi, setTinggi] = useState("")
  const [berat, setBerat] = useState("")
  const [err, setErr] = useState({ tinggi: "", berat: "" })
  const [h, setH] = useState(KOSONG)
  const [left, setLeft] = useState(undefined) // posisi marker tetap bertahan seperti versi lama
  const refT = useRef(null)
  const refB = useRef(null)

  function submit(e) {
    e.preventDefault()
    const [t, et] = baca(tinggi, 100, 250, "Tinggi badan")
    const [b, eb] = baca(berat, 20, 300, "Berat badan")
    setErr({ tinggi: et, berat: eb })
    if (t === null || b === null) {
      ;(et ? refT : refB).current.focus()
      setH(KOSONG)
      return
    }
    const m = t / 100
    const bmi = b / (m * m)
    const info = kategori.find((k) => bmi < k.maks)
    const bMin = 18.5 * m * m
    const bMaks = 24.9 * m * m
    const selisih =
      b > bMaks ? "Turun sekitar " + fmt(b - bMaks) + " kg"
      : b < bMin ? "Naik sekitar " + fmt(bMin - b) + " kg"
      : "Sudah di rentang ideal"
    setH({
      angka: fmt(bmi), kategori: info.nama, pesan: info.pesan,
      ideal: fmt(bMin) + " - " + fmt(bMaks) + " kg", selisih, kunci: info.kunci, marker: true,
    })
    const persen = ((bmi - SKALA_MIN) / (SKALA_MAX - SKALA_MIN)) * 100
    setLeft(Math.min(100, Math.max(0, persen)) + "%")
  }

  function reset() {
    setTinggi(""); setBerat(""); setErr({ tinggi: "", berat: "" }); setH(KOSONG)
    refT.current.focus()
  }

  return (
    <section className="bmi" id="bmi">
      <h2>Kalkulator BMI</h2>
      <p className="sub">Cek indeks massa tubuhmu sebelum menentukan program latihan</p>

      <div className="bmi-container">
        <form className="bmi-form" id="bmiForm" noValidate onSubmit={submit}>
          <h3>Data tubuhmu</h3>

          <label className={err.tinggi ? "invalid" : undefined}>Tinggi badan
            <span className="bmi-field">
              <input ref={refT} type="number" id="bmiTinggi" name="tinggi" inputMode="decimal" step="0.1"
                placeholder="Contoh: 170" value={tinggi}
                onChange={(e) => { setTinggi(e.target.value); if (err.tinggi) setErr((x) => ({ ...x, tinggi: "" })) }} />
              <em>cm</em>
            </span>
            <small>{err.tinggi}</small>
          </label>

          <label className={err.berat ? "invalid" : undefined}>Berat badan
            <span className="bmi-field">
              <input ref={refB} type="number" id="bmiBerat" name="berat" inputMode="decimal" step="0.1"
                placeholder="Contoh: 65" value={berat}
                onChange={(e) => { setBerat(e.target.value); if (err.berat) setErr((x) => ({ ...x, berat: "" })) }} />
              <em>kg</em>
            </span>
            <small>{err.berat}</small>
          </label>

          <div className="bmi-actions">
            <button type="submit" className="join-btn">Hitung BMI</button>
            <button type="button" className="bmi-reset" id="bmiReset" onClick={reset}>Reset</button>
          </div>

          <p className="bmi-catatan">
            Rumus: berat (kg) &divide; tinggi (m)&sup2;. Hasil ini perkiraan
            untuk orang dewasa dan bukan diagnosis medis.
          </p>
        </form>

        <div className="bmi-hasil" id="bmiHasil" data-kategori={h.kunci} aria-live="polite">
          <p className="bmi-label">BMI kamu</p>
          <p className="bmi-angka" id="bmiAngka">{h.angka}</p>
          <span className="bmi-kategori" id="bmiKategori">{h.kategori}</span>

          <div className="bmi-gauge" aria-hidden="true">
            <div className="bmi-bar">
              <span className="seg-kurang"></span>
              <span className="seg-normal"></span>
              <span className="seg-berlebih"></span>
              <span className="seg-obesitas"></span>
            </div>
            <div className={"bmi-marker" + (h.marker ? " tampil" : "")} id="bmiMarker" style={{ left }}></div>
            <div className="bmi-skala">
              <span style={{ left: "14%" }}>18,5</span>
              <span style={{ left: "40%" }}>25</span>
              <span style={{ left: "60%" }}>30</span>
            </div>
          </div>

          <p className="bmi-pesan" id="bmiPesan">{h.pesan}</p>

          <dl className="bmi-detail">
            <div><dt>Berat ideal</dt><dd id="bmiIdeal">{h.ideal}</dd></div>
            <div><dt>Target</dt><dd id="bmiSelisih">{h.selisih}</dd></div>
          </dl>

          <a href="#program" className="btn btn-primary">Lihat program latihan</a>
        </div>
      </div>
    </section>
  )
}
