import { useEffect, useState } from "react"

const links = [
  ["hero", "Beranda"], ["program", "Program"], ["trainer", "Trainer"], ["jadwal", "Jadwal"],
  ["membership", "Membership"], ["bmi", "BMI"], ["faq", "FAQ"],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  // Navbar solid saat di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Tandai link aktif sesuai section yang terlihat
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    )
    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} id="navbar" aria-label="Navigasi utama">
      <div className="nav-container">
        <a href="#hero" className="nav-logo">Fit<span>Area</span></a>
        <button
          className={"nav-toggle" + (open ? " open" : "")}
          id="navToggle"
          aria-label="Buka menu"
          aria-expanded={open}
          aria-controls="navMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={"nav-menu" + (open ? " open" : "")} id="navMenu">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id} className={active === id ? "active" : undefined} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
