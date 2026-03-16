import React from 'react';
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import ServicesOverview from '../sections/ServicesOverview';
import FirstVisit from '../sections/FirstVisit';
import Testimonials from '../sections/Testimonials';
import ContactSection from '../sections/ContactSection';

const Home = () => {
  return (
    <>
      <Hero />
      <Philosophy />
      <ServicesOverview />
      <FirstVisit />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default Home;
