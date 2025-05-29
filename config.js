// Funcionalidades específicas para la página de configuración

document.addEventListener("DOMContentLoaded", () => {
  // Configurar formularios
  setupConfigForms()
})

function setupConfigForms() {
  // Formulario de configuración general
  const generalForm = document.getElementById("general-config-form")
  if (generalForm) {
    generalForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveGeneralConfig()
    })
  }

  // Formulario de configuración del sistema
  const systemForm = document.getElementById("system-config-form")
  if (systemForm) {
    systemForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveSystemConfig()
    })
  }

  // Formulario de configuración de seguridad
  const securityForm = document.getElementById("security-config-form")
  if (securityForm) {
    securityForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveSecurityConfig()
    })
  }

  // Formulario de configuración MIPRES
  const mipresForm = document.getElementById("mipres-config-form")
  if (mipresForm) {
    mipresForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveMipresConfig()
    })
  }
}

function saveGeneralConfig() {
  // Simular guardado de configuración general
  showSuccessMessage("Configuración general actualizada exitosamente")
}

function saveSystemConfig() {
  // Simular guardado de configuración del sistema
  showSuccessMessage("Configuración del sistema actualizada exitosamente")
}

function saveSecurityConfig() {
  // Simular guardado de configuración de seguridad
  showSuccessMessage("Configuración de seguridad actualizada exitosamente")
}

function saveMipresConfig() {
  // Simular guardado de configuración MIPRES
  showSuccessMessage("Configuración MIPRES actualizada exitosamente")
}

function testMipresConnection() {
  // Simular prueba de conexión MIPRES
  const btn = event.target
  const originalText = btn.textContent

  btn.textContent = "Probando..."
  btn.disabled = true

  setTimeout(() => {
    alert(
      "Conexión MIPRES: Exitosa\n\nServidor: Disponible\nAutenticación: Válida\nÚltima sincronización: " +
        new Date().toLocaleString(),
    )
    btn.textContent = originalText
    btn.disabled = false
  }, 2000)
}

function createBackup() {
  // Simular creación de respaldo
  const btn = event.target
  const originalText = btn.textContent

  btn.textContent = "Creando..."
  btn.disabled = true

  setTimeout(() => {
    alert(
      "Respaldo creado exitosamente\n\nArchivo: backup_" +
        new Date().toISOString().split("T")[0] +
        ".sql\nTamaño: 2.3 GB\nUbicación: /backups/",
    )
    btn.textContent = originalText
    btn.disabled = false

    // Actualizar la tabla de respaldos (simulado)
    location.reload()
  }, 3000)
}

function restoreBackup() {
  // Simular restauración de respaldo
  if (confirm("¿Está seguro de que desea restaurar un respaldo? Esta acción sobrescribirá los datos actuales.")) {
    alert(
      "Funcionalidad de restauración en desarrollo.\n\nPor favor, contacte al administrador del sistema para realizar esta operación.",
    )
  }
}

function showSuccessMessage(message) {
  // Crear y mostrar mensaje de éxito
  const alertDiv = document.createElement("div")
  alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 1000;
    `
  alertDiv.textContent = message

  document.body.appendChild(alertDiv)

  // Remover el mensaje después de 3 segundos
  setTimeout(() => {
    document.body.removeChild(alertDiv)
  }, 3000)
}

function showSection(section) {
  alert('Funcionalidad "' + section + '" en desarrollo')
}
