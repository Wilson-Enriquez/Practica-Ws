  // Seleccionamos el botón por su ID
  let pingButton = document.querySelector("#pingButton");

  // Escuchamos el evento de clic y llamamos a la función
  pingButton.addEventListener("click", getPingFromWebService);

  // Función para hacer la solicitud al servidor
  function getPingFromWebService() {
    const url = 'http://localhost:8080/pins';
    
    // Encadenar los datos de la URL con la respuesta
    fetch(url)
      .then((response) => response.text()) // Convertir la respuesta a texto
      .then((data) => {
        console.log(data);
        // Actualizar el valor del input con ID "messageInput"
        let messageInput = document.querySelector("#messageInput");
        messageInput.value = data;
      })
      .catch((error) => {
        console.error("Error al obtener el ping:", error);
        // Mostrar el error en un elemento HTML con ID "errorDisplay"
        let errorDisplay = document.querySelector("#errorDisplay");
        if (errorDisplay) {
          errorDisplay.innerHTML = "Error al obtener el ping: " + error.message;
        }
      });
  }