import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CookieConsent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedPreferences = JSON.parse(localStorage.getItem('cookiePreferences'));
    if (!storedPreferences) {
      setModalIsOpen(true);
    } else {
      setPreferences(storedPreferences);
      applyPreferences(storedPreferences);
    }
  }, []);
  const enableAnalyticsCookies = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-XXXXXX-X'); // Reemplaza UA-XXXXXX-X con tu ID de seguimiento de Google Analytics
    setModalIsOpen(false);
  };
  const disableAnalyticsCookies = () => {
    window['ga-disable-UA-XXXXXX-X'] = true; // Reemplaza UA-XXXXXX-X con tu ID de seguimiento de Google Analytics
    setModalIsOpen(false);
  };
  const enableMarketingCookies = () => {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID'); // Reemplaza YOUR_PIXEL_ID con tu ID de Pixel
    fbq('track', 'PageView');
    setModalIsOpen(false);
  };
  const disableMarketingCookies = () => {
    setModalIsOpen(false);
    // Código para deshabilitar Facebook Pixel
    // Facebook Pixel no proporciona una forma directa de deshabilitar, pero puedes prevenir la carga del script basado en la preferencia
  };

  const applyPreferences = (preferences) => {
    if (preferences.analytics) {
      enableAnalyticsCookies();
    } else {
      disableAnalyticsCookies();
    }

    if (preferences.marketing) {
      enableMarketingCookies();
    } else {
      disableMarketingCookies();
    }
  };


  const setCookiePreferences = (preferences) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    applyPreferences(preferences);
  };

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    setCookiePreferences(newPreferences);
    setModalIsOpen(false);
  };

  const handleAcceptNecessary = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    setCookiePreferences(newPreferences);
    setModalIsOpen(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    setCookiePreferences(newPreferences);
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="fixed inset-0 flex items-center justify-start md:justify-normal z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg overflow-hidden shadow-xl max-w-80 md:max-w-lg md:mx-auto ml-5">
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-2 text-gray-600 text-center">Cookies</h2>
          <p className="text-lg mb-4 text-gray-600 mt-8">
            Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el rendimiento y el tráfico en nuestro sitio web.
          </p>
          <div className="flex flex-col gap-2 mt-16 md:flex-row">
            <button
              className="duration-300 bg-white hover:bg-black/25 text-gray-600 font-bold py-2 px-4 rounded"
              onClick={handleAcceptAll}
            >
              Aceptar todas
            </button>
            <button
              className="duration-300 bg-white hover:bg-black/25 text-gray-600 font-bold py-2 px-4 rounded"
              onClick={handleAcceptNecessary}
            >
              Solo necesarias
            </button>
            <button
              className="duration-300 bg-white hover:bg-black/25 text-gray-600 font-bold py-2 px-4 rounded"
              onClick={handleRejectAll}
            >
              No aceptar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CookieConsent;
