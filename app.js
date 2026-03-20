const data = [
  { id: "p01", title: "Montaña", desc: "Luz suave y cielo polar", src: "https://picsum.photos/id/1018/1200/675" },
  { id: "p02", title: "Amanecer", desc: "Rocas y niebla", src: "https://picsum.photos/id/1015/1200/675" },
  { id: "p03", title: "Rio", desc: "Atardecer urbano", src: "https://picsum.photos/id/1011/1200/675" },
  { id: "p04", title: "Alaska", desc: "Verde profundo", src: "https://picsum.photos/id/1020/1200/675" },
  { id: "p05", title: "Desierto", desc: "Horizonte y calma", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Ruta", desc: "Camino en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
];

//Seleccion de elementos del DOM
const thumbs = document.querySelector("#thumbs");
const heroImg = document.querySelector("#heroImg");
const heroTitle = document.querySelector("#heroTitle");
const heroDesc = document.querySelector("#heroDesc");
const likeBtn = document.querySelector("#likeBtn");
const counter = document.querySelector("#counter");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");

// Variables para el estado de la app
let currentIndex = 0;
let likes = {};

let autoPlayId = null;
let isPlaying = false;
const AUTO_TIME = 3000; //Tiempo en milisegundos para el autoplay

//Función para renderizar las miniaturas
function renderThumbs() {
  thumbs.innerHTML = data.map((item, index) =>{
    return `
    <article class="thumb ${index === currentIndex ? "active" : ""}" data-index="${index}">
    <span class = "badge">${index + 1}</span>
    <img src="${item.src}" alt="${item.title}">
    </article>
    `;
  }).join("");
}

// Renderizar imagen en el visor principal
function renderHero ( index ){

  //Recuperar elemento acorde al indice
  const item = data[index];

  //Actualizar la imagen principal
  heroImg.src = item.src;
  heroImg.alt = item.title;

  //Actualizar titulo y descripcion
  heroTitle.textContent = item.title;
  heroDesc.textContent = item.desc;

  //Actualizar el contador de las imagenes
  counter.textContent = `${index + 1} / ${data.length}`;
}

function changeSlide( newIndex ){
  heroImg.classList.add("fade-out");
  setTimeout(() => {
    currentIndex = newIndex;
    renderHero(currentIndex);
      heroImg.classList.remove("fade-out");
    }, 350); //Duracion del efecto de desvanecimiento
} 

function nextSlide(){
  const newIndex = (currentIndex + 1) % data.length;
  changeSlide(newIndex);
}

function prevSlide(){
  const newIndex = (currentIndex - 1 + data.length) % data.length;
  changeSlide(newIndex);
}

function startAutoPlay(){
  autoPlayId = setInterval(() => { 
    nextSlide();
  }, AUTO_TIME);

  isPlaying = true;
  updatePlayButton();

  counter.textContent = `${index + 1} / ${data.length}`;
}

function updatePlayButtom(){
  
}



//Evento para manejar el click en el boton de "Me gusta"
likeBtn.addEventListener("click", () => {
  const currentItem = data[currentIndex];
  // Cambiar de true a false
  likes[currentItem.id] = !likes[currentItem.id];
  const isLiked = likes[currentItem.id];

  //Actualizar el boton
  likeBtn.textContent = isLiked ? "❤️" : "🤍";
  likeBtn.classList.toggle("on", isLiked);
  likeBtn.setAttribute("aria-pressed", isLiked);
});

//Evento para manejar el click en las miniaturas
thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return; //Si no se hizo click en una miniatura, salir

  //Obtener el indice de la miniatura desde el atributo data-index
  currentIndex = Number(thumb.dataset.index);

  //Actualizar el visor principal
  renderHero(currentIndex);
});

renderThumbs();
renderHero(currentIndex);