// Configuración de autenticación
const AUTH_API_ENDPOINT = "https://tu-api.com/auth/login" // Cambiar por tu endpoint real
const GOOGLE_AUTH_ENDPOINT = "https://tu-api.com/auth/google" // Endpoint para Google OAuth

// Elementos del DOM
const loginForm = document.getElementById("loginForm")
const loginBtn = document.getElementById("loginBtn")
const googleBtn = document.getElementById("googleBtn")
const errorMessage = document.getElementById("errorMessage")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const rememberCheckbox = document.getElementById("remember")

// Manejo del formulario de login con email
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Limpiar mensajes de error
  hideError()

  // Deshabilitar botón y mostrar spinner
  loginBtn.disabled = true
  loginBtn.classList.add("loading")

  // Recopilar datos del formulario
  const loginData = {
    email: emailInput.value.trim(),
    password: passwordInput.value,
    remember: rememberCheckbox.checked,
  }

  try {
    // Llamada a la API de autenticación
    const response = await fetch(AUTH_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Credenciales incorrectas")
    }

    const data = await response.json()

    // Guardar token si es necesario
    if (data.token) {
      if (loginData.remember) {
        localStorage.setItem("authToken", data.token)
      } else {
        sessionStorage.setItem("authToken", data.token)
      }
    }

    // Redirigir a la aplicación
    window.location.href = "index.html" // O la ruta de tu aplicación
  } catch (error) {
    console.error("Error de autenticación:", error)
    showError(error.message || "Error al iniciar sesión. Verifica tus credenciales.")
  } finally {
    loginBtn.disabled = false
    loginBtn.classList.remove("loading")
  }
})

// Manejo del botón de Google
googleBtn.addEventListener("click", async () => {
  try {
    // Opción 1: Redirigir a endpoint OAuth de Google
    window.location.href = GOOGLE_AUTH_ENDPOINT

    // Opción 2: Si usas Google Sign-In con JavaScript
    // Necesitarías incluir la librería de Google y configurar el cliente
  } catch (error) {
    console.error("Error con Google Sign-In:", error)
    showError("Error al conectar con Google. Intenta nuevamente.")
  }
})

// Funciones auxiliares
function showError(message) {
  errorMessage.textContent = message
  errorMessage.classList.add("show")
}

function hideError() {
  errorMessage.classList.remove("show")
  errorMessage.textContent = ""
}

// Verificar si ya hay sesión activa
function checkExistingSession() {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

  if (token) {
    // Verificar si el token es válido
    // Si es válido, redirigir a la aplicación
    // window.location.href = "index.html";
  }
}

// Verificar sesión al cargar la página
checkExistingSession()

// MODO DEMO: Descomentar para simular login sin backend
/*
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  hideError();
  loginBtn.disabled = true;
  loginBtn.classList.add("loading");
  
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Simulación simple de validación
  if (email === "demo@example.com" && password === "demo123") {
    // Login exitoso
    sessionStorage.setItem("authToken", "demo-token-123");
    window.location.href = "index.html";
  } else {
    showError("Credenciales incorrectas. Usa: demo@example.com / demo123");
    loginBtn.disabled = false;
    loginBtn.classList.remove("loading");
  }
});

googleBtn.addEventListener("click", async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  sessionStorage.setItem("authToken", "google-demo-token");
  window.location.href = "index.html";
});
*/
