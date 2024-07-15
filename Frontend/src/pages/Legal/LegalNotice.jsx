import React from 'react';

const LegalNotice = () => {
  return (
    <div className="container mx-auto mt-8 w-2/4">
      <h1 className="text-3xl font-semibold mb-4">Aviso Legal</h1>

      {/* <h2 className="text-xl font-semibold mt-4 mb-2">Responsable del sitio web</h2>
      <p>
        Nombre: [Nombre de tu empresa]<br />
        Dirección: [Dirección de tu empresa]<br />
        Correo electrónico: [Correo electrónico de contacto]<br />
        Teléfono: [Número de teléfono de contacto]
      </p> */}

      <h2 className="text-xl font-semibold mt-6 mb-2">Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web están sujetos a las siguientes condiciones. Al acceder y utilizar este sitio web, aceptas estas condiciones sin reservas.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio web, incluyendo textos, imágenes, diseño gráfico, código fuente, logos, marcas y demás elementos, son propiedad de <b>CUMESO S.L.</b> o de terceros que han autorizado su uso. Queda prohibida cualquier forma de reproducción, distribución, comunicación pública, transformación o cualquier otro uso sin la autorización previa y expresa.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Exclusión de garantías y responsabilidad</h2>
      <p>
        Este sitio web se ofrece tal cual, sin garantías de ningún tipo. <b>CUMESO S.L.</b>  no se hace responsable de los daños causados por el uso de este sitio web ni de la falta de disponibilidad o continuidad del funcionamiento del mismo.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Legislación aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Cualquier controversia que surja de la interpretación o ejecución de estas condiciones se resolverá en los tribunales de <b>Oninyent(Valencia)</b>, renunciando las partes a cualquier otro fuero que pudiera corresponderles.
      </p>
    </div>
  );
};

export default LegalNotice;
