import { useRef, useState } from "react"
import { PAKET } from "../paket"

const formatTanggal = (d) => d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID")

// yyyy-mm-dd dari tanggal LOKAL (toISOString bisa bergeser sehari karena zona waktu)
function toInputDate(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

// Tambah bulan dengan aman (31 Jan + 1 bulan -> 28/29 Feb, bukan 3 Maret)
function tambahBulan(tanggal, bulan) {
  const hasil = new Date(tanggal)
  const hariAsal = hasil.getDate()
  hasil.setDate(1)
  hasil.setMonth(hasil.getMonth() + bulan)
  const hariTerakhir = new Date(hasil.getFullYear(), hasil.getMonth() + 1, 0).getDate()
  hasil.setDate(Math.min(hariAsal, hariTerakhir))
  return hasil
}

// Tiap aturan mengembalikan pesan error, atau "" jika valid
const rules = {
  nama: (v) => (v.trim().length < 3 ? "Nama minimal 3 karakter." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Format email belum benar."),
  telepon: (v) =>
    /^(\+62|62|0)8[0-9]{8,11}$/.test(v.replace(/[\s-]/g, "")) ? "" : "Gunakan nomor Indonesia, contoh 081234567890.",
  tglLahir: (v) => {
    if (!v) return "Tanggal lahir wajib diisi."
    const umur = (Date.now() - new Date(v)) / (365.25 * 24 * 3600 * 1000)
    return umur < 15 ? "Usia minimal 15 tahun." : ""
  },
  gender: (v) => (v ? "" : "Pilih jenis kelamin."),
  paket: (v) => (v ? "" : "Pilih paket membership."),
  tglMulai: (v) => (v ? "" : "Tanggal mulai wajib diisi."),
  setuju: (v) => (v ? "" : "Kamu perlu menyetujui syarat dan ketentuan."),
}
const URUTAN = Object.keys(rules) // sama dengan urutan field di form

const awal = () => ({ nama: "", email: "", telepon: "", tglLahir: "", gender: "", tglMulai: toInputDate(new Date()), setuju: false })

// Label + pesan error (<small>) untuk satu field
function L({ name, err, className, children }) {
  return (
    <label className={[className, err[name] ? "invalid" : ""].filter(Boolean).join(" ") || undefined}>
      {children}
      <small>{err[name] || ""}</small>
    </label>
  )
}

export default function Join({ paket, setPaket }) {
  const [v, setV] = useState(awal)
  const [err, setErr] = useState({})
  const [msg, setMsg] = useState({ text: "", type: "" })
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const val = { ...v, paket }
  const cek = (name, nilai) => rules[name](nilai)

  const ubah = (name, nilai) => {
    if (name === "paket") setPaket(nilai)
    else setV((x) => ({ ...x, [name]: nilai }))
    if (err[name]) setErr((x) => ({ ...x, [name]: cek(name, nilai) })) // cek ulang tiap ketikan setelah error muncul
  }
  const blur = (name) => setErr((x) => ({ ...x, [name]: cek(name, val[name]) }))

  // Ringkasan masa berlaku
  const p = PAKET.find((x) => String(x.id) === paket)
  const ada = p && v.tglMulai
  const berakhir = ada ? tambahBulan(new Date(v.tglMulai + "T00:00"), p.durasi) : null

  async function submit(e) {
    e.preventDefault()
    setMsg({ text: "", type: "" })
    const hasil = Object.fromEntries(URUTAN.map((n) => [n, cek(n, val[n])]))
    setErr(hasil)
    const pertama = URUTAN.find((n) => hasil[n])
    if (pertama) return formRef.current.elements[pertama].focus()

    const data = {
      nama: v.nama.trim(),
      email: v.email.trim(),
      telepon: v.telepon.replace(/[\s-]/g, ""),
      tanggal_lahir: v.tglLahir,
      jenis_kelamin: v.gender,
      paket_id: Number(paket),
      tanggal_mulai: v.tglMulai,
    }
    setLoading(true)
    try {
      /* TODO (tahap backend): ganti blok simulasi ini dengan request ke Express.
         Backend sebaiknya: buat record membership (belum aktif), hitung
         tanggal_berakhir dari durasi paket, dan buat record pembayaran "unpaid".

         const res = await fetch("http://localhost:3000/api/memberships", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
         });
         if (!res.ok) throw new Error((await res.json()).message);
      */
      console.log("Data pendaftaran:", data)
      await new Promise((r) => setTimeout(r, 800)) // simulasi loading
      setMsg({ text: "Pendaftaran diterima. Selesaikan pembayaran agar membership kamu aktif.", type: "success" })
      setV(awal())
      setPaket("")
      setErr({})
    } catch (er) {
      setMsg({ text: er.message || "Pendaftaran gagal. Coba lagi sebentar lagi.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  // Props umum tiap field
  const f = (name) => ({
    name,
    required: true,
    value: val[name],
    onChange: (e) => ubah(name, e.target.value),
    onBlur: () => blur(name),
  })
  return (
    <section className="join" id="join">
      <div className="join-container">
        <div className="join-info">
          <h2>Mulai latihan bersama FitArea</h2>
          <p>
            Isi formulir, pilih paket, dan membership kamu aktif setelah
            pembayaran dikonfirmasi. Tanggal berakhir dihitung otomatis dari
            durasi paket.
          </p>
          <ol>
            <li><strong>Isi data diri</strong><span>Nama, kontak, dan paket pilihan kamu.</span></li>
            <li><strong>Lakukan pembayaran</strong><span>Status awal unpaid, berubah jadi paid setelah lunas.</span></li>
            <li><strong>Membership aktif</strong><span>Kamu bisa booking kelas dan check-in.</span></li>
          </ol>
        </div>

        <form className="join-form" id="joinForm" noValidate ref={formRef} onSubmit={submit}>
          <div className="join-head">
            <h3>Formulir pendaftaran</h3>
            <img src="/hiasan_icon.jpg" alt="" width="64" height="64" />
          </div>

          <L name="nama" err={err}>Nama lengkap
            <input type="text" autoComplete="name" placeholder="Contoh: Andi Pratama" {...f("nama")} />
          </L>

          <div className="join-row">
            <L name="email" err={err}>Email
              <input type="email" autoComplete="email" placeholder="nama@email.com" {...f("email")} />
            </L>
            <L name="telepon" err={err}>No. WhatsApp
              <input type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" {...f("telepon")} />
            </L>
          </div>

          <div className="join-row">
            <L name="tglLahir" err={err}>Tanggal lahir
              <input type="date" {...f("tglLahir")} />
            </L>
            <L name="gender" err={err}>Jenis kelamin
              <select {...f("gender")}>
                <option value="">Pilih</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </L>
          </div>

          <L name="paket" err={err}>Paket membership
            <select id="paket" {...f("paket")}>
              <option value="">Pilih paket</option>
              {PAKET.map((x) => (
                <option key={x.id} value={x.id}>{x.nama} - {x.durasi} bulan</option>
              ))}
            </select>
          </L>

          <L name="tglMulai" err={err}>Tanggal mulai
            <input type="date" id="tglMulai" min={toInputDate(new Date())} {...f("tglMulai")} />
          </L>

          <dl className="join-summary" aria-live="polite">
            <div><dt>Paket</dt><dd id="sumPaket">{p ? `${p.nama} (${p.durasi} bulan)` : "-"}</dd></div>
            <div><dt>Berlaku sampai</dt><dd id="sumBerakhir">{ada ? formatTanggal(berakhir) : "-"}</dd></div>
            <div><dt>Total bayar</dt><dd id="sumTotal">{ada ? formatRupiah(p.harga) : "-"}</dd></div>
          </dl>

          <L name="setuju" err={err} className="join-check">
            <input
              type="checkbox" name="setuju" required checked={v.setuju}
              onChange={(e) => ubah("setuju", e.target.checked)}
              onBlur={() => blur("setuju")}
            />
            <span>Saya setuju dengan syarat dan ketentuan keanggotaan FitArea.</span>
          </L>

          <button type="submit" className="join-btn" id="btnSubmit" disabled={loading}>
            {loading ? "Memproses..." : "Daftar sekarang"}
          </button>

          <p className={"join-msg" + (msg.type ? " " + msg.type : "")} id="formMessage" role="status">{msg.text}</p>
        </form>
      </div>
    </section>
  )
}
