
// obtengo todos los datos del usuario en el momento de hacer el Login
let usuario_logeado = null;
let id_tema_actual = null;

let tema = null;
let id_tema = null;

function fLogin(){
  fMostrar("form_login");
}
function fMensaje(){
  fMostrar("form_añadir_mensaje");
}
function fNuevoTema(){
  fMostrar("form_añadir_tema");
}
function fCerrarEvento(){
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
  document.querySelector("#div_error").innerHTML = "";
  document.querySelector("#rdiv_error").innerHTML = "";
  document.querySelector("#div_error_mensaje").innerHTML = "";
}

function fControlLogin(){
  // Leer el alias
  let alias = document.querySelector("#alias").value;
   // Comprobando que el alias no este vacio
  if (alias == ""){
    document.querySelector("#div_error").innerHTML = "Escriba su Alias";
    return;
  }
  // Leer el password
  let password = document.querySelector("#password").value;
   // Comprobando que el password no este vacio
  if (password == ""){
    document.querySelector("#div_error").innerHTML = "Escriba la Contraseña";
    return;
  }
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
              document.querySelector("#div_error").innerHTML = "Usuario no registrado";
              return;
          }
          usuario_logeado = data.datos[0];
          
          document.querySelector(".foto_usuario_logeado").innerHTML =`<img src="assets/fotos/${usuario_logeado.usu_foto}" title="${usuario_logeado.usu_alias}">`;
          console.log("usuario logeado: ",usuario_logeado)
          //  El login es correcto
          document.querySelector("#div_modal").style.display = "none"; 
          login_correcto = true;               
      })
      .finally( function(){
          // fCancelar();
          fCargarTemas()
          fMensajeTema(id_tema,tema)

      })
}


function fControlRegistrar(){
  // Leer el nombre
  let nombre = document.querySelector("#rnombre").value;
  if (nombre == ""){
    document.querySelector("#rdiv_error").innerHTML = "Escriba su Nombre";
    return;
  }
  // Leer el alias
  let alias = document.querySelector("#ralias").value;
  if (alias == ""){
    document.querySelector("#rdiv_error").innerHTML = "Escriba su Alias";
    return;
  }
  // Leer el foto
  let foto = document.querySelector("#rfoto").value;
  if (foto == ""){
    document.querySelector("#rdiv_error").innerHTML = "Escriba una Foto";
    return;
  }
  // Leer el password
  let password = document.querySelector("#rpassword").value;
  let password2 = document.querySelector("#rrpassword").value;
  if (password == ""){
    document.querySelector("#rdiv_error").innerHTML = "Escriba su Contraseña";
    return;
  }
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


function fNuevoMensaje(){
  // Leer el Mensaje
  let mensaje = document.querySelector("#rmensaje").value;
   // Comprobando que el mensaje no este vacio
  if (mensaje == ""){
    document.querySelector("#div_error_mensaje").innerHTML = "Escriba un mensaje";
    return;
  }
  // Leer el fecha y hora 
  // Obtener el elemento del input de fecha y hora
var fechaYHoraInput = new Date().toISOString().slice(0, 19).replace("T", " ");  // Obtener la fecha y hora actuales

  // Leer el id del usuario 
  let usu_id = usuario_logeado.usu_id
  let tema_id = id_tema_actual;
  // Buscar el alias y el password en la BBDD
  let URL = 'assets/php/servidor.php?peticion=NuevoMensaje';
  URL += "&mensaje=" + mensaje;
  URL += "&fechaYHoraInput=" + fechaYHoraInput;
  URL += "&usu_id=" + usu_id;
  URL += "&tema_id=" + tema_id;

  fetch(URL)
      .then((response) => response.json())
      .then((data) => {
          console.log("REGISTRO",data);  
          if (data.datos == 0){
              document.querySelector("#rdiv_error").innerHTML = "Inténtelo más tarde";
              return;
          }
          
          // Mostrar un mensaje
          document.querySelector("#mensaje").innerHTML = "Mensaje añadido correctamente";
          fMostrar("form_mensaje"); 
          // Pasado x tiempo, mostrar el formulario de login
          evento = setTimeout(fCancelar, 2000);
          
            
      })
      .finally( function(){

        fCargarTemas();
        fMensajeTema(id_tema,tema);
    
    })
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
        html += `<h2 id="titulo_nav">Nuevo tema <br> <i id="bombilla" class="fas fa-lightbulb" onclick="fNuevoTema()" title="Crea un nuevo tema"></i></h2>`;
      }else{
        // Si se logea un usuario normal 
        html += `<h2 id="titulo_nav">Temas</h2>`;
      }
      for (i = 0; i < data.datos.length; i++) {
        tema = data.datos[i].tema_tema;
        id_tema = data.datos[i].tema_id;
        let cont = data.datos[i].contador;

      if(usuario_logeado == null ){
          // Si el usuario no se ha logeado
          html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div></div>`;
      } 
      if(usuario_logeado!= null && usuario_logeado.usu_admin==1){
        // Si se logea un administrador  
        html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div><div class="menos" title="Eliminar tema"><i class="fas fa-trash" onclick="fEliminarUnTema(${id_tema})"></i></div></div>`;
      }
      if(usuario_logeado!= null && usuario_logeado.usu_admin==0){
        // Si se logea un usuario normal
        html += `<div class="contenedor_temas" onclick="fMensajeTema(${id_tema},'${tema}')"><div class="tema">${tema}</div><div class="contador">(${cont})</div></div>`;
      }
      }
      document.querySelector("nav").innerHTML = html;
    })
}
function fMensajeTema(id_tema,tema) {
  const URL = 'assets/php/servidor.php?peticion=MensajeTema&id_tema=' + id_tema;
  id_tema_actual =id_tema;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let html = "";
      if(usuario_logeado == null ){
        // Si el usuario no se ha logeado
        html += `<div class="titulo_mensaje">${tema}</div>`      
      } 
      if(usuario_logeado!= null && (usuario_logeado.usu_admin==1 || usuario_logeado.usu_admin==0)){ 
        // Si se logea un administrador  
        html += `<div class="titulo_mensaje">${tema}&nbsp  <i  onclick="fMensaje()" id="añadir_mensaje" title="Añade un nuevo mensaje" class="fas fa-plus"></i></div>`      
      }
      

      //                ---------- DIVS DE LOS MENSAJES ----------
      if(usuario_logeado!= null && usuario_logeado.usu_admin==0 ){
        // Si se logea un usuario  
        for (i = 0; i < data.datos.length; i++) {
          let foto = data.datos[i].foto;
          let mensaje = data.datos[i].men_mensaje;
          let fecha_hora = data.datos[i].men_fecha_hora;
          let nombre = data.datos[i].usu_nombre;
          id_tema = data.datos[i].men_tema_id; 
          let men_usu_id = data.datos[i].men_usu_id; 
          let id_mensaje = data.datos[i].men_id; 

          html += `<div class="gran_contenedor_mensaje">`
          html += `<div class="cont_foto"><img src="assets/fotos/${foto}" class="foto_usuario" title="${nombre}"></div>`
          html += `<div class="mensaje">${mensaje}</div>`
          html += `<div class="fecha_hora">${fecha_hora}</div>`
          if(men_usu_id == usuario_logeado.usu_id){
              html += `<div class="text_eliminar_mensaje" title="Eliminar" onclick="fEliminarUnMensaje(${data.datos[i].men_id})">x</div>`
          }
          html += `<div class="div_like"><i class="fas fa-thumbs-up" onclick="fLike(${data.datos[i].men_id})"></i></div>`
          html += `<div class="div_dislike"><i class="fas fa-thumbs-up fa-rotate-180" onclick="fDislike(${data.datos[i].men_id})"></i></div>`
          html += `<div class="div_num_votos"><div id="mensaje${id_mensaje}">0</div></div>`
          html += `</div>`
          fCargarVotos(id_mensaje);
      }
      

    }
      if(usuario_logeado!= null && usuario_logeado.usu_admin==1 ){ 
        // Si se logea un administrador  
        for (i = 0; i < data.datos.length; i++) {
          let foto = data.datos[i].foto;
          let mensaje = data.datos[i].men_mensaje;
          let fecha_hora = data.datos[i].men_fecha_hora;
          let nombre = data.datos[i].usu_nombre;
          id_tema = data.datos[i].men_tema_id; 
          
          let id_mensaje = data.datos[i].men_id; 

          html += `<div class="gran_contenedor_mensaje">`;
          html += `<div class="cont_foto"><img src="assets/fotos/${foto}" class="foto_usuario" title="${nombre}"></div>`;
          html += `<div class="mensaje">${mensaje}</div>`;
          html += `<div class="fecha_hora">${fecha_hora}</div>`;
          html += `<div class="text_eliminar_mensaje" title="Eliminar" onclick="fEliminarUnMensaje(${data.datos[i].men_id})">x</div>`;
          html += `<div class="div_like"><i class="fas fa-thumbs-up" onclick="fLike(${data.datos[i].men_id})"></i></div>`;
          html += `<div class="div_dislike"><i class="fas fa-thumbs-up fa-rotate-180" onclick="fDislike(${data.datos[i].men_id})"></i></div>`;
          html += `<div class="div_num_votos"><div id="mensaje${id_mensaje}">0</div></div>`;
          html += `</div>`;
          fCargarVotos(id_mensaje);
        }      
      }
      if(usuario_logeado== null){
        for (i = 0; i < data.datos.length; i++) {
        let foto = data.datos[i].foto;
        let mensaje = data.datos[i].men_mensaje;
        let fecha_hora = data.datos[i].men_fecha_hora;
        let nombre = data.datos[i].usu_nombre;
        id_tema = data.datos[i].men_tema_id; 

        let id_mensaje = data.datos[i].men_id;     

        html += `<div class="gran_contenedor_mensaje">`
        html += `<div class="cont_foto"><img src="assets/fotos/${foto}" class="foto_usuario" title="${nombre}"></div>`
        html += `<div class="mensaje">${mensaje}</div>`
        html += `<div class="fecha_hora">${fecha_hora}</div>`
        html += `<div class="div_like"><i class="fas fa-thumbs-up"></i></div>`
        html += `<div class="div_dislike"><i class="fas fa-thumbs-up fa-rotate-180"></i></div>`
        html += `<div class="div_num_votos"><div id="mensaje${id_mensaje}"></div></div>`
        
        html += `</div>`
        fCargarVotos(id_mensaje);
      }
      }
      
      console.log("ID del tema actual: ",id_tema_actual)
      document.querySelector("section").innerHTML = html;
    })
}

function fLike(men_id){
  
    let URL = 'assets/php/servidor.php?peticion=like';
    URL += "&men_id=" + men_id;
  
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Like añadido: ",data)
        
    })
      .finally( function(){
      document.querySelector(".div_like").style.color="#27920c";  
      fCancelar();
      fCargarTemas();
      fMensajeTema(id_tema,tema);
      

  })
}
function fDislike(men_id){

  let URL = 'assets/php/servidor.php?peticion=dislike';
  URL += "&men_id=" + men_id;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Dislike añadido: ",data)
      
  })
    .finally( function(){
    document.querySelector(".div_dislike").style.color="red";  
    fCancelar();
    fCargarTemas();
    fMensajeTema(id_tema,tema);
    

})
}
function fCargarVotos(id_mensaje){
    // Pedir los temas a la base de datos
    const URL = 'assets/php/servidor.php?peticion=Cargar_Votos&id_mensaje='+id_mensaje;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("CargarVotos: ",data)
        let html ="";
        if(data.datos.length == 0){
          html = "0";
          document.querySelector(`#mensaje${id_mensaje}`).innerHTML = html;
          console.log("Array vacio")
        }else{
        let positivos = data.datos[0].votos_positivos;
        let negativos = data.datos[0].votos_negativos;
        let total = data.datos[0].total;
        html = total;
        document.querySelector(`#mensaje${id_mensaje}`).innerHTML = html;
        }
        
      })
}
function fEliminarUnMensaje(id_mensaje){
  // Pedir los temas a la base de datos
const URL = 'assets/php/servidor.php?peticion=eliminar_un_mensaje&id_mensaje=' + id_mensaje;
fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // let html ="";
   
    // document.querySelector("nav").innerHTML = html;
  })
  .finally( function(){
    // fCancelar();
    fCargarTemas();
    fMensajeTema(id_tema,tema);

})
}

function fEliminarUnTema(id_tema){
  // Pedir los temas a la base de datos
const URL = 'assets/php/servidor.php?peticion=eliminar_un_tema&id_tema=' + id_tema;
fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    console.log("Tema eliminado: ",data)
    // let html ="";
   
    // document.querySelector("nav").innerHTML = html;
  })
  .finally( function(){
    // fCancelar();
    fCargarTemas();
    fMensajeTema(id_tema,tema);

})
}



function fAñadirTema(){
    // Leer el nombre del Mensaje
    let nombre_mensaje = document.querySelector("#rnombreTema").value;
  
    let URL = 'assets/php/servidor.php?peticion=crear_un_tema';
  
    URL += "&nombre_mensaje=" + nombre_mensaje;
  
  
  
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        
    })
      .finally( function(){
      fCancelar();
      fCargarTemas();
      fMensajeTema(id_tema,tema);

  })
}









// Flecha de scroll
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

 



















