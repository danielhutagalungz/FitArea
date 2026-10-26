// Klik "Pilih paket" -> isi dropdown paket di form pendaftaran
document.querySelectorAll(".btn-paket").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const select = document.getElementById("paket");
    select.value = tombol.dataset.paket;

    // Memicu event change supaya ringkasan (Paket, Berlaku sampai, Total) ikut update
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
});