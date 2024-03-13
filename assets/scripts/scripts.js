
function fLogin(){
  fMostrar("form_login");
}

function fMostrar(formulario){
  // Ocultar todos los formularios
  let todos = document.querySelectorAll("#div_modal > form");
  console.log("Todos", todos);
  for(i=0; i<todos.length; i++){
      todos[i].style.display = "none";
  }
  // Mostrar el formulario que me piden
  document.querySelector("#" + formulario).style.display = 'block';
  // Mostrar la modal
  document.querySelector("#div_modal").style.display = "flex";
}

function fCancelar(){
  document.querySelector("#div_modal").style.display = "none";
}

function fControlLogin(){
  // Leer el alias
  let alias = document.querySelector("#alias").value;
  // Leer el password
  let password = document.querySelector("#password").value;
  // Buscar el alias y el password en la BBDD
  let login_correcto = false;
  let URL = 'assets/php/servidor.php?peticion=ControlLogin';
  URL += "&alias=" + alias;
  URL += "&password=" + password;
  fetch(URL)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);

          // Si es correcto
          if (data.datos.length == 0){
              document.querySelector("#div_error").innerHTML = "Acceso denegado";
              return;
          }  
          //  El login es correcto
          document.querySelector("#div_modal").style.display = "none"; 
          login_correcto = true;               
      })
      .finally( function(){
          if (login_correcto == true){
              fCargarSecciones();
          }
      })
}
function fControlRegistrar(){
  // Leer el alias
  let alias = document.querySelector("#ralias").value;
  // Leer el nombre
  let nombre = document.querySelector("#rnombre").value;
  // Leer el foto
  let foto = document.querySelector("#rfoto").value;
  // Leer el password
  let password = document.querySelector("#rpassword").value;
  let password2 = document.querySelector("#rrpassword").value;
  // Comprobar los password
  if (password != password2){
      document.querySelector("#rdiv_error").innerHTML = "Los password no coinciden";
      return;
  }
  // Buscar el alias y el password en la BBDD
  let URL = 'assets/php/servidor.php?peticion=ControlRegistro';
  URL += "&alias=" + alias;
  URL += "&password=" + password;
  URL += "&nombre=" + nombre;
  URL += "&foto=" + foto;
  fetch(URL)
      .then((response) => response.json())
      .then((data) => {
          console.log("REGISTRO",data);  
          if (data.datos == 0){
              document.querySelector("#rdiv_error").innerHTML = "Inténtelo más tarde";
              return;
          }
          // Mostrar un mensaje
          document.querySelector("#mensaje").innerHTML = "Registro correcto";
          fMostrar("form_mensaje"); 
          // Pasado x tiempo, mostrar el formulario de login
          evento = setTimeout(fCerrarEvento, 2000);

            
      })
}
function fCerrarEvento(){
  fMostrar("form_login"); 
}















function fCargarTemas() {
  // Pedir los temas a la base de datos
  const URL = 'assets/php/servidor.php?peticion=cargar_temas'
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      let html = `<h2 id="titulo_nav">Nuevo tema <svg id="bombilla" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#e5e811" d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"/></svg></h2>`;

      for (i = 0; i < data.datos.length; i++) {
        tema = data.datos[i].tema_tema;
        let id_tema = data.datos[i].tema_id;
        let cont = data.datos[i].contador;
        html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div><div class="menos" title="Eliminar tema"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#e50606" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></div></div>`;

      }

      document.querySelector("nav").innerHTML = html;
    })
}
function fMensajeTema(mensaje_id,tema) {
  const URL = 'assets/php/servidor.php?peticion=MensajeTema&mensaje_id=' + mensaje_id;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let html = "";
      html += `<div class="titulo_mensaje">${tema}</div>`
      for (i = 0; i < data.datos.length; i++) {
        let foto = data.datos[i].foto;
        let mensaje = data.datos[i].men_mensaje;
        let fecha_hora = data.datos[i].men_fecha_hora;
        let nombre = data.datos[i].usu_nombre;


        html += `<div class="gran_contenedor_mensaje">`
        html += `<div class="cont_foto"><img src="assets/fotos/${foto}" class="foto_usuario" title="${nombre}"></div>`
        html += `<div class="mensaje">${mensaje}</div>`
        html += `<div class="fecha_hora">${fecha_hora}</div>`
        html += `</div>`
      }
      document.querySelector("section").innerHTML = html;
    })
}






































function fCargarcategorias() {
  let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //recorrer lista
      let html = "";
      for (i = 0; i < data.datos.length; i++) {
        let nombre = data.datos[i].cat_nombre;
        let id = data.datos[i].cat_id;
        let contador = data.datos[i].contador;
        html += `<div onclick="fFotosCategorias(${id})">${nombre} (${contador})</div>`;
      }
      document.querySelector("nav").innerHTML = html;
    })
}

function fFotosCategorias(foto_id) {
  // Buscar las personas que tienen un hobbie
  const URL = 'assets/php/servidor.php?peticion=FotoCategoria&foto_id=' + foto_id;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // Imprimir los datos solicitados en la consola
      console.log(data);
      // Mostrarlos en el section
      let html = "";
      for (i = 0; i < data.datos.length; i++) {
        let foto = data.datos[i].foto_foto;
        html += `<div class="cont_foto"><img src="assets/Fotos/${foto}" class="foto_animal"></div>`
      }
      document.querySelector("section").innerHTML = html;
    })
}

document.addEventListener('DOMContentLoaded', function () {
  var botonScroll = document.getElementById('boton-scroll');

  // Agrega un evento de desplazamiento
  window.addEventListener('scroll', function () {
    // Verifica si el usuario ha desplazado hacia abajo más allá de una cierta cantidad
    if (window.scrollY > 100) { // Puedes ajustar este valor según tus necesidades
      botonScroll.classList.remove('hide'); // Muestra la imagen
    } else {
      botonScroll.classList.add('hide'); // Oculta la imagen
    }
  });

  // Agrega un evento de clic al botón
  botonScroll.addEventListener('click', function () {
    // Desplaza la página al inicio
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  });
});





















