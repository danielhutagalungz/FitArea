(function () {
  const form = document.getElementById("bmiForm");
  const inTinggi = document.getElementById("bmiTinggi");
  const inBerat = document.getElementById("bmiBerat");
  const btnReset = document.getElementById("bmiReset");
  const hasil = document.getElementById("bmiHasil");
  const angka = document.getElementById("bmiAngka");
  const kategoriEl = document.getElementById("bmiKategori");
  const pesanEl = document.getElementById("bmiPesan");
  const marker = document.getElementById("bmiMarker");
  const idealEl = document.getElementById("bmiIdeal");
  const selisihEl = document.getElementById("bmiSelisih");

  // Kategori BMI (klasifikasi WHO untuk dewasa)
  const kategori = [
    {
      maks: 18.5,
      kunci: "kurang",
      nama: "Berat badan kurang",
      pesan: "Berat badanmu di bawah rentang sehat. Fokus ke asupan kalori dan protein yang cukup, ditambah latihan beban untuk membangun massa otot.",
    },
    {
      maks: 25,
      kunci: "normal",
      nama: "Berat badan normal",
      pesan: "Mantap! Berat badanmu ada di rentang sehat. Pertahankan dengan latihan rutin dan pola makan seimbang.",
    },
    {
      maks: 30,
      kunci: "berlebih",
      nama: "Berat badan berlebih",
      pesan: "Berat badanmu sedikit di atas rentang sehat. Kombinasi kardio, HIIT, dan latihan beban bisa membantu menurunkannya secara bertahap.",
    },
    {
      maks: Infinity,
      kunci: "obesitas",
      nama: "Obesitas",
      pesan: "Risiko kesehatan meningkat di kategori ini. Mulai pelan-pelan dengan kardio ringan dan konsultasikan program latihan dengan trainer atau dokter.",
    },
  ];

  // Skala gauge: BMI 15 (kiri) sampai 40 (kanan)
  const SKALA_MIN = 15;
  const SKALA_MAX = 40;

  const fmt = (n, d = 1) =>
    n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

  // Pesan error di <small> dalam label yang sama (pola sama dengan form join)
  function setError(input, pesan) {
    const label = input.closest("label");
    label.classList.toggle("invalid", Boolean(pesan));
    label.querySelector("small").textContent = pesan;
  }

  function baca(input, min, max, nama) {
    const nilai = parseFloat(String(input.value).replace(",", "."));
    if (!input.value.trim() || Number.isNaN(nilai)) {
      setError(input, nama + " wajib diisi.");
      return null;
    }
    if (nilai < min || nilai > max) {
      setError(input, nama + " harus antara " + min + " dan " + max + ".");
      return null;
    }
    setError(input, "");
    return nilai;
  }

  function tampilkan(tinggiCm, beratKg) {
    const m = tinggiCm / 100;
    const bmi = beratKg / (m * m);
    const info = kategori.find((k) => bmi < k.maks);

    // Rentang berat ideal (BMI 18,5 - 24,9)
    const beratMin = 18.5 * m * m;
    const beratMaks = 24.9 * m * m;

    let selisih;
    if (beratKg > beratMaks) {
      selisih = "Turun sekitar " + fmt(beratKg - beratMaks) + " kg";
    } else if (beratKg < beratMin) {
      selisih = "Naik sekitar " + fmt(beratMin - beratKg) + " kg";
    } else {
      selisih = "Sudah di rentang ideal";
    }

    angka.textContent = fmt(bmi);
    kategoriEl.textContent = info.nama;
    pesanEl.textContent = info.pesan;
    idealEl.textContent = fmt(beratMin) + " - " + fmt(beratMaks) + " kg";
    selisihEl.textContent = selisih;
    hasil.dataset.kategori = info.kunci;

    // Geser penanda di gauge (dibatasi 0-100%)
    const persen = ((bmi - SKALA_MIN) / (SKALA_MAX - SKALA_MIN)) * 100;
    marker.style.left = Math.min(100, Math.max(0, persen)) + "%";
    marker.classList.add("tampil");
  }

  function kosongkan() {
    angka.textContent = "--";
    kategoriEl.textContent = "Belum dihitung";
    pesanEl.textContent = "Isi tinggi dan berat badan, lalu tekan Hitung BMI.";
    idealEl.textContent = "-";
    selisihEl.textContent = "-";
    hasil.dataset.kategori = "";
    marker.classList.remove("tampil");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tinggi = baca(inTinggi, 100, 250, "Tinggi badan");
    const berat = baca(inBerat, 20, 300, "Berat badan");

    if (tinggi === null || berat === null) {
      form.querySelector(".invalid input")?.focus();
      kosongkan();
      return;
    }
    tampilkan(tinggi, berat);
  });

  // Hapus pesan error begitu pengguna mengetik lagi
  [inTinggi, inBerat].forEach((el) =>
    el.addEventListener("input", () => {
      if (el.closest("label").classList.contains("invalid")) setError(el, "");
    })
  );

  btnReset.addEventListener("click", () => {
    form.reset();
    setError(inTinggi, "");
    setError(inBerat, "");
    kosongkan();
    inTinggi.focus();
  });

  kosongkan();
})();