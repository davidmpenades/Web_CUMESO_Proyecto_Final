import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Política de Cookies</h1>

      <p>
        Nuestra web utiliza cookies para mejorar la experiencia del usuario. Al continuar navegando en nuestra web, aceptas el uso de cookies de acuerdo con esta política.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu ordenador o dispositivo móvil cuando visitas un sitio web. Las utilizamos para recordar tus preferencias y mejorar tu experiencia de navegación.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Tipos de cookies que utilizamos</h2>
      <ul className="list-disc list-inside">
        <li>Cookies estrictamente necesarias: Necesarias para el funcionamiento básico de la web.</li>
        <li>Cookies de rendimiento: Nos ayudan a mejorar la funcionalidad de nuestra web recopilando información anónima sobre cómo la utilizas.</li>
        <li>Cookies de funcionalidad: Nos permiten recordar tus preferencias y personalizar tu experiencia.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Cómo gestionar las cookies</h2>
      <p>
        Puedes controlar y gestionar las cookies en tu navegador. Ten en cuenta que deshabilitar las cookies puede afectar tu experiencia de navegación en nuestra web.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Cambios en la política de cookies</h2>
      <p>
        Nos reservamos el derecho de actualizar o modificar esta Política de Cookies en cualquier momento. Te recomendamos revisar esta página periódicamente para estar informado sobre cómo utilizamos las cookies.
      </p>
    </div>
  );
};

export default CookiePolicy;
