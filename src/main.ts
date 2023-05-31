import axios from 'axios';
import './style.css';


interface Cliente {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  Empresa: string;
}


document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  const menuLink = document.getElementById('#menu');
  const homeLink = document.querySelector<HTMLAnchorElement>('#Home');
  const clientesLink = document.querySelector<HTMLAnchorElement>('#clientes');
  const crearClienteLink = document.querySelector<HTMLAnchorElement>('#crear-cliente');

  // Obtener datos de los clientes
  async function getClientes() {
    try {
      const response = await axios.get('cliente'); // Ruta de la API para obtener los clientes /api/clientes
      return response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      return [];
    }
  }
  // Crear un nuevo cliente
  async function crearCliente(cliente:Cliente) {
    try {
      await axios.post('/api/clientes'); // Ruta de la API para crear un cliente '/api/clientes'
      console.log('Cliente creado exitosamente');
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  }

  // Mostrar la sección "Home"
  function showHome() {
    if (appContainer) {
      appContainer.innerHTML = `
        <h1>Welcome to the Home Page</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      `;
    }
  }
  //esto tiene que hacer que el home se muestre solo cuando le hago clic
if (menuLink) {
  menuLink.addEventListener('click', () => {
    showHome();
  });
}

  // Mostrar la sección "Clientes"
  async function showClientes() {
    if (appContainer) {
      const clientes = await getClientes();
      let clientesHTML = '<h1>Listado de Clientes</h1>';
      clientes.forEach((cliente: Cliente) => {
        clientesHTML += `<p>${cliente.nombre} -${cliente.apellido}- ${cliente.edad}${cliente.email}${cliente.Empresa}-</p>`;
      });
      appContainer.innerHTML = clientesHTML;
    }
  }
  
  // Mostrar la sección "Crear Cliente"
  function showCrearCliente() {
    if (appContainer) {
      appContainer.innerHTML = `
        <h1>Crear Cliente</h1>
        <form id="crearClienteForm">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required>
          <br><br/>
          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required>
          <br><br/>
          <label for="edad">Edad:</label>
          <input type="number" id="edad" name="edad" required>
          <br><br/>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <br><br/>
          <label for="empresa">Empresa:</label>
          <input type="text" id="empresa" name="empresa" required>
          <br><br/>
          <button type="submit">Crear</button>
        </form>
      `;
      const form = document.getElementById('crearClienteForm');
      if (form) {
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const nombreInput = document.getElementById('nombre') as HTMLInputElement;
          const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
          const edadInput = document.getElementById('edad') as HTMLInputElement;
          const emailInput = document.getElementById('email') as HTMLInputElement;
          const empresaInput = document.getElementById('empresa') as HTMLInputElement; //agregando htmlInputElement me deja hacer los value
          //necesarios si estoy trabajando con un input de tipo texto
          const nombre = nombreInput.value;
          const apellido = apellidoInput.value;
          const edad = parseInt(edadInput.value);
          const email = emailInput.value;
          const Empresa= empresaInput.value;
          const cliente = { nombre, apellido, edad, email, Empresa };
          await crearCliente(cliente);

          function validarMail(correo: string): boolean {
            const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return patronCorreo.test(correo);
          }
          
          // Ejemplos
          const correoValido = 'ejemplo@dominio.com';
          const correoInvalido = 'ejemplo@dominio';
          
          console.log(validarMail(correoValido)); // true
          console.log(validarMail(correoInvalido)); // false
          



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
  if (homeLink) {
    menuLink.addEventListener('click', showHome);
  }
  if (clientesLink) {
    clientesLink.addEventListener('click', showClientes);
  }
  if (crearClienteLink) {
    crearClienteLink.addEventListener('click', showCrearCliente);
  }

  // Mostrar Inicio por defecto
  showHome();
});