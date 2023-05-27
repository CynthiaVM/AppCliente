import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  const menuLink = document.getElementById('menu');
  const clientesLink = document.getElementById('clientes');
  const crearClienteLink = document.getElementById('crear-cliente');

  // Función para obtener los datos de los clientes
  async function getClientes() {
    try {
      const response = await axios.get('/api/clientes'); // Ruta de la API para obtener los clientes
      return response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      return [];
    }
  }

  // Función para crear un nuevo cliente
  async function crearCliente(cliente) {
    try {
      await axios.post('/api/clientes', cliente); // Ruta de la API para crear un cliente
      console.log('Cliente creado exitosamente');
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  }

  // Función para mostrar la sección "Home"
  function showHome() {
    if (appContainer) {
      appContainer.innerHTML = `
        <h1>Welcome to the Home Page</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      `;
    }
  }

  // Función para mostrar la sección "Clientes"
  async function showClientes() {
    if (appContainer) {
      const clientes = await getClientes();
      let clientesHTML = '<h1>Listado de Clientes</h1>';
      clientes.forEach((cliente) => {
        clientesHTML += `<p>${cliente.nombre} - ${cliente.email}</p>`;
      });
      appContainer.innerHTML = clientesHTML;
    }
  }

  // Función para mostrar la sección "Crear Cliente"
  function showCrearCliente() {
    if (appContainer) {
      appContainer.innerHTML = `
        <h1>Crear Cliente</h1>
        <form id="crearClienteForm">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required>
          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required>
          <label for="edad">Edad:</label>
          <input type="number" id="edad" name="edad" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <button type="submit">Crear</button>
        </form>
      `;
      const form = document.getElementById('crearClienteForm');
      if (form) {
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const nombreInput = document.getElementById('nombre');
          const apellidoInput = document.getElementById('apellido');
          const edadInput = document.getElementById('edad');
          const emailInput = document.getElementById('email');
          const nombre = nombreInput.value;
          const apellido = apellidoInput.value;
          const edad = parseInt(edadInput.value);
          const email = emailInput.value;
          const cliente = { nombre, apellido, edad, email };
          await crearCliente(cliente);
        });
      }
    }
  }

  if (menuLink) {
    menuLink.addEventListener('click', showHome);
  }
  if (clientesLink) {
    clientesLink.addEventListener('click', showClientes);
  }
  if (menuLink) {
    menuLink.addEventListener('click', showHome);
  }
  if (clientesLink) {
    clientesLink.addEventListener('click', showClientes);
  }
  if (crearClienteLink) {
    crearClienteLink.addEventListener('click', showCrearCliente);
  }

  // Mostrar la sección de inicio por defecto
  showHome();
});