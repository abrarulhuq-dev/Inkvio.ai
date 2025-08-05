import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Tools from '../component/Tools'
import Testimonial from '../component/Testimonial'
import Plans from '../component/Plans'
import Footer from '../component/Footer'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tools />
      <Testimonial/>
      <Plans />
      <Footer/>
    </div>
  )
}

export default Home