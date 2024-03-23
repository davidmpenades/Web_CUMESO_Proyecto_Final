// public/service-worker.js
self.addEventListener('fetch', (event) => {
    // Aquí puedes incluir cualquier lógica específica para manejar las solicitudes de red
    // Por ejemplo, forzar la recarga de imágenes .webp
    if (event.request.url.endsWith('.webp')) {
      event.respondWith(
        fetch(event.request, {
          cache: 'reload', // Forzar la recarga de estas solicitudes
        })
      );
    }
  });
  