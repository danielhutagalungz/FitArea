import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Program from "./components/Program"
import Trainer from "./components/Trainer"
import Jadwal from "./components/Jadwal"
import Membership from "./components/Membership"
import Bmi from "./components/Bmi"
import Join from "./components/Join"
import Faq from "./components/Faq"
import Footer from "./components/Footer"

export default function App() {
  const [paket, setPaket] = useState("") // dipakai bersama: tombol "Pilih paket" -> dropdown form

  return (
    <>
      <Navbar />
      <Hero />
      <Program />
      <Trainer />
      <Jadwal />
      <Membership onPilih={setPaket} />
      <Bmi />
      <Join paket={paket} setPaket={setPaket} />
      <Faq />
      <Footer />
    </>
  )
}
