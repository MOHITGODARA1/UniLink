import Navbar from "../../components/Layout/navbar"
import HeroSection from "./components.landing/HeroSection"
import Feature from "./components.landing/Features"
import Sponsor from "./components.landing/Sponser"
import AboutUs from "./components.landing/aboutus"
import Connect from "./components.landing/Connect"
import Footer from "../../components/Layout/footer"
function LandingPage(){
  return(
    <>
      <Navbar />
      <HeroSection />
      <Feature />
      <Sponsor />
      <AboutUs />
      <Connect />
      <Footer />
    </>
  )
}
export default LandingPage