import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Tools from '../component/Tools'
import Testimonial from '../component/testimonial'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tools />
      <Testimonial />
    </div>
  )
}

export default Home