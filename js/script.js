
let personajes = [
  {
    id: "1",
    category: "main",
    name: "Maliketh, the Black Blade",
    role: "Remebarance Boss",
    origin: "Farum Azula",
    image: "https://preview.redd.it/maliketh-the-black-blade-v0-twt642ro9u091.jpg?width=1080&crop=smart&auto=webp&s=4b4e11a0048ca016c1b9932fdeeb15133cd13c36",
    description: "Gurranq, Beast Clergyman is found at the end of Crumbling Farum Azula and is revealed to be Maliketh, the Black Blade. Similar to how Blaidd is to Ranni, Maliketh is Queen Marika's shadow-bound beast. He was tasked to guard the Rune of Death, but his failure to do so led to the Night of the Black Knives. In order for this to never happen again, he imbued the rune into his very flesh."
  }
  , {
    id: "2",
    category: "main",
    name: "Godfrey, First Elden Lord",
    role: "Great Rune Boss",
    origin: "Golden capitol",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BzSyPlhXUB2EUEEFyN-fAbawTATWM3-EkVY7gfE_TpHtQpSZMnKztgU&s=10",
    description: "Godfrey was Queen Marika's first consort, and thus the first Elden Lord of the Lands Between. Before earning this title, he was known as Hoarah Loux, the chieftain of the badlands and a bloodthirsty warrior. Godfrey took the Beast Regent Serosh upon his back after committing to his role as a Lord in order to suppress his violent urges. After fighting countless wars, Marika deprived him and his warriors of their grace, marking them as the first Tarnished."
  },
  {
    id: "3",
    category: "main",
    name: "Fire Giant",
    role: "Remembrance Boss",
    origin: "Mountaintops of the Giants",
    image: "https://i.redd.it/zwcq6y53woo91.jpg",
    description: "The last known survivor of the war against the giants fougth by Godfrey, and bound to guard the Forge of the Giants, this massive humanoid has a face on its chest and is found in the Mountaintops of the Giants."
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
    let existe = personajes.some(item => String(item.id) === String(nuevoPersonaje.id));
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
    let listaPersonajes = Array.isArray(nuevosPersonajes)
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
        description: "Morgott is the true identity of Margit, the Fell Omen, and the self-proclaimed Last of All Kings. Although he and his twin brother Mohg were imprisoned deep in the Subterranean Shunning-Grounds for being born as Omen royalty, Morgott still loved the Golden Order and defended the capital when his fellow demigods invaded during the Shattering."
    },
    {
    id: "5",
    category: "optional",
    name: "Starscourge Radahn",
    role: "Shardbearer",
    origin: "Caelid",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Starscourge_Radahn_concept_art.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    description: "As his power grew, Radahn's gravitational prowess reached godlike proportions. When rogue falling stars and meteors threatened his beloved hometown of Sellia, Radahn took to the skies in combat and literally froze the stars in the night sky, halting their orbits entirely. Starscourge Radahn is heralded as one of the mightiest living demigods, having fought Malenia the Severed to a standstill during the Shattering. However, his resulting affliction with the Scarlet Rot caused him to be driven to insanity, crippling him and reducing him to a state of feral rage."
},
    {
        id: "6",
        category: "optional",
        name: "Rykard, Lord of Blasphemy",
        role: "Shardbearer",
        origin: "Volcano Manor, Mt. Gelmir",
        image: "https://images.steamusercontent.com/ugc/1860555511760673263/DC5C6B47BF1BD5F1F7851CC6541DEE585A21E872/",
        description: "The God-Devouring Serpent is a massive coiled serpent found at the Volcano Manor in Mt. Gelmir, and Rykard, Lord of Blasphemy is its true form that's revealed after the first phase is defeated. When Rykard offered himself up to the serpent in a pursuit of immortality, most of his followers turned on him and sought to bring him down with the Serpent-Hunter."
    }
    ,
    {
        id: "7",
        category: "optional",
        name: "Malenia, Blade of Miquella",
        role: "Shardbearer",
        origin: "Elphael, Brace of the Haligtree",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7vf0eRLWuOAYAAJJYWzCUmOQTxyEbKHSYiNCHrhQVjtS82CB8LxlggSu&s=10",
        description: "She is the Empyrean twin sister of Miquella and gained renown for her legendary battle against Starscourge Radahn during the Shattering, in which she unleashed the power of the Scarlet Rot and reduced Caelid to ruins."
    }
     ,
    {
        id: "8",
        category: "optional",
        name: "Mohg, Lord of Blood",
        role: "Shardbearer",
        origin: "Mohgwyn Palace",
        image: "https://i.redd.it/69634rnfknoa1.jpg",
        description: "A demigod who founded the Mohgwyn dynasty. Unlike his twin Morgott, Mohg fully embraced his accursed Omen blood and is able to use it to wield bloodflame magic after encountering the Formless Mother. Though he himself is not an Empyrean, he hopes to elevate himself to king consort by raising Miquella up to godhood and becoming his consort."
    },
    {
        id: "9",
        category: "main",
        name: "Elden Beast",
        role: "Final Boss",
        origin: "heart of the Erdtree",
        image: "https://static0.fextralifeimages.com/file/eldenring/7/75/Elden-beast-boss-elden-ring-wiki-guide.png?version=2dbbcb0f54a1d92a3bbf228a820cff31",
        description: "Elden Beast is the true form of the Elden Ring, acting as the vassal of the Greater Will, and is found in the Elden Throne. It was sent to the Lands Between through a golden star long before the events of the game."
    },
    {
        id: "10",
        category: "dlc",
        name: "Messmer the Impaler",
        role: "Remembrance Boss",
        origin: "Shadow Keep",
        image: "https://eldenring.wiki.gg/images/thumb/Messmer%2C_the_Impaler.jpg/1200px-Messmer%2C_the_Impaler.jpg?ca3ec9",
        description: "He is the leader of the crusade against the Hornsent people, killing their Divine Beasts and burning the Tower Settlement. He is revealed to be Queen Marika's son, secreted away and abandoned in the Land of Shadow."
    },
    {
        id: "11",
        category: "dlc",
        name: "Midra, Lord of Frenzied Flame",
        role: "Remembrance Boss",
        origin: "Midra's Manse, Abyssal Woods",
        image: "https://eldenring.wiki.gg/images/thumb/Shadow_of_the_Erdtree_promotional_screenshot_11.jpg/1200px-Shadow_of_the_Erdtree_promotional_screenshot_11.jpg?4ec9bd",
        description: "A sage who endured torment in his manse before becoming the Lord of Frenzied Flame. He is the embodiment of the Frenzied Flame."
    },
    {
        id: "12",
        category: "dlc",
        name: "Promised Consort Radahn",
        role: "Final Boss",
        origin: "Enir-Ilim",
        image: "https://eldenring.wiki.gg/images/thumb/Promised_Consort_Boss.jpg/1200px-Promised_Consort_Boss.jpg?67917d",
        description: "When Malenia fought Radahn to a stalemate in Caelid and bloomed with Scarlet Rot, Radahn’s mind and body were left rotting and trapped in endless agony. To fulfill the vow, Miquella needed a fresh vessel to house Radahn's soul.To achieve this, Miquella used his charm to manipulate Mohg, Lord of Blood, getting Mohg to kidnap Miquella’s empyrean cocoon and start a dynasty. Miquella knew the Tarnished would eventually kill Mohg. Once the player slays Mohg in the base game, Miquellas spirit is freed, and Mohg’s physical body is left behind as an empty vessel."
    }
]);

// 1. Accept an optional array parameter (defaults to all characters)
function renderizarGrid(arrayPersonalizado = personajes) {
    const contenedorGrid = document.getElementById("grid-personajes");
    contenedorGrid.innerHTML = ""; // Limpiar la cuadrícula antes de volver a pintar

    // 2. Check the length of the parameter array, not 'personajes'
    if (arrayPersonalizado.length === 0) {
        contenedorGrid.innerHTML = `<p class="has-text-centered has-text-white">No se encontraron jefes con ese criterio.</p>`;
        return;
    }
    


    // 3. Loop through 'arrayPersonalizado' instead of 'personajes'
    arrayPersonalizado.forEach(character => {
        const colDiv = document.createElement("div");
        colDiv.className = "column is-one-quarter";

        const borderColor = character.category === "main" 
            ? "3px solid #f1c40f"  
            : character.category === "dlc"
            ? "3px solid #9a0ff1"
            : "3px solid #d52222";  

            const imagePosition = ["8", "4"].includes(character.id) ? "center" : "top";

        colDiv.innerHTML = `
            <div class="card" style="cursor: pointer; height: 100%; border: ${borderColor}; border-radius: 10px; background-color: #121212;" onclick="mostrarDetalle('${character.id}')">
                <div class="card-image" style="border-top-left-radius: 8px; border-top-right-radius: 8px; overflow: hidden;">
                    <figure class="image is-4by3">
                        <img src="${character.image}" alt="${character.name}" style="object-fit: cover; object-position: ${imagePosition};" />
                </figure>
                </div>
                <div class="card-content">
                    <p class="title is-5 has-text-white">${character.name}</p>
                    <p class="subtitle is-6 has-text-grey-light">${character.role}</p>
                    <span class="tag is-dark mb-3">Category: ${character.category}</span>
                    
                    <button class="button is-small is-info is-light w-100 mb-2" style="width: 100%;">
                        See complete Lore
                    </button>
                    <!-- Edit Button -->
                    <button class="button is-small is-warning is-light mb-2" style="width: 100%;" onclick="event.stopPropagation(); prepararEdicion('${character.id}')">
                        Edit Boss ✏️
                    </button>
                    <!-- Delete Button -->
                    <button class="button is-small is-danger is-light" style="width: 100%;" onclick="event.stopPropagation(); eliminarPersonaje('${character.id}')">
                        Delete Boss 🗑️
                    </button>
                </div>
            </div>
        `;

        contenedorGrid.appendChild(colDiv);
    });
}

document.getElementById("input-busqueda").addEventListener("input", (e) => {
    const textoBusqueda = e.target.value.toLowerCase().trim();

    // Filter the 'personajes' array using the correct English property keys
    const resultadosFiltrados = personajes.filter(char => 
        char.name.toLowerCase().includes(textoBusqueda) || 
        char.role.toLowerCase().includes(textoBusqueda) ||
        char.id.toLowerCase().includes(textoBusqueda) ||
        char.category.toLowerCase().includes(textoBusqueda)
    );

    // Re-render the grid with only the matching bosses
    renderizarGrid(resultadosFiltrados);
});

// Llamar a la función al cargar la página
renderizarGrid();


// --- ELIMINAR PERSONAJE ---
function eliminarPersonaje(id) {
    // Solicitar confirmación previa (Criterio CA-10)[cite: 3]
    const confirmar = confirm("¿Estás seguro de eliminar este jefe de la colección?");
    if (!confirmar) return;

    // Filtrar el arreglo para quitar el elemento con ese ID
    personajes = personajes.filter(item => String(item.id) !== String(id));

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

// --- PREPARAR EDICIÓN (Load data into form modal) ---
function prepararEdicion(id) {
    const personaje = personajes.find(item => item.id === id);
    if (personaje) {
        document.getElementById("edit-id").value = personaje.id;
        document.getElementById("edit-name").value = personaje.name;
        document.getElementById("edit-role").value = personaje.role;
        document.getElementById("edit-category").value = personaje.category;
        document.getElementById("edit-origin").value = personaje.origin;
        document.getElementById("edit-image").value = personaje.image;
        document.getElementById("edit-description").value = personaje.description;

        document.getElementById("modal-editar").classList.add("is-active");
        document.body.classList.add("is-clipped");
    }
}

// --- CERRAR MODAL DE EDICIÓN ---
function cerrarModalEditar() {
    document.getElementById("modal-editar").classList.remove("is-active");
    document.body.classList.remove("is-clipped");
}

// --- GUARDAR EDICIÓN (Update array and localStorage) ---
function guardarEdicion() {
    const id = document.getElementById("edit-id").value;
    const index = personajes.findIndex(item => item.id === id);

    if (index !== -1) {
        // Update the character object with new form values
        personajes[index].name = document.getElementById("edit-name").value;
        personajes[index].role = document.getElementById("edit-role").value;
        personajes[index].category = document.getElementById("edit-category").value;
        personajes[index].origin = document.getElementById("edit-origin").value;
        personajes[index].image = document.getElementById("edit-image").value;
        personajes[index].description = document.getElementById("edit-description").value;

        // Persist changes in localStorage
        localStorage.setItem("personajes", JSON.stringify(personajes));

        // Re-render the grid and close modal
        renderizarGrid();
        cerrarModalEditar();
    }
}

function reiniciarColeccion() {
    const confirmar = confirm("¿Estás seguro de restablecer la colección a su estado original? Se perderán todos los cambios y ediciones.");
    if (confirmar) {
        localStorage.clear();
        location.reload(); // Reloads the page and restores original seed data
    }
}

// --- ELIMINAR PERSONAJE ---
function eliminarPersonaje(id) {
    // Prompt confirmation dialog (Criterio CA-10)
    const confirmar = confirm("¿Estás seguro de eliminar este jefe de la colección?");
    if (!confirmar) return;

    // Filter out the character with the matching ID
    personajes = personajes.filter(item => item.id !== id);

    // Update localStorage and refresh grid
    localStorage.setItem("personajes", JSON.stringify(personajes));
    renderizarGrid();
}