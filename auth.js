// Sistema de autenticación
const AUTH_STORAGE_KEY = "gesmed_user"

// Usuarios de prueba
const testUsers = {
  admin: { password: "admin123", role: "admin", name: "Administrador" },
  medico: { password: "medico123", role: "doctor", name: "Dr. Médico" },
  farmacia: { password: "farmacia123", role: "pharmacy", name: "Farmacéutico" },
}

// Verificar autenticación al cargar la página
function checkAuth() {
  const currentPage = window.location.pathname
  const isLoginPage = currentPage.includes("login.html")
  const user = getCurrentUser()

  if (!user && !isLoginPage) {
    window.location.href = "login.html"
    return false
  }

  if (user && isLoginPage) {
    window.location.href = "index.html"
    return false
  }

  return true
}

// Obtener usuario actual
function getCurrentUser() {
  const userData = localStorage.getItem(AUTH_STORAGE_KEY)
  return userData ? JSON.parse(userData) : null
}

// Función de login
function login(username, password) {
  const user = testUsers[username]

  if (user && user.password === password) {
    const userData = {
      username: username,
      role: user.role,
      name: user.name,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData))
    return true
  }

  return false
}

// Función de logout
function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  window.location.href = "login.html"
}

// Event listener para el formulario de login
document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  checkAuth()

  // Configurar formulario de login si existe
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value
      const loginBtn = document.getElementById("login-btn")

      // Mostrar estado de carga
      loginBtn.textContent = "Iniciando sesión..."
      loginBtn.disabled = true

      // Simular delay de autenticación
      setTimeout(() => {
        if (login(username, password)) {
          window.location.href = "index.html"
        } else {
          alert("Usuario o contraseña incorrectos")
          loginBtn.textContent = "Iniciar Sesión"
          loginBtn.disabled = false
        }
      }, 1000)
    })
  }

  // Mostrar información del usuario en páginas autenticadas
  const user = getCurrentUser()
  if (user && !window.location.pathname.includes("login.html")) {
    // Aquí podrías mostrar el nombre del usuario en algún lugar de la interfaz
    console.log("Usuario logueado:", user.name)
  }
})
