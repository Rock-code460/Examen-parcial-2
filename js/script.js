
let personajes = [
  {
    id: "1",
    nombre: "Maliketh, the Black Blade",
    rol: "Great Rune Boss",
    origen: "Farum Azula",
    imagen: "https://preview.redd.it/maliketh-the-black-blade-v0-twt642ro9u091.jpg?width=1080&crop=smart&auto=webp&s=4b4e11a0048ca016c1b9932fdeeb15133cd13c36",
    descripcion: "Maliketh the black blade"
  }
  , {
    id: "2",
    nombre: "Godfrey, First Elden Lord",
    rol: "Great Rune Boss",
    origen: "Golden capitol",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BzSyPlhXUB2EUEEFyN-fAbawTATWM3-EkVY7gfE_TpHtQpSZMnKztgU&s=10",
    descripcion: "Hoaraux lou warrior"
  },
  {
    id: "3",
    nombre: "Fire Giant",
    rol: "Legacy Dungeon Boss",
    origen: "Mountaintops of the Giants",
    imagen: "https://i.redd.it/zwcq6y53woo91.jpg",
    descripcion: "The last surviving giant, bound to guard the Forge of the Giants."
}
];

const personajesGuardados = localStorage.getItem("personajes");
if (personajesGuardados !== null) {
  const datosGuardados = JSON.parse(personajesGuardados);
  if (Array.isArray(datosGuardados)) {
    const arrayInicialMigrado = localStorage.getItem("personajes-initial-array-migrated") === "true";
    if (arrayInicialMigrado) {
      personajes = datosGuardados;
    } else {
      personajes = Array.from(
        new Map([...personajes, ...datosGuardados].map(personaje => [personaje.id, personaje])).values()
      );
      localStorage.setItem("personajes", JSON.stringify(personajes));
      localStorage.setItem("personajes-initial-array-migrated", "true");
    }
  }
}

function crearPersonaje(nuevoPersonaje) {
    // Verificar si ya existe un personaje con el mismo ID
    let existe = personajes.some(item => item.id === nuevoPersonaje.id);

    if (!existe) {
        personajes.push(nuevoPersonaje);
        
        // Guardar la versión limpia y actualizada en localStorage
        localStorage.setItem('personajes', JSON.stringify(personajes));
        
        // Volver a renderizar la cuadrícula
        renderizarGrid();
        console.log("Personaje agregado correctamente.");
    } else {
        console.log("¡Error! Este personaje ya existe en la colección.");
    }
}

// Método para agregar un nuevo personaje a la lista
function createPersonaje(nuevosPersonajes) {
    const listaPersonajes = Array.isArray(nuevosPersonajes)
        ? nuevosPersonajes
        : [nuevosPersonajes];

    const idsExistentes = new Set();
    personajes = personajes.filter(personaje => {
        if (idsExistentes.has(personaje.id)) {
            return false;
        }
        idsExistentes.add(personaje.id);
        return true;
    });

    listaPersonajes.forEach(personaje => {
        if (!idsExistentes.has(personaje.id)) {
            personajes.push(personaje);
            idsExistentes.add(personaje.id);
        }
    });
    
    localStorage.setItem('personajes', JSON.stringify(personajes));
    
    renderizarGrid();
}

// Jefes principales desde Radahn hasta el Gigante de Fuego
createPersonaje([
       {
        id: "4",
        nombre: "Morgott, the Omen King",
        rol: "Shardbearer",
        origen: "Leyndell, Royal Capital",
        imagen: "https://i.pinimg.com/736x/ef/37/b5/ef37b5e449c9d2f0de2b72696330201d.jpg",
        descripcion: "The Omen King and self-proclaimed last king of Leyndell."
    },
    {
    id: "5",
    nombre: "Starscourge Radahn",
    rol: "Shardbearer",
    origen: "Caelid",
    imagen: "https://upload.wikimedia.org/wikipedia/en/d/dc/Starscourge_Radahn_concept_art.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    descripcion: "Starscourge Radahn, the demigod who halted the stars."
},
    {
        id: "6",
        nombre: "Rykard, Lord of Blasphemy",
        rol: "Great Rune Boss",
        origen: "Volcano Manor, Mt. Gelmir",
        imagen: "https://static.wikia.nocookie.net/eldenring/images/1/1c/Jefe_Rykard.png/revision/latest?cb=20240828180132&path-prefix=es",
        descripcion: "A shardbearer who embraced the blasphemous serpent and wields a Great Rune."
    }
    ,
    {
        id: "7",
        nombre: "Malenia, Blade of Miquella",
        rol: "Great Rune Boss",
        origen: "Elphael, Brace of the Haligtree",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7vf0eRLWuOAYAAJJYWzCUmOQTxyEbKHSYiNCHrhQVjtS82CB8LxlggSu&s=10",
        descripcion: "The Blade of Miquella and Goddess of Rot, an undefeated swordswoman who fought Starscourge Radahn to a stalemate."
    }
     ,
    {
        id: "8",
        nombre: "Mohg, Lord of Blood",
        rol: "Shardbearer",
        origen: "Mohgwyn Palace",
        imagen: "https://i.redd.it/69634rnfknoa1.jpg",
        descripcion: "A demigod who founded the Mohgwyn dynasty and sought to raise Miquella to godhood."
    }
]);

function renderizarGrid() {
  const contenedorGrid = document.getElementById("grid-personajes");
  contenedorGrid.innerHTML = ""; // Limpiar la cuadrícula antes de volver a pintar

  // Si no hay personajes, puedes mostrar un estado vacío (Requisito CA-03)[cite: 3]
  if (personajes.length === 0) {
    contenedorGrid.innerHTML = `<p class="has-text-centered">No hay personajes guardados. ¡Agrega el primero!</p>`;
    return;
  }

  // Recorrer el arreglo para crear cada tarjeta dinámicamente
  personajes.forEach(personaje => {
    const colDiv = document.createElement("div");
    colDiv.className = "column is-one-quarter";

colDiv.innerHTML = `
  <div class="card" style="cursor: pointer;" onclick="mostrarDetalle('${personaje.id}')">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="${personaje.imagen}" alt="${personaje.nombre}" style="object-fit: cover;" />
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4">${personaje.nombre}</p>
      <p class="subtitle is-6">${personaje.rol}</p>
      <span class="tag is-info is-light">Haz clic para ver lore completo</span>
    </div>
  </div>
`;

    contenedorGrid.appendChild(colDiv);
  });
  activarEventosTarjetas();
}


// Llamar a la función al cargar la página
renderizarGrid();

function activarEventosTarjetas() {
    // 1. Botón ELIMINAR (Requisito RF-07 y Criterio CA-10)
    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            eliminarPersonaje(id);
        });
    });

    // 2. Botón EDITAR (Requisito RF-06)
    document.querySelectorAll(".btn-editar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            prepararEdicion(id);
        });
    });

    // 3. Botón VER DETALLE (Requisito RF-02 y Criterio CA-04)
    document.querySelectorAll(".btn-detalle").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            mostrarDetalle(id);
        });
    });
}

// --- ELIMINAR PERSONAJE ---
function eliminarPersonaje(id) {
    // Solicitar confirmación previa (Criterio CA-10)[cite: 3]
    const confirmar = confirm("¿Estás seguro de eliminar este jefe de la colección?");
    if (!confirmar) return;

    // Filtrar el arreglo para quitar el elemento con ese ID
    personajes = personajes.filter(item => item.id !== id);

    // Actualizar localStorage y volver a pintar la cuadrícula[cite: 1, 2]
    localStorage.setItem("personajes", JSON.stringify(personajes));
    renderizarGrid();
}

//eliminarPersonaje("7");

// --- VER DETALLE ---
function mostrarDetalle(id) {
    const personaje = personajes.find(item => item.id === id);
    if (personaje) {
        document.getElementById("modal-imagen").src = personaje.imagen;
        document.getElementById("modal-imagen").alt = personaje.nombre;
        document.getElementById("modal-nombre").textContent = personaje.nombre;
        document.getElementById("modal-rol").textContent = personaje.rol;
        document.getElementById("modal-origen").textContent = personaje.origen;
        document.getElementById("modal-descripcion").textContent = personaje.descripcion;

        document.getElementById("modal-detalle").classList.add("is-active");
        document.body.classList.add("is-clipped");
    }
}

function cerrarModal() {
    document.getElementById("modal-detalle").classList.remove("is-active");
    document.body.classList.remove("is-clipped");
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarModal();
    }
});

// --- PREPARAR EDICIÓN (Cargar datos al formulario) ---
function prepararEdicion(id) {
    const personaje = personajes.find(item => item.id === id);
    if (personaje) {
        // Aquí puedes rellenar los inputs de tu formulario con los datos actuales del personaje
        // para que el usuario los modifique y guarde los cambios (RF-06)[cite: 2]
        console.log("Editando a:", personaje.nombre);
    }
}
