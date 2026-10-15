
const videojuegos = [
    {
    id: 1,
    nombre: "Hollow Knight",
    genero: "Aventura",
    puntuacion: 9.5,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg",
    descripcion: "Explora un reino subterráneo lleno de secretos.",
    steam: "https://store.steampowered.com/app/367520/"
},
    {
        id: 2,
        nombre: "God of War",
        genero: "Acción",
        puntuacion: 9.4,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg",
        descripcion: "Acompaña a Kratos y Atreus en una aventura épica inspirada en la mitología nórdica.",
	steam: "https://store.steampowered.com/agecheck/app/1593500/"
    },
    {
        id: 3,
        nombre: "The Witcher 3",
        genero: "RPG",
        puntuacion: 9.7,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
        descripcion: "Ponte en la piel de Geralt de Rivia y explora un enorme mundo de fantasía lleno de decisiones y misiones.",
	steam: "https://store.steampowered.com/agecheck/app/292030/"
    },
    {
        id: 4,
        nombre: "Resident Evil 4",
        genero: "Terror",
        puntuacion: 9.0,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg",
        descripcion: "Sobrevive a una peligrosa misión mientras investigas una misteriosa amenaza en una zona rural.",
	steam: "https://store.steampowered.com/agecheck/app/292030/"
    },
    {
        id: 5,
        nombre: "Cyberpunk 2077",
        genero: "RPG",
        puntuacion: 9.0,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
        descripcion: "Explora Night City, una enorme ciudad futurista donde tus decisiones influyen en tu aventura.",
	steam: "https://store.steampowered.com/agecheck/app/292030/"
    },
    {
        id: 6,
        nombre: "Stardew Valley",
        genero: "Aventura",
        puntuacion: 9.5,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg",
        descripcion: "Construye tu propia granja, cultiva alimentos, conoce a los habitantes y descubre los secretos del valle.",
	steam: "https://store.steampowered.com/agecheck/app/292030/"
    },
{
    id: 7,
    nombre: "Hades",
    genero: "Acción",
    puntuacion: 9.3,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg",
    descripcion: "Lucha para escapar del inframundo griego en este roguelike lleno de combates rápidos y personajes mitológicos.",
    steam: "https://store.steampowered.com/app/1145360/Hades/"
},
{
    id: 8,
    nombre: "Celeste",
    genero: "Plataformas",
    puntuacion: 9.2,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/header.jpg",
    descripcion: "Ayuda a Madeline a escalar una montaña superando difíciles desafíos de plataformas y obstáculos personales.",
    steam: "https://store.steampowered.com/app/504230/Celeste/"
},
{
    id: 9,
    nombre: "Terraria",
    genero: "Aventura",
    puntuacion: 9.1,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg",
    descripcion: "Explora mundos en 2D, construye refugios, consigue recursos y combate enemigos mientras descubres nuevos lugares.",
    terraria: "https://store.steampowered.com/app/105600/Terraria/"
},
{
    id: 10,
    nombre: "Portal 2",
    genero: "Puzles",
    puntuacion: 9.6,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg",
    descripcion: "Resuelve ingeniosos rompecabezas utilizando un dispositivo que crea portales para atravesar espacios y superar pruebas.",
    steam: "https://store.steampowered.com/app/620/Portal_2/"
},
{
    id: 11,
    nombre: "Cuphead",
    genero: "Acción",
    puntuacion: 8.9,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/268910/header.jpg",
    descripcion: "Enfréntate a desafiantes jefes en un juego de acción inspirado en los dibujos animados clásicos de los años treinta.",
    steam: "https://store.steampowered.com/app/268910/Cuphead/"
}
];

const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtroGenero = document.getElementById("filtro-genero");
const ordenPuntuacion = document.getElementById("orden-puntuacion");
const botonFavoritos = document.getElementById("boton-favoritos");
const mensajeVacio = document.getElementById("mensaje-vacio");

const ventana = document.getElementById("ventana-detalles");
const cerrarDetalles = document.getElementById("cerrar-detalles");
const detalleImagen = document.getElementById("detalle-imagen");
const detalleNombre = document.getElementById("detalle-nombre");
const detalleGenero = document.getElementById("detalle-genero");
const detallePuntuacion = document.getElementById("detalle-puntuacion");
const detalleDescripcion = document.getElementById("detalle-descripcion");
const detalleFavorito = document.getElementById("detalle-favorito");
const detalleSteam = document.getElementById("detalle-steam");

let mostrarSoloFavoritos = false;
let juegoSeleccionado = null;

// Recuperar los favoritos guardados en el navegador.
let favoritos = new Set();

try {
    const guardados = JSON.parse(
        localStorage.getItem("jelasgames-favoritos") || "[]"
    );

    if (Array.isArray(guardados)) {
        favoritos = new Set(
            guardados.filter(id =>
                videojuegos.some(juego => juego.id === id)
            )
        );
    }
} catch (error) {
    console.warn("No se pudieron recuperar los favoritos.", error);
}

function guardarFavoritos() {
    try {
        localStorage.setItem(
            "jelasgames-favoritos",
            JSON.stringify([...favoritos])
        );
    } catch (error) {
        console.warn("No se pudieron guardar los favoritos.", error);
    }
}

function cambiarFavorito(id) {
    if (favoritos.has(id)) {
        favoritos.delete(id);
    } else {
        favoritos.add(id);
    }

    guardarFavoritos();
    mostrarJuegos();

    // Actualizar el botón de la ventana si está abierta.
    if (juegoSeleccionado !== null) {
        actualizarBotonDetalle();
    }
}

function obtenerResultados() {
    const texto = buscador.value.toLowerCase().trim();
    const generoSeleccionado = filtroGenero.value;

    let resultados = videojuegos.filter(juego => {
        const coincideNombre =
            juego.nombre.toLowerCase().includes(texto);

        const coincideGenero =
            generoSeleccionado === "todos" ||
            juego.genero === generoSeleccionado;

        const coincideFavorito =
            !mostrarSoloFavoritos || favoritos.has(juego.id);

        return coincideNombre && coincideGenero && coincideFavorito;
    });

    if (ordenPuntuacion.value === "mayor") {
        resultados.sort(
            (a, b) => b.puntuacion - a.puntuacion
        );
    } else if (ordenPuntuacion.value === "menor") {
        resultados.sort(
            (a, b) => a.puntuacion - b.puntuacion
        );
    }

    return resultados;
}

function mostrarJuegos() {
    const resultados = obtenerResultados();

    catalogo.innerHTML = "";

    resultados.forEach(juego => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        tarjeta.tabIndex = 0;
        tarjeta.setAttribute("role", "button");
        tarjeta.setAttribute(
            "aria-label",
            "Ver detalles de " + juego.nombre
        );

        const imagen = document.createElement("img");
        imagen.src = juego.imagen;
        imagen.alt = "Portada de " + juego.nombre;
        imagen.loading = "lazy";

        imagen.onerror = () => {
            imagen.alt = "Portada no disponible: " + juego.nombre;
        };

        const botonCorazon = document.createElement("button");
        botonCorazon.type = "button";
        botonCorazon.className = "boton-corazon";

        const esFavorito = favoritos.has(juego.id);

        botonCorazon.classList.toggle("activo", esFavorito);
        botonCorazon.textContent = esFavorito ? "♥" : "♡";
        botonCorazon.setAttribute(
            "aria-label",
            esFavorito
                ? "Quitar de favoritos"
                : "Agregar a favoritos"
        );
        botonCorazon.setAttribute(
            "aria-pressed",
            String(esFavorito)
        );

        botonCorazon.addEventListener("click", evento => {
            evento.stopPropagation();
            cambiarFavorito(juego.id);
        });

        const informacion = document.createElement("div");
        informacion.className = "info-juego";

        const titulo = document.createElement("h3");
        titulo.textContent = juego.nombre;

        const genero = document.createElement("p");
        genero.className = "genero";
        genero.textContent = juego.genero;

        const puntuacion = document.createElement("p");
        puntuacion.className = "puntuacion";
        puntuacion.textContent = "★ " + juego.puntuacion + " / 10";

        informacion.append(titulo, genero, puntuacion);
        tarjeta.append(imagen, botonCorazon, informacion);

        tarjeta.addEventListener("click", () => {
            abrirDetalles(juego);
        });

        tarjeta.addEventListener("keydown", evento => {
            if (
                evento.target === tarjeta &&
                (evento.key === "Enter" || evento.key === " ")
            ) {
                evento.preventDefault();
                abrirDetalles(juego);
            }
        });

        catalogo.appendChild(tarjeta);
    });

    mensajeVacio.hidden = resultados.length !== 0;
}

function abrirDetalles(juego) {
    juegoSeleccionado = juego.id;

    detalleImagen.src = juego.imagen;
    detalleImagen.alt = "Portada de " + juego.nombre;
    detalleNombre.textContent = juego.nombre;
    detalleGenero.textContent = "Género: " + juego.genero;
    detallePuntuacion.textContent =
        "Puntuación: ★ " + juego.puntuacion + " / 10";
    detalleDescripcion.textContent = juego.descripcion;
    detalleSteam.href = juego.steam;
    detalleSteam.hidden = !juego.steam;


    actualizarBotonDetalle();

    if (!ventana.open) {
        ventana.showModal();
    }
}

function actualizarBotonDetalle() {
    const esFavorito = favoritos.has(juegoSeleccionado);

    detalleFavorito.textContent = esFavorito
        ? "♥ Quitar de favoritos"
        : "♡ Agregar a favoritos";

    detalleFavorito.setAttribute(
        "aria-pressed",
        String(esFavorito)
    );
}

detalleFavorito.addEventListener("click", () => {
    if (juegoSeleccionado !== null) {
        cambiarFavorito(juegoSeleccionado);
    }
});

cerrarDetalles.addEventListener("click", () => {
    ventana.close();
});

ventana.addEventListener("click", evento => {
    if (evento.target === ventana) {
        ventana.close();
    }
});

buscador.addEventListener("input", mostrarJuegos);
filtroGenero.addEventListener("change", mostrarJuegos);
ordenPuntuacion.addEventListener("change", mostrarJuegos);

botonFavoritos.addEventListener("click", () => {
    mostrarSoloFavoritos = !mostrarSoloFavoritos;

    botonFavoritos.textContent = mostrarSoloFavoritos
        ? "🎮 Ver todos los juegos"
        : "❤️ Ver favoritos";

    botonFavoritos.setAttribute(
        "aria-pressed",
        String(mostrarSoloFavoritos)
    );

    mostrarJuegos();
});

mostrarJuegos();
