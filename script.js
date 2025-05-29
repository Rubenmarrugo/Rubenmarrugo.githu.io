// script.js
const productos = {
  "1": { nombre: "Leche" },
  "2": { nombre: "Carne" },
  "3": { nombre: "Pollo" },
  "4": { nombre: "Verduras" },
  "5": { nombre: "Papa" },
  "6": { nombre: "Ñame" },
  "7": { nombre: "Yuca" },
};

let carrito = [];
let historialVentas = [];

window.onload = () => {
  document.getElementById("login-container").style.display = "block";
};

function login() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  if (usuario === "ruben" && contrasena === "123") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("pos-container").style.display = "block";
  } else {
    alert("Credenciales incorrectas");
  }
}

function agregarProducto() {
  const seleccion = document.getElementById("producto").value.split("|");
  const id = seleccion[0];
  const nombre = productos[id].nombre;
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!precio || precio <= 0) return alert("Precio inválido");
  if (!cantidad || cantidad <= 0) return alert("Cantidad inválida");

  const total = precio * cantidad;
  carrito.push({ id, nombre, precio, cantidad, total });
  renderTabla();
}

function renderTabla() {
  const tbody = document.querySelector("#tabla-productos tbody");
  tbody.innerHTML = "";
  let total = 0;
  carrito.forEach((p, i) => {
    total += p.total;
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td><input type='number' min='1' value='${p.cantidad}' onchange='editarCantidad(${i}, this.value)' /></td>
        <td>$${p.total}</td>
        <td><button onclick='eliminar(${i})'>Eliminar</button></td>
      </tr>
    `;
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

function editarCantidad(index, nuevaCantidad) {
  const producto = carrito[index];
  producto.cantidad = parseInt(nuevaCantidad);
  producto.total = producto.precio * producto.cantidad;
  renderTabla();
}

function eliminar(index) {
  carrito.splice(index, 1);
  renderTabla();
}

function procesarVenta() {
  const pago = parseFloat(document.getElementById("pago").value);
  const descuentoInput = document.getElementById("descuento").value;
  const descuento = parseFloat(descuentoInput) || 0;
  const subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  const totalConDescuento = subtotal - (subtotal * descuento / 100);

  if (pago < totalConDescuento) return alert("Pago insuficiente");
  const vuelto = pago - totalConDescuento;

  const ticket = `--- TICKET DE COMPRA ---\n${carrito
    .map(p => `${p.nombre} x${p.cantidad} - $${p.total}`)
    .join("\n")}\nSubtotal: $${subtotal.toFixed(2)}\nDescuento: ${descuento}%\nTotal: $${totalConDescuento.toFixed(2)}\nPago: $${pago}\nVuelto: $${vuelto.toFixed(2)}`;

  document.getElementById("ticket").textContent = ticket;
  historialVentas.push({ carrito: [...carrito], subtotal, descuento, total: totalConDescuento });
  carrito = [];
  renderTabla();
  document.getElementById("pago").value = "";
  document.getElementById("descuento").value = "";
}

function verVentas() {
  document.getElementById("pos-container").style.display = "none";
  document.getElementById("ventas-container").style.display = "block";

  const historial = document.getElementById("historial");
  let totalGlobal = 0;
  historial.innerHTML = historialVentas
    .map((venta, index) => {
      totalGlobal += venta.total;
      return `Venta ${index + 1}:\n${venta.carrito
        .map(p => `${p.nombre} x${p.cantidad} - $${p.total}`)
        .join("\n")}\nSubtotal: $${venta.subtotal.toFixed(2)}\nDescuento: ${venta.descuento}%\nTotal: $${venta.total.toFixed(2)}\n---`;
    })
    .join("\n\n");

  document.getElementById("totalVentas").textContent = totalGlobal.toFixed(2);
}

function volverPOS() {
  document.getElementById("ventas-container").style.display = "none";
  document.getElementById("pos-container").style.display = "block";
}
