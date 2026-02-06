import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import Privileges from './components/Privileges';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <TrustSection />
      <Privileges />
      <FAQ />
      <CTA onOpenModal={openModal} />
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
