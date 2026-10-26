const trainers = [
  { nama: "pebrian omaigod", spes: "Yoga", hari: "Sen · Rab · Jum", init: "PO", foto: "trainer/dewi-anggraini.jpg" },
  { nama: "rapli kelas", spes: "HIIT", hari: "Sen · Rab · Jum", init: "RK", foto: "trainer/rafi-pratama.jpg" },
  { nama: "danil kudanil", spes: "Strength Training", hari: "Sen · Kam · Sab", init: "DK", foto: "trainer/bima-saputra.jpg" },
  { nama: "prans baisikel", spes: "Zumba", hari: "Sel · Kam · Sab", init: "PB", foto: "trainer/sinta-maharani.jpg" },
  { nama: "adit bas", spes: "Boxing", hari: "Sel · Kam · Sab", init: "AB", foto: "trainer/andre-wijaya.jpg" },
  { nama: "bang kris", spes: "Cardio", hari: "Sel · Rab · Jum", init: "BK", foto: "trainer/laras-putri.jpg" },
];

export default function Trainer() {
  return (
    <section id="trainer" className="max-w-[1200px] mx-auto py-20 px-5 scroll-mt-[var(--nav-h)] max-[480px]:py-14 max-[480px]:px-4">
      <h2 className="font-heading text-[length:clamp(2rem,5vw,2.5rem)] uppercase tracking-[1px] text-center text-ink after:content-[''] after:block after:w-14 after:h-[3px] after:mt-[14px] after:mx-auto after:bg-aksen after:rounded-sm">Tim Trainer</h2>
      <p className="text-center text-muted mt-4 mb-12">Dibimbing langsung oleh pelatih bersertifikat FitArea</p>
      <div className="grid grid-cols-[repeat(3,1fr)] gap-6 max-[900px]:grid-cols-[repeat(2,1fr)] max-[480px]:gap-3.5">
        {trainers.map((t) => (
<article key={t.nama}
          className="group relative overflow-hidden rounded-xl bg-card border border-line transition-[transform,border-color,box-shadow] duration-[250ms] ease-[ease] hover:-translate-y-2 hover:border-aksen hover:shadow-[0_14px_28px_rgba(0,0,0,0.4)]"
        >
          
          <div
            className={`relative aspect-[4/5] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,var(--primary),var(--card)_75%)] before:content-[''] before:absolute before:inset-0 before:z-[1] before:bg-[url('trainer/${t.foto}')] before:bg-center before:bg-cover before:bg-no-repeat before:transition-transform before:duration-500 before:ease-[ease] group-hover:before:scale-[1.06]`}
          >
            <span
              className="font-heading text-[length:clamp(3rem,8vw,4.5rem)] font-medium tracking-[2px] text-[rgba(243,244,244,0.3)]"
              aria-hidden="true"
              >{t.init}</span
            >
          </div>
          <div
            className="absolute inset-x-0 bottom-0 z-[2] pt-14 px-5 pb-5 bg-[linear-gradient(to_top,rgba(6,30,41,0.96),rgba(6,30,41,0.75)_55%,transparent)] max-[480px]:pt-10 max-[480px]:px-3 max-[480px]:pb-3.5"
          >
            <h3
              className="font-heading text-[1.35rem] font-medium leading-[1.2] text-ink max-[480px]:text-[1.05rem]"
            >
              {t.nama}
            </h3>
            <p
              className="inline-block mt-2 py-[3px] px-3 rounded-full bg-aksen text-page text-[0.8rem] font-bold leading-[1.3] max-[480px]:text-[0.7rem] max-[480px]:px-2.5"
            >
              {t.spes}
            </p>
            <p className="mt-2 text-[0.85rem] text-muted max-[480px]:text-[0.75rem]">
              {t.hari}
            </p>
          </div>
        </article>
        ))}
      </div>
    </section>
  )
}
