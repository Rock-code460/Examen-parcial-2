#  Elden Ring Boss Collection - SPA

Una Aplicación de Página Única (SPA) moderna, responsiva y dinámica diseñada para gestionar una colección completa de jefes de *Elden Ring*. Desarrollada utilizando **HTML5**, **JavaScript Vanilla**, y estilizada con el framework **Bulma CSS**, con persistencia de datos mediante **`localStorage`**.

---

# Características Principales

- **Diseño Responsivo con Bulma CSS**: Cuadrícula adaptable (`columns is-multiline`) y componentes limpios.
- **Categorización por Colores**: 
  - 🟡 **Main (Principal)**: Borde dorado (`#f1c40f`).
  - 🟣 **DLC**: Borde morado (`#9a0ff1`).
  - 🔴 **Optional (Opcional)**: Borde rojo (`#d52222`).
- **Persistencia de Datos (`localStorage`)**: Todos los cambios (creaciones, ediciones y eliminaciones) se guardan automáticamente en el navegador.
- **Ajustes visuales avanzados**: Posicionamiento inteligente de imágenes (`object-fit: cover` con excepciones personalizadas como Mohg para evitar recortes en rostros) y modales anchos adaptados para imágenes horizontales.

---

##  Funcionalidades CRUD y Extras

### 1. **Create (Crear / Inicializar)**
- La aplicación cuenta con un conjunto de datos iniciales (*seed data*) predeterminados que se cargan automáticamente si el almacenamiento local está vacío.
- También permite registrar nuevos jefes directamente mediante código o la consola del navegador con este formato:
- createPersonaje({
    id: "13",
    category: "dlc",
    name: "Bayle the Dread",
    role: "Remembrance Boss",
    origin: "Jagged Peak",
    image: "https://eldenring.wiki.gg/images/thumb/Bayle_the_Dread.jpg/1200px-Bayle_the_Dread.jpg",
    description: "An ancient dread dragon residing at the summit of the Jagged Peak, locked in eternal vengeance against Dragonlord Placidusax."
});
Siempre asegurando usar un id unico.

### 2. **Read (Leer y Buscar)**
- **Cuadrícula interactiva**: Visualiza la tarjeta de cada jefe con su respectiva imagen, rol y categoría.
- **Buscador en tiempo real**: Ubicado en la barra de navegación superior (`.navbar-end`), filtra instantáneamente los jefes escribiendo su nombre o rol.
- **Modal de Detalle / Lore**: Haz clic en cualquier tarjeta para abrir un modal flotante con la imagen ampliada (optimizada para formato vertical u horizontal) y la descripción completa del lore.

### 3. **Update (Actualizar / Editar)**
- Cada tarjeta incluye un botón **"Edit Boss ✏️"**.
- Al hacer clic, se despliega un formulario modal precargado con la información actual del jefe (Nombre, Rol, Categoría, Origen, URL de Imagen y Descripción).
- Al guardar los cambios, la interfaz y el `localStorage` se actualizan de inmediato.

### 4. **Delete (Eliminar)**
- Cada tarjeta incluye un botón **"Delete Boss 🗑️"**.
- Al presionarlo, el sistema solicita una confirmación previa (`window.confirm`) para evitar borrados accidentales. Si se acepta, el jefe se elimina permanentemente de la vista y del almacenamiento.

### 5. **Reset to Default (Restablecer)**
- Cuenta con un botón de **"Reset to Default 🔄"** en la barra de navegación que limpia el `localStorage` y restaura la colección a su estado original de fábrica.

---

## 💻 Cómo agregar un personaje desde la Consola del Navegador

Si deseas agregar un nuevo jefe rápidamente usando JavaScript desde las herramientas de desarrollo de tu navegador, sigue estos pasos:

1. Abre tu página web en el navegador.
2. Abre la consola de desarrollador presionando **F12** (o clic derecho -> *Inspeccionar* -> pestaña **Console**).
3. Pega y ejecuta el siguiente fragmento de código (puedes modificar los valores a tu gusto):

```javascript
createPersonaje({
    id: "13",
    category: "dlc",
    name: "Bayle the Dread",
    role: "Remembrance Boss",
    origin: "Jagged Peak",
    image: "[https://eldenring.wiki.gg/images/thumb/Bayle_the_Dread.jpg/1200px-Bayle_the_Dread.jpg](https://eldenring.wiki.gg/images/thumb/Bayle_the_Dread.jpg/1200px-Bayle_the_Dread.jpg)",
    description: "An ancient dread dragon residing at the summit of the Jagged Peak, locked in eternal vengeance against Dragonlord Placidusax."
});
