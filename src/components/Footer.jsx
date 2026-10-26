export default function Footer() {
  return (
<footer className="site-footer bg-[var(--surface)] text-[var(--font-color)] pt-14 border-t border-[var(--line)]">
      <div className="footer-container max-w-[1100px] mx-auto px-5 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className="footer-col brand-col">
          <h3 className="footer-logo font-['Oswald'] text-3xl font-bold text-[var(--font-color)] mb-3">
            Fit<span className="text-[var(--aksen)]">Area</span>
          </h3>
          <p className="text-[var(--font-color)] text-opacity-75 text-sm leading-relaxed">
            Pusat kebugaran modern dengan fasilitas lengkap dan trainer berpengalaman untuk membantu mencapai bentuk tubuh idealmu.
          </p>
        </div>

        
        <div className="footer-col">
          <h4 className="font-['Oswald'] text-lg font-medium tracking-wide uppercase text-[var(--aksen)] mb-4">
            Jam Operasional
          </h4>
          <ul className="footer-info space-y-2.5 text-sm text-[var(--font-color)] text-opacity-80">
            <li><span className="font-semibold text-[var(--font-color)]">Senin – Sabtu:</span> 05.00 – 23.00 WIB</li>
            <li><span className="font-semibold text-[var(--font-color)]">Minggu & Libur:</span> 08.00 – 18.00 WIB</li>
          </ul>
        </div>

        
        <div className="footer-col">
          <h4 className="font-['Oswald'] text-lg font-medium tracking-wide uppercase text-[var(--aksen)] mb-4">
            Kontak Kami
          </h4>
          <ul className="footer-info space-y-2.5 text-sm text-[var(--font-color)] text-opacity-80">
            <li><strong className="font-semibold text-[var(--font-color)]">Telepon:</strong> +62 822-2658-5215</li>
            <li><strong className="font-semibold text-[var(--font-color)]">Email:</strong> fitArea@gmail.com</li>
            <li><strong className="font-semibold text-[var(--font-color)]">WhatsApp:</strong> 0822-2658-5215</li>
          </ul>
        </div>

        
        <div className="footer-col">
          <h4 className="font-['Oswald'] text-lg font-medium tracking-wide uppercase text-[var(--aksen)] mb-4">
            Alamat GYM
          </h4>
          <p className="text-[var(--font-color)] text-opacity-75 text-sm leading-relaxed">
            Jl. Dr. Mansyur No. 99, Kampus USU, Medan, Sumatera Utara 20155
          </p>
        </div>
      </div>

      
      <div className="footer-bottom bg-[var(--bg)] text-center py-5 text-xs text-[var(--font-sekunder)] border-t border-[var(--line)]">
        <p>&copy; 2026 FitArea GYM.</p>
      </div>
    </footer>
  )
}
