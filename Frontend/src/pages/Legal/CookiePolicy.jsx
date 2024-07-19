import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-semibold mb-6">Política de Cookies</h1>

      <p className="text-lg mb-4">
        Nuestra web utiliza cookies para mejorar la experiencia del usuario, facilitando la navegación personalizada y ofreciendo funciones esenciales. Al continuar navegando en nuestra web, aceptas el uso de cookies de acuerdo con esta política.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">¿Qué son las cookies?</h2>
      <p className="text-lg mb-4">
        Las cookies son pequeños archivos de texto que se almacenan en tu ordenador o dispositivo móvil cuando visitas un sitio web. Las utilizamos para recordar tus preferencias y mejorar tu experiencia de navegación.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Tipos de cookies que utilizamos</h2>
      <ul className="list-disc list-inside text-lg mb-4">
        <li><strong>Cookies estrictamente necesarias:</strong> Garantizan funciones básicas del sitio.</li>
        <li><strong>Cookies de rendimiento:</strong> Mejoran la funcionalidad al recopilar datos anónimos sobre el uso del sitio.</li>
        <li><strong>Cookies de funcionalidad:</strong> Personalizan la experiencia según tus preferencias.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Cómo gestionar las cookies</h2>
      <p className="text-lg mb-4">
        Puedes controlar y gestionar las cookies en tu navegador. Deshabilitar las cookies puede afectar tu experiencia de navegación en nuestro sitio web.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Cambios en la política de cookies</h2>
      <p className="text-lg mb-4">
        Nos reservamos el derecho de actualizar o modificar esta Política de Cookies en cualquier momento para reflejar cambios en la legislación o mejoras en nuestros servicios. Te recomendamos revisar esta página periódicamente para estar informado sobre cómo utilizamos las cookies.
      </p>
    </div>
  );
};

export default CookiePolicy;
