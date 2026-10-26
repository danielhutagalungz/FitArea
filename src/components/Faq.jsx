import { useState } from "react"
import { dataFaq } from "../data"

export default function Faq() {
  const [open, setOpen] = useState(null) // single-open: hanya satu item terbuka

  return (
    <section id="faq" className="max-w-[1000px] mx-auto py-20 px-5 scroll-mt-[var(--nav-h)]">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[var(--font-color)] font-['Oswald'] relative after:content-[''] after:block after:w-[56px] after:h-[3px] after:mx-auto after:mt-3.5 after:bg-[var(--aksen)] after:rounded-sm">
          Pertanyaan Umum (FAQ)
        </h2>
        <p className="text-center text-[var(--font-sekunder)] mt-4 mb-8 text-sm sm:text-base">
          Temukan jawaban untuk pertanyaan yang sering ditanyakan mengenai Fitarea GYM.
        </p>
        <div className="accordion flex flex-col gap-3">
          {dataFaq.map((f, i) => (

          <div key={i} className={`accordion-item bg-[var(--card)] border border-[var(--line)] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[var(--card-hover)] hover:border-[var(--aksen)]${open === i ? " active" : ""}`}>
            <button className="accordion-header w-full py-[18px] px-[20px] bg-transparent text-[var(--font-color)] font-medium text-left flex justify-between items-center cursor-pointer transition-colors duration-200 hover:text-[var(--aksen)]" type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span>{f.q}</span>
              <span className="accordion-icon text-[var(--aksen)] text-xs transition-transform duration-300">&#9660;</span>
            </button>
            <div className="accordion-content max-h-0 overflow-hidden bg-[var(--surface)] px-[20px] transition-all duration-300 ease-out">
              <p className="text-[var(--font-color)] text-opacity-85 text-sm sm:text-base leading-relaxed py-4">{f.a}</p>
            </div>
          </div>

          
          ))}
        </div>
      </div>
    </section>
  )
}
