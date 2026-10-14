// 1. Data jadwal (array of object)
const dataJadwal = [
  { hari: "Senin",  jam: "06:00 - 07:00", kelas: "Yoga",              trainer: "Dewi Anggraini", durasi: "60 menit" },
  { hari: "Senin",  jam: "17:00 - 18:00", kelas: "HIIT",              trainer: "Rafi Pratama",   durasi: "60 menit" },
  { hari: "Senin",  jam: "19:00 - 20:00", kelas: "Strength Training", trainer: "Bima Saputra",   durasi: "60 menit" },

  { hari: "Selasa", jam: "07:00 - 08:00", kelas: "Zumba",             trainer: "Sinta Maharani", durasi: "60 menit" },
  { hari: "Selasa", jam: "18:00 - 19:00", kelas: "Boxing",            trainer: "Andre Wijaya",   durasi: "60 menit" },
  { hari: "Selasa", jam: "19:30 - 20:30", kelas: "Cardio",            trainer: "Laras Putri",    durasi: "60 menit" },

  { hari: "Rabu",   jam: "06:00 - 07:00", kelas: "Cardio",            trainer: "Laras Putri",    durasi: "60 menit" },
  { hari: "Rabu",   jam: "17:30 - 18:30", kelas: "Yoga",              trainer: "Dewi Anggraini", durasi: "60 menit" },
  { hari: "Rabu",   jam: "19:00 - 20:00", kelas: "HIIT",              trainer: "Rafi Pratama",   durasi: "60 menit" },

  { hari: "Kamis",  jam: "07:00 - 08:00", kelas: "Strength Training", trainer: "Bima Saputra",   durasi: "60 menit" },
  { hari: "Kamis",  jam: "18:00 - 19:00", kelas: "Zumba",             trainer: "Sinta Maharani", durasi: "60 menit" },
  { hari: "Kamis",  jam: "19:30 - 20:30", kelas: "Boxing",            trainer: "Andre Wijaya",   durasi: "60 menit" },

  { hari: "Jumat",  jam: "06:00 - 07:00", kelas: "HIIT",              trainer: "Rafi Pratama",   durasi: "60 menit" },
  { hari: "Jumat",  jam: "17:00 - 18:00", kelas: "Yoga",              trainer: "Dewi Anggraini", durasi: "60 menit" },
  { hari: "Jumat",  jam: "19:00 - 20:00", kelas: "Cardio",            trainer: "Laras Putri",    durasi: "60 menit" },

  { hari: "Sabtu",  jam: "08:00 - 09:00", kelas: "Zumba",             trainer: "Sinta Maharani", durasi: "60 menit" },
  { hari: "Sabtu",  jam: "09:30 - 10:30", kelas: "Boxing",            trainer: "Andre Wijaya",   durasi: "60 menit" },
  { hari: "Sabtu",  jam: "11:00 - 12:00", kelas: "Strength Training", trainer: "Bima Saputra",   durasi: "60 menit" }
];

// 2. Ambil elemen dari HTML
const isiJadwal    = document.getElementById("isi-jadwal");
const infoJumlah   = document.getElementById("info-jumlah");
const filterWrap   = document.getElementById("filter");
const tombolHari   = filterWrap.querySelectorAll("button");
const tombolToggle = document.getElementById("toggle-jadwal");

// 3. Variabel pengatur tabel pendek / panjang
const BATAS_BARIS = 5;      // jumlah baris saat tabel dalam keadaan pendek
let tampilSemua = false;    // false = pendek, true = panjang
let hariAktif = "Semua";    // hari yang sedang dipilih

// 4. Fungsi menampilkan jadwal sesuai hari
function tampilkanJadwal(hari) {
  hariAktif = hari;

  // Filter data: jika "Semua" tampilkan semuanya
  let hasil;
  if (hari === "Semua") {
    hasil = dataJadwal;
  } else {
    hasil = dataJadwal.filter(function (item) {
      return item.hari === hari;
    });
  }

  // Kosongkan tabel
  isiJadwal.innerHTML = "";

  // Jika tidak ada kelas
  if (hasil.length === 0) {
    isiJadwal.innerHTML =
      '<tr><td colspan="5" class="kosong">Belum ada kelas di hari ini.</td></tr>';
    infoJumlah.textContent = "";
    tombolToggle.style.display = "none";
    return;
  }

  // Tentukan baris yang ditampilkan (pendek atau semua)
  const perluTombol = hasil.length > BATAS_BARIS;
  let tampil;
  if (perluTombol && !tampilSemua) {
    tampil = hasil.slice(0, BATAS_BARIS);
  } else {
    tampil = hasil;
  }

  // Buat baris untuk setiap kelas
  tampil.forEach(function (item) {
    const baris = document.createElement("tr");
    baris.innerHTML =
      '<td><span class="badge-hari">' + item.hari + "</span></td>" +
      "<td>" + item.jam + "</td>" +
      '<td class="nama-kelas">' + item.kelas + "</td>" +
      "<td>" + item.trainer + "</td>" +
      "<td>" + item.durasi + "</td>";
    isiJadwal.appendChild(baris);
  });

  // Teks info jumlah
  const labelHari = (hari === "Semua") ? "Senin - Sabtu" : hari;
  infoJumlah.textContent =
    "Menampilkan " + tampil.length + " dari " + hasil.length +
    " kelas (" + labelHari + ")";

  // Tombol lihat selengkapnya hanya muncul jika data lebih dari batas
  if (perluTombol) {
    tombolToggle.style.display = "inline-flex";
    tombolToggle.classList.toggle("terbuka", tampilSemua);
    tombolToggle.querySelector(".teks-tombol").textContent =
      tampilSemua ? "Tampilkan Lebih Sedikit" : "Lihat Selengkapnya";
  } else {
    tombolToggle.style.display = "none";
  }
}

// 5. Event klik tombol filter hari
tombolHari.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    // Pindahkan class "aktif"
    tombolHari.forEach(function (t) { t.classList.remove("aktif"); });
    tombol.classList.add("aktif");

    // Setiap ganti hari, tabel kembali pendek
    tampilSemua = false;
    tampilkanJadwal(tombol.dataset.hari);
  });
});

// 6. Event klik tombol panjangkan / pendekkan tabel
tombolToggle.addEventListener("click", function () {
  // Catat posisi tombol di layar sebelum tabel berubah tinggi
  const topSebelum = tombolToggle.getBoundingClientRect().top;

  tampilSemua = !tampilSemua;
  tampilkanJadwal(hariAktif);

  // Setelah tabel memendek/memanjang, geser scroll supaya tombol tetap
  // di posisi layar yang sama (tidak "loncat" ke section di bawahnya).
  // behavior "instant" menimpa scroll-behavior: smooth di CSS.
  const selisih = tombolToggle.getBoundingClientRect().top - topSebelum;
  if (selisih !== 0) {
    window.scrollBy({ top: selisih, left: 0, behavior: "instant" });
  }
});

// 7. Tampilkan jadwal saat halaman pertama dibuka
tampilkanJadwal("Semua");