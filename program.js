/* =========================================================
   PROGRAM LATIHAN: render card, pencarian, animasi scroll
   ========================================================= */

// 1. Data program (tambah/ubah di sini, card otomatis menyesuaikan)
const dataProgram = [
  {
    nama: "Yoga",
    ikon: "🧘",
    level: "Semua level",
    deskripsi: "Latih fleksibilitas, keseimbangan, dan ketenangan pikiran lewat gerakan dan pernapasan terarah.",
    kata: "fleksibel relaksasi stres peregangan",
  },
  {
    nama: "Zumba",
    ikon: "💃",
    level: "Pemula",
    deskripsi: "Olahraga menari dengan musik energik. Seru, membakar kalori, dan cocok untuk yang bosan treadmill.",
    kata: "dance menari kalori seru",
  },
  {
    nama: "HIIT",
    ikon: "⚡",
    level: "Menengah",
    deskripsi: "Latihan interval intensitas tinggi dalam waktu singkat untuk membakar lemak secara maksimal.",
    kata: "interval bakar lemak intens cepat",
  },
  {
    nama: "Strength Training",
    ikon: "🏋️",
    level: "Semua level",
    deskripsi: "Bangun otot dan kekuatan dengan beban bebas dan mesin, dibimbing teknik yang benar.",
    kata: "otot beban angkat massa kekuatan",
  },
  {
    nama: "Cardio",
    ikon: "🏃",
    level: "Pemula",
    deskripsi: "Tingkatkan stamina dan kesehatan jantung dengan sesi kardio yang bisa disesuaikan kemampuanmu.",
    kata: "stamina jantung lari endurance",
  },
  {
    nama: "Boxing",
    ikon: "🥊",
    level: "Menengah",
    deskripsi: "Kombinasi teknik pukulan, footwork, dan conditioning untuk badan bugar dan mental tangguh.",
    kata: "tinju pukul bela diri stres",
  },
];

// 2. Elemen HTML
const programGrid = document.getElementById("programGrid");
const programInfo = document.getElementById("programInfo");
const programKosong = document.getElementById("programKosong");
const cariProgram = document.getElementById("cariProgram");
const hapusCari = document.getElementById("hapusCari");

// 3. Observer: card muncul pelan saat masuk layar
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("tampil");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      )
    : null;

// 4. Buat satu card (textContent dipakai agar aman dari injeksi HTML)
function buatCard(item, urutan) {
  const card = document.createElement("article");
  card.className = "program-card";
  card.style.transitionDelay = (urutan % 3) * 0.08 + "s"; // muncul bergantian

  const ikon = document.createElement("div");
  ikon.className = "program-ikon";
  ikon.setAttribute("aria-hidden", "true");
  ikon.textContent = item.ikon;

  const judul = document.createElement("h3");
  judul.textContent = item.nama;

  const desk = document.createElement("p");
  desk.textContent = item.deskripsi;

  const level = document.createElement("span");
  level.className = "program-level";
  level.textContent = item.level;

  card.append(ikon, judul, desk, level);
  return card;
}

// 5. Tampilkan program sesuai kata kunci
function tampilkanProgram(kataKunci) {
  const q = kataKunci.trim().toLowerCase();

  const hasil = dataProgram.filter((p) =>
    (p.nama + " " + p.deskripsi + " " + p.level + " " + p.kata)
      .toLowerCase()
      .includes(q)
  );

  programGrid.innerHTML = "";
  hasil.forEach((item, i) => {
    const card = buatCard(item, i);
    programGrid.appendChild(card);
    if (revealObserver) revealObserver.observe(card);
    else card.classList.add("tampil");
  });

  programKosong.hidden = hasil.length > 0;
  programInfo.textContent = q
    ? "Menampilkan " + hasil.length + " dari " + dataProgram.length + " program"
    : "";
  hapusCari.hidden = q === "";
}

// 6. Event
cariProgram.addEventListener("input", () => tampilkanProgram(cariProgram.value));
hapusCari.addEventListener("click", () => {
  cariProgram.value = "";
  tampilkanProgram("");
  cariProgram.focus();
});

// 7. Tampilan awal
tampilkanProgram("");