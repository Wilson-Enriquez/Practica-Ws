  // Seleccionamos el botón por su ID
  let pingButton = document.querySelector("#pingButton");

  // Escuchamos el evento de clic y llamamos a la función
  pingButton.addEventListener("click", getPingFromWebService);

  // Función para hacer la solicitud al servidor
  function getPingFromWebService(){
    const url = 'http://localhost:8080/pin'
    //Encadenar los datos de la url con la respuesta 
    fetch (url).then((response) => {
      console.log(response)
    })
  }