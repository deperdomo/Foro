
// obtengo todos los datos del usuario en el momento de hacer el Login
let usuario_logeado = null;

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
          usuario_logeado = data.datos[0];
          console.log(usuario_logeado)
          //  El login es correcto
          document.querySelector("#div_modal").style.display = "none"; 
          login_correcto = true;               
      })
      .finally( function(){
          // if (login_correcto == true){

          //   for (i = 0; i < data.datos.length; i++) { 
          //      id_admin = data.datos[i].usu_admin;
          //   }

          //   document.querySelector("#añadir_mensaje").style.display = "flex"
          //   document.querySelector(".titulo_mensaje").style.cursor = "pointer"

          //   document.querySelector("#bombilla").style.display = "block"
          //   document.querySelector("#añadir_mensaje").style.display = "block"
          //   document.querySelector(".menos").style.display = "block"
          //   document.querySelectorAll(".menos").style.display = "flex"

          // }
          fCancelar();
          fCargarTemas()

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
      let html ="";
      if(usuario_logeado!= null && usuario_logeado.usu_admin==1){
        // Si se logea un administrador  
        html += `<h2 id="titulo_nav">Nuevo tema <br> <i id="bombilla" class="fas fa-lightbulb"></i></h2>`;
      }else{
        // Si se logea un usuario normal 
        html += `<h2 id="titulo_nav">Temas</h2>`;
      }
      for (i = 0; i < data.datos.length; i++) {
        tema = data.datos[i].tema_tema;
        let id_tema = data.datos[i].tema_id;
        let cont = data.datos[i].contador;

      if(usuario_logeado == null ){
          // Si se logea un usuario normal
          html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div></div>`;
      } 
      if(usuario_logeado!= null && usuario_logeado.usu_admin==1){
        // Si se logea un administrador  
        html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div><div class="menos" title="Eliminar tema"><i class="fas fa-trash"></i></div></div>`;
      }
      if(usuario_logeado!= null && usuario_logeado.usu_admin==0){
        // Si se logea un usuario normal
        html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div></div>`;
      }
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
      html += `<div class="titulo_mensaje">${tema}  <i id="añadir_mensaje" title="Añade un nuevo mensaje" class="fas fa-plus"></i></div>`
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





















