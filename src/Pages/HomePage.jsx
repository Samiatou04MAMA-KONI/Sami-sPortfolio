import React from 'react';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero a déjà id="home" */}
      <Hero />
      
      {/* About doit avoir id="about" */}
      <section id="about">
        <About />
      </section>
      
      {/* Contact doit avoir id="contact" */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default HomePage;