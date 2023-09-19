
document.getElementById('yourFormId').addEventListener('submit', function (event) {
    event.preventDefault();

   // Obtén los valores de los campos del formulario
   const title = document.getElementById('title').value;
   const description = document.getElementById('description').value;
   const price = parseFloat(document.getElementById('price').value);
   const thumbnail = document.getElementById('thumbnail').value;
   const code = document.getElementById('code').value;
   const stock = parseInt(document.getElementById('stock').value);

   // Crea un objeto con los datos del producto
   const productData = {
     title: title,
     description: description,
     price: price,
     thumbnail: thumbnail,
     code: code,
     stock: stock
   };
  
   console.log(productData)
  

  fetch("http://localhost:8080/realProducts", {
    method: 'POST',
    body: JSON.stringify(productData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())

  .then(data => {
    if (data.mensaje === 'Producto agregado correctamente') {
      // Si la respuesta del servidor es un éxito, muestra una alerta de éxito con SweetAlert2.
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: data.mensaje,
      });

    } else {
      // Si la respuesta del servidor es un error, muestra una alerta de error con SweetAlert2.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.mensaje,
      });
    }
  });
});