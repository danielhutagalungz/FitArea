export default function Hero() {
  return (
<section
      id="hero"
      className="relative grid grid-cols-[1fr_1fr] min-h-[90vh] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[200px] after:bg-[linear-gradient(to_bottom,transparent,var(--bg))] after:pointer-events-none after:z-[1] max-[800px]:grid-cols-[1fr] max-[800px]:grid-rows-[1fr] max-[800px]:min-h-[100svh] max-[800px]:after:h-24"
    >
      
      <div
        className="[background:linear-gradient(to_bottom,rgba(6,30,41,0.75),transparent_25%),linear-gradient(to_right,transparent_55%,var(--bg)),url('gym3hade.jpeg')_center_40%/cover_no-repeat] max-[800px]:row-start-1 max-[800px]:col-start-1 max-[800px]:[background:linear-gradient(to_bottom,rgba(6,30,41,0.85),rgba(6,30,41,0.55)_35%,rgba(6,30,41,0.92)),url('gym3hade.jpeg')_center/cover_no-repeat]"
        role="img"
        aria-label="Area angkat beban di Fit Area"
      ></div>

      <div
        className="relative z-[2] flex flex-col justify-center items-start pt-[calc(var(--nav-h)+48px)] pr-[8vw] pb-24 pl-8 max-[800px]:row-start-1 max-[800px]:col-start-1 max-[800px]:pt-[calc(var(--nav-h)+32px)] max-[800px]:px-6"
      >
        <h1
          className="font-heading text-[length:clamp(3.5rem,8vw,7rem)] font-bold leading-[0.95] uppercase text-ink"
        >
          Fit Area
        </h1>
        <p
          className="mt-5 font-heading text-[length:clamp(1.25rem,2.2vw,1.75rem)] font-normal text-aksen"
        >
          Latihan serius, tempat yang nyaman.
        </p>
        <p className="mt-4 max-w-[460px] font-body leading-[1.7] text-ink opacity-[0.85]">
          Alat lengkap, pelatih bersertifikat, dan buka dari subuh sampai malam.
          Daftar hari ini, mulai latihan besok pagi.
        </p>

        <div className="flex flex-wrap gap-4 mt-9">
          <a
            href="#membership"
            className="inline-block py-[14px] px-[30px] rounded-full font-body font-medium bg-aksen text-page transition-[background-color,color,border-color] duration-200 ease-[ease] hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4 max-[480px]:flex-[1_1_100%] max-[480px]:text-center"
            >Daftar member</a
          >
        </div>

        
        <dl className="flex flex-wrap gap-x-8 gap-y-5 mt-12 max-[800px]:gap-x-6 max-[800px]:gap-y-4">
          <div className="border-l-2 border-aksen pl-[14px]">
            <dt className="text-[0.85rem] opacity-70">Jam buka</dt>
            <dd className="mt-1 text-[1.1rem] font-medium">05.00–23.00</dd>
          </div>
          <div className="border-l-2 border-aksen pl-[14px]">
            <dt className="text-[0.85rem] opacity-70">Mulai dari</dt>
            <dd className="mt-1 text-[1.1rem] font-medium">Rp250.000</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
