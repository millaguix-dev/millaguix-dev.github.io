let vidaJugador=3;
let vidaEnemigo=3;
let mokeponEnemigo;
const mensajes = {
  0: "Has Perdido.",
  1: "Has Ganado."
}
////////////////////////////////////
//Crear clase
class Mokepon {
  constructor(nombre, foto, vida){
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = []
  }
}
//Crear Objeto
let taliyah = new Mokepon("Taliyah","./img/Taliyah200x300.png",5)
let annie = new Mokepon("Annie","./img/Annie200x300.png",5)
let nami = new Mokepon("Nami","./img/Nami200x300.png",5)
let skarner = new Mokepon("Skarner","./img/Skarner200x300.png",5)
let qiyana = new Mokepon("Qiyana","./img/Qiyana200x300.png",5)
let ornn = new Mokepon("Ornn","./img/Ornn200x300.png",5)
//Añadir Ataques
taliyah.ataques.push(
  {nombre: "🌱", id:"btn-tierra"}
)
annie.ataques.push(
  {nombre:"🔥",id:"btn-fuego"}
)
nami.ataques.push(
  {nombre:"💧",id:"btn-agua"}
)
skarner.ataques.push(
  {nombre:"💧",id:"btn-agua"},
  {nombre:"🌱",id:"btn-tierra"}
)
qiyana.ataques.push(
  {nombre:"💧",id:"btn-agua"},
  {nombre:"🌱",id:"btn-tierra"},
  {nombre:"🔥",id:"btn-fuego"}
)
ornn.ataques.push(
  {nombre:"🌱",id:"btn-tierra"},
  {nombre:"🔥",id:"btn-fuego"}
)

/////////////////////////////////////
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
      tarjetas.forEach(t => t.classList.remove('seleccionado'));
      tarjeta.classList.add('seleccionado');
      });
    tarjeta.addEventListener('mouseleave', () => {
      tarjeta.classList.remove('hover');
      });
    });
    botonSeleccionar.addEventListener('click', () => {
    const tarjetaSeleccionada = document.querySelector('.seleccionado');
    if (tarjetaSeleccionada) {
    seccionCombate.style.display="flex"
    mokeponEnemigo=seleccionarMokeponEnemigo()
    tarjetas.forEach(tarjeta => {
        tarjeta.style.display = 'none';
        });
    document.getElementById('seleccion-mokepon').style.display='none';
    document.getElementById('mokeponAliado').prepend(tarjetaSeleccionada)
    tarjetaSeleccionada.style.display = 'block';
    tarjetaSeleccionada.style.border = '2px solid black'
    HabilitarAtaque(tarjetaSeleccionada,botonesAtaque)
    asignarVidas("Aliado",vidaJugador);
    tarjetaEnemigo(mokeponEnemigo)
    asignarVidas("Enemigo",vidaEnemigo);
    botonReinicio.addEventListener("click", () => {
      this.location.reload();
      });
    botonesAtaque.forEach(boton => {
    boton.addEventListener("click", () => {
      let elemento= boton.dataset.elemento;
      let elementoEnemigo = obtenerAtaqueEnemigo(mokeponEnemigo)
      combate(elemento,elementoEnemigo,botonesAtaque);
      })
    })
      } else {
      alert('Por favor, selecciona un Mokepon antes de continuar.');
      }
    });
  });

function seleccionarMokeponEnemigo() {
const tarjetas = document.querySelectorAll('.tarjeta');
let random = aleatorio(1, 6);
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

function HabilitarAtaque(mokepon,botones){
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
containerVidas.innerHTML = '';
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

function combate(mokeponAliado,mokeponEnemigo,botones){
if(mokeponAliado==mokeponEnemigo){
  let mensaje = crearMensaje(mokeponAliado + " vs " + mokeponEnemigo +" ");
  asignarMensaje(mensaje,"contenedor")
  let random= aleatorio(0,1)
  if(random==0){
    vidaEnemigo--;
    asignarVidas("Enemigo",vidaEnemigo)
    let mensaje = crearMensaje("VICTORIA");
    asignarMensaje(mensaje, "contenedor");
    }
  else{
    vidaJugador -= 1;
    asignarVidas("Aliado",vidaJugador)
    let mensaje = crearMensaje("DERROTA");
    asignarMensaje(mensaje, "contenedor");
    }
  }
else if (mokeponAliado == "Agua" && mokeponEnemigo == "Fuego" || mokeponAliado == "Tierra" && mokeponEnemigo == "Agua" || mokeponAliado == "Fuego" && mokeponEnemigo == "Tierra") {
  let mensaje = crearMensaje(mokeponAliado+ " vs "+ mokeponEnemigo);
  asignarMensaje(mensaje,"contenedor")
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
const mensaje = crearMensaje(`${mensajes[vidaJugador === 0 ? 0 : 1]}`);
asignarMensaje(mensaje, "contenedor");
botones.forEach(boton => {
    boton.disabled=true;
    })
}
}

function crearMensaje(mensaje) {
let parrafo = document.createElement("p");
parrafo.classList.add("resultado")
parrafo.innerHTML = mensaje;
return parrafo;
}

function asignarMensaje(mensaje, id) {
let seccion = document.getElementById(id);
seccion.appendChild(mensaje);
}