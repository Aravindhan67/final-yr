import React from 'react';
import Hero       from '../../components/home/Hero';
import Statistics from '../../components/home/Statistics';
import Features   from '../../components/home/Features';
import HowItWorks from '../../components/home/HowItWorks';
import CTA        from '../../components/home/CTA';

/**
 * Home — CyberShield AI landing page.
 * Sections (in order):
 *   Hero → Statistics → Features → How It Works → CTA
 */
const Home = () => (
  <div>
    <Hero />
    <Statistics />
    <Features />
    <HowItWorks />
    <CTA />
  </div>
);

export default Home;
