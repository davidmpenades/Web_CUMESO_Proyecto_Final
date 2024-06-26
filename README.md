# PROYECTO FINAL - WEB CUMESO

 Aplicación para la promoción de una empresa de soluciones personalizadas y venta de maquinas industriales enfocadas a soluciones de packaging, en este momento, una máquina rebobinadora. 
 
## Tecnologías Utilizadas

El desarrollo de Web CUMESO se ha apoyado en una combinación de tecnologías avanzadas y eficaces, asegurando una experiencia de usuario sobresaliente y un desarrollo ágil y escalable. A continuación, se detallan las tecnologías empleadas en las diferentes partes de la aplicación:

[![My Skills](https://skillicons.dev/icons?i=react,js,tailwind,html,css,django,py,postgres,docker)](https://skillicons.dev)


### Frontend

- **React**: Hemos utilizado React, aprovechando Context y Hooks, para desarrollar una interfaz de usuario dinámica y reactiva. Esto facilita significativamente la interacción del usuario con la aplicación.
- **TailwindCSS**: Para el diseño y estilización, hemos seleccionado TailwindCSS debido a su amplia flexibilidad y su fuerte enfoque en el diseño responsivo y personalizable.

### Backend

- **Django**: Nuestra elección para el desarrollo del backend ha sido Django, valorando su robustez y su capacidad para crear soluciones personalizadas y seguras.
- **PostgreSQL**: Hemos optado por PostgreSQL como nuestro sistema de gestión de bases de datos, por su fiabilidad y excelente integración con Django.

### Despliegue

- **Docker**: Para facilitar el despliegue y asegurar la coherencia entre los entornos de desarrollo y producción, hemos implementado Docker. Esto simplifica el proceso de despliegue y minimiza los posibles problemas relacionados con diferencias entre entornos.

Cada una de estas tecnologías ha sido seleccionada cuidadosamente para ofrecer la mejor experiencia tanto a los usuarios finales como al equipo de desarrollo, permitiendo así una escalabilidad y mantenimiento eficientes del proyecto.



## INICIO

Comenzamos nuestra visita a inicio, donde podemos observar informacion revelante de la empresa y la maquinaria a promocionar.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/a0c3cca9-7b96-4865-93e5-8336a428f5a5

Desde la página principal podemos accesos a la parte de contactar via email con la empresa y redireccion a registro/login.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/b5f264ed-8b97-48f7-9c73-2a305ed62a10


## CONTACTO

Desde contacto tendremos un formulario para enviar un correo al administrador de la web. Para pedir presupuestros o precio de la máquinaria ofertada.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/15020b92-1c3d-45f7-8dd5-4ebbf0ca3eaf

## CATÁLOGO

Aquí vemos el catálogo de máquinaria ofertada

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/fc6ac302-f2da-4d68-82d0-bef8e87ff995


Esta página es dinámica y se controla desde el panel de administrador. Qué máquina quiere ofertar de las que tiene creadas y subidas.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/34ab0e89-5082-4200-aaf0-ec521283edef

## PERFIL

En el perfil de usuario, se podrá ver la información personal del usuario y descargar el manual de intrucciones de la máquina que haya adquirido. También podra cambiar la foto de perfil

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/3e346c34-378b-47e5-915c-2a3832b3927e

## Panel de Administración

El panel de administración de Web CUMESO ofrece una suite completa de herramientas de gestión que permiten una administración integral de la aplicación. A continuación, se detallan las principales características y funcionalidades disponibles para el administrador:

### Máquinas

- **Gestión del Catálogo**: Permite al administrador crear, modificar y eliminar las máquinas que se muestran en la web. Esta funcionalidad es esencial para mantener actualizada la oferta de productos.
- **Selección de Exhibición**: Facilita la selección de máquinas específicas para ser destacadas en la página de catálogo.

### Piezas

- **Administración de Piezas**: Gestiona las piezas individuales de cada máquina, permitiendo una organización detallada del inventario de componentes.
- **Asignación**: Posibilita la asignación de piezas específicas a máquinas o a proveedores, lo que ayuda en la logística y en la gestión de inventarios.
- **Gestión del Estado**: Supervisa el estado de cada pieza, lo cual es crucial para el control de calidad y la planificación de la producción.

### Proveedores

- **Gestión de Proveedores**: Permite crear, modificar y eliminar registros de proveedores, asegurando que la base de datos de proveedores esté siempre actualizada.
- **Visualización de Asociaciones**: Ofrece una vista clara de las piezas asociadas a cada proveedor y el estado de estas, facilitando la gestión de las relaciones con proveedores.

### Usuarios

- **Visualización y Gestión**: Permite al administrador ver todos los usuarios registrados en la plataforma, proporcionando una herramienta poderosa para la gestión de la comunidad.
- **Asignación de Máquinas y Borrado**: Ofrece opciones para asignar máquinas específicas a usuarios y, si es necesario, borrar usuarios de la base de datos.

Este panel está diseñado para ser intuitivo y fácil de usar, asegurando que la administración del sitio sea lo más eficiente y efectiva posible.

### Máquinas

Cuando el administrador se loguea, entra directamente al panel de administrador, donde la página principal es la de las máquinas, aqui puede ver la información que se renderizará en el catálogo. Podrá crear una máquina nueva, modificar una ya existente, borrar y decidir que máquina se muestra en la web.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/d22dfa2b-8cde-4c94-8f37-69eef9266623

### Piezas

Al igual que en el apartado anterior, en esta página del panel de administrador, se puede observar. Los datos que cada pieza, también podremos asignar esa pieza a una máquina o a un proveedor. Dependiendo de su estado, la fila se mostrará de un color para identificar las piezas que aun necesitan supervisión a 
la hora de fabricar una máquina. Tendremos como en el anterior punto la opcion de crear una nueva, modificar y borrar. En el formulario de modificar esta pensado para que la imagen sea el plano de la máquina que se verá de gran tamaño para verificar que se quiere hacer una modificación de esa pieza. Hemos añadido un search por nombre o por estado, y una paginación.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/7440c3ae-cd4f-4f6c-8221-0c808c77105c

### Proveedores

Aquí en el apartado de proveedores podremos ver la información de los proveedores dados de alta en nuestra aplicación. También podremos crear nuevos, modificar los ya creados, borrarlos y ver que piezas estan asociadas a ese proveedor y en que estado se encuentra. Tambien hemos añadido un search por cualquier campo y una paginación.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/809d9a1e-5081-4fbf-84c5-edad37444109

### Usuarios

En el apartado de los usuarios, podemos observar todos los usuarios que hay registrados. Podemos borrarlos y asignarles a una máquina.

https://github.com/davidmpenades/Web_CUMESO_Proyecto_Final/assets/118437119/268f7b26-ceb5-43d3-ba56-5f85e2e4a09b

