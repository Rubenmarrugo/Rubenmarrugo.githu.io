// Funcionalidades específicas para la gestión de pacientes

document.addEventListener("DOMContentLoaded", () => {
  setupPatientSearch()
  setupPatientFilters()
})

function setupPatientSearch() {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterPatients()
    })
  }
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
  const statusFilter = document.getElementById("filter-status")?.value || ""

  const table = document.getElementById("patients-table")
  if (!table) return

  const rows = table.querySelectorAll("tbody tr")

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td")
    const documento = cells[0]?.textContent.toLowerCase() || ""
    const nombre = cells[1]?.textContent.toLowerCase() || ""
    const eps = cells[4]?.textContent || ""

    const matchesSearch = documento.includes(searchTerm) || nombre.includes(searchTerm)
    const matchesEps = !epsFilter || eps === epsFilter
    const matchesStatus = !statusFilter // Implementar lógica de estado si es necesario

    if (matchesSearch && matchesEps && matchesStatus) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

function showNewPatientForm() {
  alert("Redirigiendo al formulario de registro de nuevo paciente...")
}
