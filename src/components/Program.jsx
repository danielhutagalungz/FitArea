import { useEffect, useRef, useState } from "react"
import { dataProgram } from "../data"

// Card muncul pelan saat masuk layar
function Card({ item, i }) {
  const ref = useRef(null)
  const [tampil, setTampil] = useState(() => !("IntersectionObserver" in window))

  useEffect(() => {
    const el = ref.current
    if (!("IntersectionObserver" in window)) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTampil(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={"program-card" + (tampil ? " tampil" : "")}
      style={{ transitionDelay: (i % 3) * 0.08 + "s" }}
    >
      <div className="program-ikon" aria-hidden="true">{item.ikon}</div>
      <h3>{item.nama}</h3>
      <p>{item.deskripsi}</p>
      <span className="program-level">{item.level}</span>
    </article>
  )
}

export default function Program() {
  const [teks, setTeks] = useState("")
  const inputRef = useRef(null)
  const q = teks.trim().toLowerCase()
  const hasil = dataProgram.filter((p) =>
    (p.nama + " " + p.deskripsi + " " + p.level + " " + p.kata).toLowerCase().includes(q)
  )

  return (
    <section className="program" id="program">
      <h2>Program Latihan</h2>
      <p className="sub">Temukan kelas yang cocok dengan tujuan latihanmu</p>

      <div className="program-search" role="search">
        <label htmlFor="cariProgram" className="sr-only">Cari program latihan</label>
        <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          id="cariProgram"
          placeholder="Cari program, contoh: yoga, bakar kalori, otot..."
          autoComplete="off"
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
        />
        <button
          type="button"
          id="hapusCari"
          className="search-clear"
          aria-label="Hapus pencarian"
          hidden={q === ""}
          onClick={() => { setTeks(""); inputRef.current.focus() }}
        >
          &times;
        </button>
      </div>

      <p className="program-info" id="programInfo" aria-live="polite">
        {q ? "Menampilkan " + hasil.length + " dari " + dataProgram.length + " program" : ""}
      </p>

      <div className="program-grid" id="programGrid">
        {/* key berubah tiap ketikan: card dibuat ulang & animasi muncul lagi, seperti versi lama */}
        {hasil.map((item, i) => <Card key={teks + item.nama} item={item} i={i} />)}
      </div>

      <p className="program-kosong" id="programKosong" hidden={hasil.length > 0}>
        Program tidak ditemukan. Coba kata kunci lain.
      </p>
    </section>
  )
}
