document.getElementById('captureBtn').addEventListener('click', async () => {
  try {
    // Solicitar captura de pantalla completa
    const stream = await navigator.mediaDevices.getDisplayMedia({ 
      video: { 
        mediaSource: 'screen' 
      } 
    });
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();

    // Dibujar el frame capturado en un canvas
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

    // Especificar la porción de la pantalla a capturar(1920 x 1080)
    const x = 500; // Coordenada X del punto superior izquierdo Izquierda
    const y = 200; // Coordenada Y del punto superior izquierdo Arriba
    const width = 1420; // Ancho de la porción
    const height = 880; // Altura de la porción

    // Obtener la porción de la imagen
    const imageData = context.getImageData(x, y, width, height);
    
    // Crear un nuevo canvas para la porción
    const portionCanvas = document.createElement('canvas');
    portionCanvas.width = width;
    portionCanvas.height = height;
    const portionContext = portionCanvas.getContext('2d');
    portionContext.putImageData(imageData, 0, 0);

    // Esperar un corto período de tiempo para asegurar que el documento esté enfocado
    setTimeout(async () => {
      // Convertir la porción del canvas a Blob y copiar al portapapeles
      portionCanvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          console.log('Captura copiada al portapapeles');
        } catch (err) {
          console.error('Error al copiar al portapapeles: ', err);
        }
      });
    }, 100); // Esperar 100 ms

    // Detener la transmisión de video
    track.stop();
  } catch (err) {
    console.error('Error al capturar la pantalla: ', err);
  }
});