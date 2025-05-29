// Funcionalidades principales del sistema

// Datos simulados
const patients = [
  {
    documento: "1023456789",
    nombre: "Juan Carlos Pérez García",
    edad: 35,
    genero: "Masculino",
    eps: "SURA",
    regimen: "Contributivo",
    ultimaCita: "15/05/2023",
  },
  {
    documento: "52345678",
    nombre: "María Fernanda López Martínez",
    edad: 28,
    genero: "Femenino",
    eps: "NUEVA EPS",
    regimen: "Subsidiado",
    ultimaCita: "10/05/2023",
  },
  {
    documento: "98765432",
    nombre: "Carlos Andrés Rodríguez Sánchez",
    edad: 45,
    genero: "Masculino",
    eps: "SANITAS",
    regimen: "Contributivo",
    ultimaCita: "05/05/2023",
  },
  {
    documento: "45678912",
    nombre: "Ana Milena Gómez Ramírez",
    edad: 52,
    genero: "Femenino",
    eps: "COOMEVA",
    regimen: "Contributivo",
    ultimaCita: "02/05/2023",
  },
]

const doctors = [
  {
    identificacion: "12345678",
    nombre: "Dra. María Fernanda Rodríguez",
    especialidad: "Medicina General",
    registro: "MP-12345",
    telefono: "3101234567",
    email: "mrodriguez@clinica.com",
    estado: "Activo",
  },
  {
    identificacion: "87654321",
    nombre: "Dr. Carlos Andrés Sánchez",
    especialidad: "Cardiología",
    registro: "MP-54321",
    telefono: "3209876543",
    email: "csanchez@clinica.com",
    estado: "Activo",
  },
  {
    identificacion: "54321678",
    nombre: "Dra. Patricia Díaz Gómez",
    especialidad: "Pediatría",
    registro: "MP-98765",
    telefono: "3156789012",
    email: "pdiaz@clinica.com",
    estado: "Vacaciones",
  },
  {
    identificacion: "98761234",
    nombre: "Dr. Jorge Luis Ramírez",
    especialidad: "Ortopedia",
    registro: "MP-45678",
    telefono: "3178901234",
    email: "jramirez@clinica.com",
    estado: "Activo",
  },
]

const medicines = [
  {
    codigo: "MED-001",
    nombre: "Acetaminofén",
    principio: "Paracetamol",
    presentacion: "Tabletas 500mg x 10",
    categoria: "Analgésico",
    stock: 85,
    maxStock: 100,
    vencimiento: "15/12/2024",
    precio: 5200,
  },
  {
    codigo: "MED-045",
    nombre: "Amoxicilina",
    principio: "Amoxicilina Trihidratada",
    presentacion: "Cápsulas 500mg x 12",
    categoria: "Antibiótico",
    stock: 20,
    maxStock: 50,
    vencimiento: "30/09/2023",
    precio: 12500,
  },
  {
    codigo: "MED-112",
    nombre: "Losartán",
    principio: "Losartán Potásico",
    presentacion: "Tabletas 50mg x 30",
    categoria: "Antihipertensivo",
    stock: 3,
    maxStock: 20,
    vencimiento: "28/02/2025",
    precio: 24800,
  },
  {
    codigo: "MED-208",
    nombre: "Metformina",
    principio: "Metformina HCl",
    presentacion: "Tabletas 850mg x 60",
    categoria: "Antidiabético",
    stock: 0,
    maxStock: 25,
    vencimiento: "15/08/2024",
    precio: 18300,
  },
]

const recipes = [
  {
    numero: "REC-2023-00158",
    fecha: "12/05/2023",
    paciente: "Juan Carlos Pérez",
    documento: "1023456789",
    medico: "Dra. María Rodríguez",
    medicamentos: [
      { codigo: "MED-001", nombre: "Acetaminofén", cantidad: 2 },
      { codigo: "MED-045", nombre: "Amoxicilina", cantidad: 1 },
    ],
    estado: "Pendiente",
  },
  {
    numero: "REC-2023-00157",
    fecha: "11/05/2023",
    paciente: "Ana Milena Gómez",
    documento: "52345678",
    medico: "Dr. Carlos Sánchez",
    medicamentos: [
      { codigo: "MED-112", nombre: "Losartán", cantidad: 1 },
      { codigo: "MED-001", nombre: "Acetaminofén", cantidad: 1 },
    ],
    estado: "Pendiente",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  // Configurar fecha actual
  setCurrentDate()

  // Configurar formularios
  setupForms()

  // Configurar funcionalidades de búsqueda
  setupSearch()

  // Cargar datos según la página
  loadPageData()
})

function setCurrentDate() {
  const dateElement = document.getElementById("current-date")
  if (dateElement) {
    const now = new Date()
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    dateElement.textContent = now.toLocaleDateString("es-CO", options)
  }
}

function setupForms() {
  // Formulario de registro de paciente
  const patientForm = document.getElementById("patient-form")
  if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
      e.preventDefault()
      registerPatient(this)
    })
  }

  // Formulario de registro de médico
  const doctorForm = document.getElementById("doctor-form")
  if (doctorForm) {
    doctorForm.addEventListener("submit", function (e) {
      e.preventDefault()
      registerDoctor(this)
    })
  }
}

function setupSearch() {
  // Funcionalidad de búsqueda en tiempo real
  const searchInputs = document.querySelectorAll('[id*="search"]')
  searchInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (window.location.pathname.includes("pacientes.html")) {
        filterPatients()
      } else if (window.location.pathname.includes("medicos.html")) {
        filterDoctors()
      } else if (window.location.pathname.includes("farmacia.html")) {
        filterMedicines()
      }
    })
  })
}

function loadPageData() {
  if (window.location.pathname.includes("pacientes.html")) {
    loadPatients()
    setupPatientFilters()
  } else if (window.location.pathname.includes("medicos.html")) {
    loadDoctors()
  } else if (window.location.pathname.includes("farmacia.html")) {
    loadMedicines()
    loadRecipes()
  }
}

// Funciones para pacientes
function registerPatient(form) {
  const formData = new FormData(form)
  const fechaNacimiento = new Date(formData.get("fechaNacimiento"))
  const edad = new Date().getFullYear() - fechaNacimiento.getFullYear()

  const newPatient = {
    documento: formData.get("documento"),
    nombre: `${formData.get("nombres")} ${formData.get("apellidos")}`,
    edad: edad,
    genero: formData.get("genero") === "M" ? "Masculino" : formData.get("genero") === "F" ? "Femenino" : "Otro",
    eps: formData.get("eps"),
    regimen: formData.get("regimen"),
    ultimaCita: "N/A",
  }

  patients.push(newPatient)
  alert("Paciente registrado exitosamente")
  form.reset()

  // Si estamos en la página de pacientes, recargar la tabla
  if (window.location.pathname.includes("pacientes.html")) {
    loadPatients()
  }
}

function loadPatients() {
  const tbody = document.querySelector("#patients-table tbody")
  if (!tbody) return

  tbody.innerHTML = ""
  patients.forEach((patient) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${patient.documento}</td>
            <td>${patient.nombre}</td>
            <td>${patient.edad}</td>
            <td>${patient.genero}</td>
            <td>${patient.eps}</td>
            <td>${patient.regimen}</td>
            <td>${patient.ultimaCita}</td>
            <td>
                <button class="btn" title="Ver historial" style="margin-right: 0.5rem;">👁️</button>
                <button class="btn btn-primary" title="Editar" style="margin-right: 0.5rem;">✏️</button>
                <button class="btn" style="background-color: #17a2b8; color: white;" title="Nueva cita">📅</button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function setupPatientFilters() {
  const epsFilter = document.getElementById("filter-eps")
  const statusFilter = document.getElementById("filter-status")

  if (epsFilter) {
    epsFilter.addEventListener("change", filterPatients)
  }
  if (statusFilter) {
    statusFilter.addEventListener("change", filterPatients)
  }
}

function filterPatients() {
  const searchTerm = document.getElementById("search-input")?.value.toLowerCase() || ""
  const epsFilter = document.getElementById("filter-eps")?.value || ""

  const tbody = document.querySelector("#patients-table tbody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td")
    const documento = cells[0]?.textContent.toLowerCase() || ""
    const nombre = cells[1]?.textContent.toLowerCase() || ""
    const eps = cells[4]?.textContent || ""

    const matchesSearch = documento.includes(searchTerm) || nombre.includes(searchTerm)
    const matchesEps = !epsFilter || eps === epsFilter

    row.style.display = matchesSearch && matchesEps ? "" : "none"
  })
}

// Funciones para médicos
function registerDoctor(form) {
  const formData = new FormData(form)

  const newDoctor = {
    identificacion: formData.get("identificacion"),
    nombre: `${formData.get("nombres")} ${formData.get("apellidos")}`,
    especialidad: getEspecialidadName(formData.get("especialidad")),
    registro: formData.get("registro"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    estado: getEstadoName(formData.get("estado")),
  }

  doctors.push(newDoctor)
  alert("Médico registrado exitosamente")
  form.reset()

  // Si estamos en la página de médicos, recargar la tabla
  if (window.location.pathname.includes("medicos.html")) {
    loadDoctors()
  }
}

function getEspecialidadName(value) {
  const especialidades = {
    1: "Medicina General",
    2: "Cardiología",
    3: "Pediatría",
    4: "Ortopedia",
    5: "Ginecología",
    6: "Dermatología",
  }
  return especialidades[value] || value
}

function getEstadoName(value) {
  const estados = {
    active: "Activo",
    inactive: "Inactivo",
    vacation: "Vacaciones",
    license: "Licencia",
  }
  return estados[value] || value
}

function loadDoctors() {
  const tbody = document.querySelector("#doctors-table tbody")
  if (!tbody) return

  tbody.innerHTML = ""
  doctors.forEach((doctor) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${doctor.identificacion}</td>
            <td>${doctor.nombre}</td>
            <td>${doctor.especialidad}</td>
            <td>${doctor.registro}</td>
            <td>${doctor.telefono}</td>
            <td>${doctor.email}</td>
            <td><span class="badge" style="${getStatusBadgeStyle(doctor.estado)}">${doctor.estado}</span></td>
            <td>
                <button class="btn" title="Ver perfil" style="margin-right: 0.5rem;">👁️</button>
                <button class="btn btn-primary" title="Editar" style="margin-right: 0.5rem;">✏️</button>
                <button class="btn" style="background-color: #17a2b8; color: white;" title="Horarios">📅</button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function getStatusBadgeStyle(status) {
  const styles = {
    Activo: "background-color: #28a745; color: white;",
    Vacaciones: "background-color: #ffc107; color: #212529;",
    Inactivo: "background-color: #dc3545; color: white;",
    Licencia: "background-color: #6c757d; color: white;",
  }
  return styles[status] || "background-color: #6c757d; color: white;"
}

function filterDoctors() {
  const searchTerm = document.getElementById("search-doctors")?.value.toLowerCase() || ""

  const tbody = document.querySelector("#doctors-table tbody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td")
    const identificacion = cells[0]?.textContent.toLowerCase() || ""
    const nombre = cells[1]?.textContent.toLowerCase() || ""

    const matchesSearch = identificacion.includes(searchTerm) || nombre.includes(searchTerm)
    row.style.display = matchesSearch ? "" : "none"
  })
}

// Funciones para farmacia
function loadMedicines() {
  const tbody = document.querySelector("#medicines-table tbody")
  if (!tbody) return

  tbody.innerHTML = ""
  medicines.forEach((medicine) => {
    const percentage = (medicine.stock / medicine.maxStock) * 100
    const colorClass = getStockColorClass(percentage)

    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${medicine.codigo}</td>
            <td>${medicine.nombre}</td>
            <td>${medicine.principio}</td>
            <td>${medicine.presentacion}</td>
            <td>${medicine.categoria}</td>
            <td>
                <div class="flex align-center">
                    <div class="progress-bar">
                        <div class="progress-fill ${colorClass}" style="width: ${percentage}%;"></div>
                    </div>
                    ${medicine.stock}/${medicine.maxStock}
                </div>
            </td>
            <td>${medicine.vencimiento}</td>
            <td>$${medicine.precio.toLocaleString()}</td>
            <td>
                <button class="btn" title="Ver detalles" style="margin-right: 0.5rem;">👁️</button>
                <button class="btn btn-primary" title="Editar" style="margin-right: 0.5rem;">✏️</button>
                <button class="btn" style="background-color: #17a2b8; color: white;" title="Ajustar stock">📦</button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function getStockColorClass(percentage) {
  if (percentage === 0) return "empty"
  if (percentage <= 25) return "low"
  if (percentage <= 50) return "medium"
  return "high"
}

function loadRecipes() {
  const tbody = document.querySelector("#recipes-table tbody")
  if (!tbody) return

  tbody.innerHTML = ""
  recipes.forEach((recipe) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${recipe.numero}</td>
            <td>${recipe.fecha}</td>
            <td>${recipe.paciente}</td>
            <td>${recipe.documento}</td>
            <td>${recipe.medico}</td>
            <td>${recipe.medicamentos.length}</td>
            <td><span class="badge" style="background-color: #ffc107; color: #212529;">${recipe.estado}</span></td>
            <td>
                <button class="btn btn-primary" title="Procesar" style="margin-right: 0.5rem;" onclick="processRecipe('${recipe.numero}')">✅ Procesar</button>
                <button class="btn" title="Ver receta" onclick="viewRecipe('${recipe.numero}')">📋</button>
            </td>
        `
    tbody.appendChild(row)
  })
}

function processRecipe(recipeNumber) {
  const recipe = recipes.find((r) => r.numero === recipeNumber)
  if (!recipe) return

  let deliveryDetails = `Procesando receta: ${recipe.numero}\n\nMedicamentos a entregar:\n`
  let canDeliver = true
  const deliveryItems = []

  recipe.medicamentos.forEach((item) => {
    const medicine = medicines.find((m) => m.codigo === item.codigo)
    if (medicine) {
      deliveryDetails += `- ${item.nombre}: ${item.cantidad} unidades\n`
      if (medicine.stock >= item.cantidad) {
        deliveryItems.push({ medicine, quantity: item.cantidad })
      } else {
        deliveryDetails += `  ⚠️ Stock insuficiente (Disponible: ${medicine.stock})\n`
        canDeliver = false
      }
    }
  })

  if (canDeliver) {
    deliveryDetails += `\n¿Confirmar entrega?`
    if (confirm(deliveryDetails)) {
      // Actualizar stock
      deliveryItems.forEach((item) => {
        item.medicine.stock -= item.quantity
      })

      // Marcar receta como entregada
      recipe.estado = "Entregada"
      recipe.fechaEntrega = new Date().toLocaleDateString()

      alert("Medicamentos entregados exitosamente")

      // Recargar tablas
      loadMedicines()
      loadRecipes()
    }
  } else {
    alert(deliveryDetails + "\n\nNo se puede procesar la receta debido a stock insuficiente.")
  }
}

function viewRecipe(recipeNumber) {
  const recipe = recipes.find((r) => r.numero === recipeNumber)
  if (!recipe) return

  let details = `RECETA MÉDICA\n\n`
  details += `Número: ${recipe.numero}\n`
  details += `Fecha: ${recipe.fecha}\n`
  details += `Paciente: ${recipe.paciente}\n`
  details += `Documento: ${recipe.documento}\n`
  details += `Médico: ${recipe.medico}\n\n`
  details += `MEDICAMENTOS PRESCRITOS:\n`

  recipe.medicamentos.forEach((item, index) => {
    details += `${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad}\n`
  })

  details += `\nEstado: ${recipe.estado}`
  if (recipe.fechaEntrega) {
    details += `\nFecha de entrega: ${recipe.fechaEntrega}`
  }

  alert(details)
}

function filterMedicines() {
  const searchTerm = document.getElementById("search-medicine")?.value.toLowerCase() || ""

  const tbody = document.querySelector("#medicines-table tbody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td")
    const codigo = cells[0]?.textContent.toLowerCase() || ""
    const nombre = cells[1]?.textContent.toLowerCase() || ""

    const matchesSearch = codigo.includes(searchTerm) || nombre.includes(searchTerm)
    row.style.display = matchesSearch ? "" : "none"
  })
}

function showSection(section) {
  alert('Funcionalidad "' + section + '" en desarrollo')
}

function showNewPatientForm() {
  const form = document.getElementById("patient-form")
  if (form) {
    form.scrollIntoView({ behavior: "smooth" })
  } else {
    alert("Redirigiendo al formulario de nuevo paciente...")
  }
}

function showNewDoctorForm() {
  const form = document.getElementById("doctor-form")
  if (form) {
    form.scrollIntoView({ behavior: "smooth" })
  } else {
    alert("Redirigiendo al formulario de nuevo médico...")
  }
}
