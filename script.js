/* =========================================================
   NAVBAR
   ========================================================= */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// 1) Buka/tutup menu di mobile
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen); // untuk screen reader
});

// 2) Tutup menu otomatis setelah salah satu link diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
  });
});

// 3) Navbar jadi solid saat halaman di-scroll
function handleScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", handleScroll);
handleScroll(); // jalankan sekali saat load

// 4) Tandai link aktif sesuai section yang sedang terlihat
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]:not(.nav-btn)');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // aktif saat section ada di tengah layar
);
navLinks.forEach((l) => {
  const target = document.querySelector(l.getAttribute("href"));
  if (target) observer.observe(target); // section yang belum dibuat otomatis dilewati
});

/* =========================================================
   FORM JOIN MEMBERSHIP
   ========================================================= */
const form = document.getElementById("joinForm");
const paketSelect = document.getElementById("paket");
const tglMulai = document.getElementById("tglMulai");
const sumPaket = document.getElementById("sumPaket");
const sumBerakhir = document.getElementById("sumBerakhir");
const sumTotal = document.getElementById("sumTotal");
const formMessage = document.getElementById("formMessage");
const btnSubmit = document.getElementById("btnSubmit");

// Format ke "20 November 2026" dan "Rp 650.000"
const formatTanggal = (d) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

// yyyy-mm-dd dari tanggal LOKAL (toISOString bisa bergeser sehari karena zona waktu)
function toInputDate(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Tanggal mulai tidak boleh sebelum hari ini; default = hari ini
tglMulai.min = toInputDate(new Date());
tglMulai.value = toInputDate(new Date());

// Tambah bulan dengan aman (31 Jan + 1 bulan -> 28/29 Feb, bukan 3 Maret)
function tambahBulan(tanggal, bulan) {
  const hasil = new Date(tanggal);
  const hariAsal = hasil.getDate();
  hasil.setDate(1);
  hasil.setMonth(hasil.getMonth() + bulan);
  const hariTerakhir = new Date(hasil.getFullYear(), hasil.getMonth() + 1, 0).getDate();
  hasil.setDate(Math.min(hariAsal, hariTerakhir));
  return hasil;
}

// Update kotak ringkasan setiap paket / tanggal berubah
function updateSummary() {
  const opt = paketSelect.selectedOptions[0];
  if (!opt || !opt.value || !tglMulai.value) {
    sumPaket.textContent = sumBerakhir.textContent = sumTotal.textContent = "-";
    return;
  }
  const durasi = Number(opt.dataset.durasi); // bulan
  const harga = Number(opt.dataset.harga);
  const mulai = new Date(tglMulai.value + "T00:00"); // dibaca sebagai tanggal lokal
  const berakhir = tambahBulan(mulai, durasi); // tanggal berakhir otomatis

  sumPaket.textContent = `${opt.dataset.nama} (${durasi} bulan)`;
  sumBerakhir.textContent = formatTanggal(berakhir);
  sumTotal.textContent = formatRupiah(harga);
}
paketSelect.addEventListener("change", updateSummary);
tglMulai.addEventListener("change", updateSummary);

/* ---------- Validasi ---------- */
// Tiap aturan mengembalikan pesan error, atau "" jika valid
const rules = {
  nama: (v) => (v.trim().length < 3 ? "Nama minimal 3 karakter." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Format email belum benar."),
  // Nomor Indonesia: 08xx, 628xx, atau +628xx
  telepon: (v) =>
    /^(\+62|62|0)8[0-9]{8,11}$/.test(v.replace(/[\s-]/g, ""))
      ? ""
      : "Gunakan nomor Indonesia, contoh 081234567890.",
  tglLahir: (v) => {
    if (!v) return "Tanggal lahir wajib diisi.";
    const umur = (Date.now() - new Date(v)) / (365.25 * 24 * 3600 * 1000);
    return umur < 15 ? "Usia minimal 15 tahun." : "";
  },
  gender: (v) => (v ? "" : "Pilih jenis kelamin."),
  paket: (v) => (v ? "" : "Pilih paket membership."),
  tglMulai: (v) => (v ? "" : "Tanggal mulai wajib diisi."),
};

// Tampilkan/hapus pesan error di <small> dalam label yang sama
function setError(input, message) {
  const label = input.closest("label");
  label.classList.toggle("invalid", Boolean(message));
  label.querySelector("small").textContent = message;
}

function validateField(input) {
  let message = "";
  if (input.name === "setuju") {
    message = input.checked ? "" : "Kamu perlu menyetujui syarat dan ketentuan.";
  } else if (rules[input.name]) {
    message = rules[input.name](input.value);
  }
  setError(input, message);
  return !message;
}

// Validasi langsung saat pindah field; setelah error muncul, cek ulang tiap ketikan
form.querySelectorAll("input, select").forEach((el) => {
  el.addEventListener("blur", () => validateField(el));
  el.addEventListener("input", () => {
    if (el.closest("label").classList.contains("invalid")) validateField(el);
  });
});

/* ---------- Submit ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMessage.className = "join-msg";

  // Cek semua field (tidak berhenti di error pertama supaya semua pesan muncul)
  const fields = [...form.querySelectorAll("input, select")];
  const semuaValid = fields.map(validateField).every(Boolean);
  if (!semuaValid) {
    form.querySelector(".invalid input, .invalid select")?.focus();
    return;
  }

  // Data yang dikirim ke backend (nama key bisa disesuaikan dengan tabel nanti)
  const data = {
    nama: form.nama.value.trim(),
    email: form.email.value.trim(),
    telepon: form.telepon.value.replace(/[\s-]/g, ""),
    tanggal_lahir: form.tglLahir.value,
    jenis_kelamin: form.gender.value,
    paket_id: Number(form.paket.value),
    tanggal_mulai: form.tglMulai.value,
  };

  btnSubmit.disabled = true;
  btnSubmit.textContent = "Memproses...";

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
    console.log("Data pendaftaran:", data);
    await new Promise((r) => setTimeout(r, 800)); // simulasi loading

    formMessage.textContent = "Pendaftaran diterima. Selesaikan pembayaran agar membership kamu aktif.";
    formMessage.classList.add("success");
    form.reset();
    tglMulai.value = toInputDate(new Date());
    updateSummary();
  } catch (err) {
    formMessage.textContent = err.message || "Pendaftaran gagal. Coba lagi sebentar lagi.";
    formMessage.classList.add("error");
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Daftar sekarang";
  }
});


// LOGIKA FAQ ACCORDION (SINGLE-OPEN)
// ------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua elemen tombol header accordion
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const isOpen = currentItem.classList.contains("active");

      // Logika Single-Open: Tutup semua item accordion yang sedang aktif/terbuka
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        
        // Reset atribut accessibility aria-expanded
        const itemHeader = item.querySelector(".accordion-header");
        if (itemHeader) {
          itemHeader.setAttribute("aria-expanded", "false");
        }
      });

      // Jika item yang diklik sebelumnya tidak terbuka, buka item tersebut
      if (!isOpen) {
        currentItem.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
});

