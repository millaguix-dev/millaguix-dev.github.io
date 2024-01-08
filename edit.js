let vidaJugador=3;
let vidaEnemigo=3;
let mokeponEnemigo;
const mensajes = {
  0: "Has Perdido.",
  1: "Has Ganado."
}

function aleatorio(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

document.addEventListener('DOMContentLoaded', function() {
  let mokeponEnemigo;
    const seccionCombate = document.getElementById("combate");
    seccionCombate.style.display="none";
    const tarjetas = document.querySelectorAll('.tarjeta');
    const botonSeleccionar = document.getElementById('selec-mokepon');
    const botonesAtaque = document.getElementsByName("ataque")
    const botonReinicio = document.getElementById("reinicio")


    tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener('click', () => {
        // Remover la clase 'seleccionado' de todas las tarjetas
        tarjetas.forEach(t => t.classList.remove('seleccionado'));
        
        // Agregar la clase 'seleccionado' a la tarjeta clicada
        tarjeta.classList.add('seleccionado');
      });
  
      tarjeta.addEventListener('mouseenter', () => {
        tarjeta.classList.add('hover');
      });
  
      tarjeta.addEventListener('mouseleave', () => {
        tarjeta.classList.remove('hover');
      });
    });
    
    botonSeleccionar.addEventListener('click', () => {
      
      const tarjetaSeleccionada = document.querySelector('.seleccionado');
      seccionCombate.style.display="flex"
      if (tarjetaSeleccionada) {
        const nombreMokepon = tarjetaSeleccionada.querySelector('h3').textContent;
        const elementos = tarjetaSeleccionada.dataset.elemento.split(' ');
        mokeponEnemigo=seleccionarMokeponEnemigo()        
        // Ocultar todas las tarjetas
        tarjetas.forEach(tarjeta => {
          tarjeta.style.display = 'none';
        });
        document.getElementById('seleccion-mokepon').style.display='none';
        
    // Mostrar solo las tarjetas seleccionadas (jugador y enemigo)
    document.getElementById('mokeponAliado').prepend(tarjetaSeleccionada)
    tarjetaSeleccionada.style.display = 'block';
    tarjetaSeleccionada.style.border = '2px solid black'
    HabilitarAtaque()
    asignarVidas("Aliado",vidaJugador);
    // Crear una nueva tarjeta para el mokepon enemigo y mostrarla
    tarjetaEnemigo(mokeponEnemigo)
    asignarVidas("Enemigo",vidaEnemigo);
    botonReinicio.addEventListener("click", () => {
      this.location.reload();
    });
      } else {
        alert('Por favor, selecciona un Mokepon antes de continuar.');
      }
    });

    botonesAtaque.forEach(boton => {
      boton.addEventListener("click", () => {
        let elemento= boton.dataset.elemento;
        let elementoEnemigo = obtenerAtaqueEnemigo(mokeponEnemigo)
        combate(elemento,elementoEnemigo);
      })
    })

  });

  function seleccionarMokeponEnemigo() {
    const tarjetas = document.querySelectorAll('.tarjeta');
    // Genera un número aleatorio entre 1 y 6
    let random = aleatorio(1, 6);
    // Obtiene el valor del mokepon en la posición aleatoria del array 'tarjeta'
    let seleccionEnemigo = tarjetas[random-1].querySelector('h3').textContent
    let elementos= tarjetas[random-1].dataset.elemento.split(' ');
    let mokeponEnemigo ={
      nombre: seleccionEnemigo,
      elemento:elementos
    }
    return mokeponEnemigo
}


function tarjetaEnemigo(mokepon){
  const tarjetaEnemigo = document.createElement('div');
    tarjetaEnemigo.classList.add('tarjeta', 'enemigo');
    tarjetaEnemigo.innerHTML = `
      <div class="frontal">
        <img src="./img/${mokepon.nombre}200x300.png">
        <h3>${mokepon.nombre}</h3>
      </div>
      <div class="trasero">
        <h3>${mokepon.nombre}</h3>
        <p>Elemento: ${mokepon.elemento.join(' ')}</p>
      </div>
    `;
    document.getElementById('mokeponEnemigo').prepend(tarjetaEnemigo);
}

function HabilitarAtaque(){
  const mokepon = document.querySelector('.seleccionado')
  let botones = document.getElementsByName("ataque");
  botones.forEach(boton => {
    const elementos = mokepon.dataset.elemento.split(" ");
    const elementoBoton = boton.dataset.elemento

    const coincide = elementos.some(elemento => {
      let resultado = elementoBoton.includes(elemento)
      return resultado;
    })
    
    boton.style.display ="none"
    if(coincide){
      boton.style.display ="block";
    }
    
  })
}

function asignarVidas(personaje, vidaPersonaje) {
  const containerVidas = document.querySelector("#vidas" + personaje);
  const corazon = "💓";
  const calavera = "💀";

  // Limpiar el contenedor antes de agregar vidas
  containerVidas.innerHTML = '';

  // Crear un array de corazones y calaveras
  const vidas = new Array(3).fill(calavera);
  for (let i = 0; i < vidaPersonaje; i++) {
    vidas[i] = corazon;
  }

  vidas.forEach((vida) => {
    const span = document.createElement('span');
    span.textContent = vida;
    containerVidas.appendChild(span);
  });
}

function obtenerAtaqueEnemigo(mokepon){
  elementos= mokepon.elemento
  let random= aleatorio(0 , elementos.length-1)
  return elementos[random]
}

function combate(mokeponAliado,mokeponEnemigo){
  if(mokeponAliado==mokeponEnemigo){
    let mensaje = crearMensaje(mokeponAliado + " vs " + mokeponEnemigo +" ");
    asignarMensaje(mensaje,"contenedor")
    let random= aleatorio(0,1)
    if(random==0){
      vidaEnemigo--;
    asignarVidas("Enemigo",vidaEnemigo)
    let mensaje = crearMensaje("El Mokepon enemigo resultó herido.");
    asignarMensaje(mensaje, "contenedor");
    }
    else{
      vidaJugador -= 1;
      asignarVidas("Aliado",vidaJugador)
      let mensaje = crearMensaje("El Mokepon aliado resultó herido.");
    asignarMensaje(mensaje, "contenedor");
    }
  }
  else if (mokeponAliado == "Agua" && mokeponEnemigo == "Fuego" || mokeponAliado == "Tierra" && mokeponEnemigo == "Agua" || mokeponAliado == "Fuego" && mokeponEnemigo == "Tierra") {
    let mensaje = crearMensaje( mokeponAliado + " vs " + mokeponEnemigo + "  ");
    asignarMensaje(mensaje, "contenedor");
    mensaje=crearMensaje("VICTORIA!")
    asignarMensaje(mensaje, "contenedor")
    vidaEnemigo--;
    asignarVidas("Enemigo",vidaEnemigo)
  }
  else{
    let mensaje = crearMensaje( mokeponAliado + " vs " + mokeponEnemigo + "  ");
    asignarMensaje(mensaje, "contenedor");
    mensaje=crearMensaje("DERROTA!")
    asignarMensaje(mensaje, "contenedor")
    vidaJugador--;
    asignarVidas("Aliado",vidaJugador)
  }

  if (vidaEnemigo === 0 || vidaJugador === 0) {
    const mensaje = crearMensaje(`FIN DE LA PELEA. ${mensajes[vidaJugador === 0 ? 0 : 1]}`);
    asignarMensaje(mensaje, "contenedor");
    let botones = document.getElementsByName("ataque")
    botones.forEach(boton => {
      boton.disabled=true;
    })
}
}

// Función para crear un elemento de párrafo con un mensaje

function crearMensaje(mensaje) {
  let parrafo = document.createElement("p");
  parrafo.innerHTML = mensaje;
  return parrafo;
}

// Función para asignar un mensaje a una sección específica en la página
function asignarMensaje(mensaje, id) {
  let seccion = document.getElementById(id);
  seccion.appendChild(mensaje);
}
