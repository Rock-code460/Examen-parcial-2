
let personajes = [
  {
    id: "1",
    category: "main",
    name: "Maliketh, the Black Blade",
    role: "Remebarance Boss",
    origin: "Farum Azula",
    image: "https://preview.redd.it/maliketh-the-black-blade-v0-twt642ro9u091.jpg?width=1080&crop=smart&auto=webp&s=4b4e11a0048ca016c1b9932fdeeb15133cd13c36",
    description: "Maliketh the black blade"
  }
  , {
    id: "2",
    category: "main",
    name: "Godfrey, First Elden Lord",
    role: "Great Rune Boss",
    origin: "Golden capitol",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BzSyPlhXUB2EUEEFyN-fAbawTATWM3-EkVY7gfE_TpHtQpSZMnKztgU&s=10",
    description: "Hoaraux lou warrior"
  },
  {
    id: "3",
    category: "main",
    name: "Fire Giant",
    role: "Remembrance Boss",
    origin: "Mountaintops of the Giants",
    image: "https://i.redd.it/zwcq6y53woo91.jpg",
    description: "The last surviving giant, bound to guard the Forge of the Giants."
}
];

function normalizarPersonaje(personaje) {
  const character = {
    ...personaje,
    category: personaje.category ?? personaje.categoria,
    name: personaje.name ?? personaje.nombre,
    role: personaje.role ?? personaje.rol,
    origin: personaje.origin ?? personaje.origen,
    image: personaje.image ?? personaje.imagen,
    description: personaje.description ?? personaje.descripcion
  };

  delete character.categoria;
  delete character.nombre;
  delete character.rol;
  delete character.origen;
  delete character.imagen;
  delete character.descripcion;

  return character;
}

const personajesGuardados = localStorage.getItem("personajes");
if (personajesGuardados !== null) {
  const datosGuardados = JSON.parse(personajesGuardados);
  if (Array.isArray(datosGuardados)) {
    const datosGuardadosNormalizados = datosGuardados.map(normalizarPersonaje);
    const arrayInicialMigrado = localStorage.getItem("personajes-initial-array-migrated") === "true";
    if (arrayInicialMigrado) {
      personajes = datosGuardadosNormalizados;
    } else {
      personajes = Array.from(
        new Map([...personajes, ...datosGuardadosNormalizados].map(personaje => [personaje.id, personaje])).values()
      );
      localStorage.setItem("personajes-initial-array-migrated", "true");
    }
    localStorage.setItem("personajes", JSON.stringify(personajes));
  }
}

function crearPersonaje(nuevoPersonaje) {
    let existe = personajes.some(item => item.id === nuevoPersonaje.id);

    if (!existe) {
        personajes.push(nuevoPersonaje);
        
        // Guardar la versión limpia y actualizada en localStorage
        localStorage.setItem('personajes', JSON.stringify(personajes));
        
       
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


createPersonaje([
       {
        id: "4",
        category: "main",
        name: "Morgott, the Omen King",
        role: "Shardbearer",
        origin: "Leyndell, Royal Capital",
        image: "https://i.redd.it/aie2e86kiks81.jpg",
        description: "The Omen King and self-proclaimed last king of Leyndell."
    },
    {
    id: "5",
    category: "optional",
    name: "Starscourge Radahn",
    role: "Shardbearer",
    origin: "Caelid",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Starscourge_Radahn_concept_art.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    description: "Starscourge Radahn, the demigod who halted the stars."
},
    {
        id: "6",
        category: "optional",
        name: "Rykard, Lord of Blasphemy",
        role: "Shardbearer",
        origin: "Volcano Manor, Mt. Gelmir",
        image: "https://static.wikia.nocookie.net/eldenring/images/1/1c/Jefe_Rykard.png/revision/latest?cb=20240828180132&path-prefix=es",
        description: "A shardbearer who embraced the blasphemous serpent and wields a Great Rune."
    }
    ,
    {
        id: "7",
        category: "optional",
        name: "Malenia, Blade of Miquella",
        role: "Shardbearer",
        origin: "Elphael, Brace of the Haligtree",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7vf0eRLWuOAYAAJJYWzCUmOQTxyEbKHSYiNCHrhQVjtS82CB8LxlggSu&s=10",
        description: "The Blade of Miquella and Goddess of Rot, an undefeated swordswoman who fought Starscourge Radahn to a stalemate."
    }
     ,
    {
        id: "8",
        category: "optional",
        name: "Mohg, Lord of Blood",
        role: "Shardbearer",
        origin: "Mohgwyn Palace",
        image: "https://i.redd.it/69634rnfknoa1.jpg",
        description: "A demigod who founded the Mohgwyn dynasty and sought to raise Miquella to godhood."
    },
    {
        id: "9",
        category: "main",
        name: "Radagon of the Golden Order",
        role: "Shardbearer",
        origin: "",
        image: "https://i.redd.it/nfc2pdps82q81.jpg",
        description: ""
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

    const borderColor = personaje.category === "main" 
            ? "3px solid #f1c40f"  
            : "3px solid #d52222";  
    
    if (personaje.category === "dlc"){
        "3px solid #9a0ff1"
    }

colDiv.innerHTML = `
            <div class="card" style="cursor: pointer; height: 100%; border: ${borderColor}; border-radius: 10px; background-color: #111b27;" onclick="mostrarDetalle('${personaje.id}')">
                <div class="card-image" style="border-top-left-radius: 8px; border-top-right-radius: 8px; overflow: hidden;">
                    <figure class="image is-4by3">
                        <img src="${personaje.image}" alt="${personaje.name}" style="object-fit: cover;" />
                    </figure>
                </div>
                <div class="card-content">
                    <p class="title is-5 has-text-white">${personaje.name}</p>
                    <p class="subtitle is-6 has-text-grey-light">${personaje.role}</p>
                    <span class="tag is-dark">Category: ${personaje.category}</span>
                    <button class="button is-small is-info is-light w-100" style="width: 100%;">
                        See complete Lore
                    </button>
                </div>
            </div>
        `;

    contenedorGrid.appendChild(colDiv);
  });
 
}


// Llamar a la función al cargar la página
renderizarGrid();


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
        document.getElementById("modal-imagen").src = personaje.image;
        document.getElementById("modal-imagen").alt = personaje.name;
        document.getElementById("modal-nombre").textContent = personaje.name;
        document.getElementById("modal-rol").textContent = personaje.role;
        document.getElementById("modal-origen").textContent = personaje.origin;
        document.getElementById("modal-descripcion").textContent = personaje.description;

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
        console.log("Editando a:", personaje.name);
    }
}
