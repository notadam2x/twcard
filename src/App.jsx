import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import Privileges from './components/Privileges';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modal from './components/Modal';
import useTelegram from './hooks/useTelegram';

import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  useTelegram(); // Initialize Telegram Web App features
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
