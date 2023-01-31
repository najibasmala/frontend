import React, { Fragment } from "react";
import Footer from '../components/Footer/Footer';


import Header from '../components/Header/Header'
import HeroSection from '../components/Hero-Section/HeroSection'
import FreeCourse from'../components/Free-course-section/FreeCourse'
import AboutUs from '../components/About-us/AboutUs'
import ChooseUs from '../components/Choose-us/ChooseUs'
import Courses from '../components/Courses-section/Courses'

const Home = ( {CUId}) => {
  return (
    <div><Fragment>
    <Header  />
    <HeroSection />
    <AboutUs />
    <Courses CUId={CUId} />
    <ChooseUs />

    <FreeCourse />

    <Footer />
  </Fragment></div>
  )
}

export default Home