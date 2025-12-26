// Configuración de la API
const API_ENDPOINT = "https://tu-api.com/predict" // Cambiar por tu endpoint real
const SEARCH_ENDPOINT = "https://tu-api.com/search" // Endpoint para búsqueda de clientes

// Elementos del DOM
const navTabs = document.querySelectorAll(".nav-tab")
const form = document.getElementById("churnForm")
const resultCard = document.getElementById("resultCard")
const loading = document.getElementById("loading")
const resultContent = document.getElementById("resultContent")
const errorMessage = document.getElementById("errorMessage")
const submitBtn = document.getElementById("submitBtn")
const resetBtn = document.getElementById("resetBtn")

const searchForm = document.getElementById("searchForm")
const searchBtn = document.getElementById("searchBtn")
const searchError = document.getElementById("searchError")
const searchLoading = document.getElementById("searchLoading")
const searchResult = document.getElementById("searchResult")
const resetSearchBtn = document.getElementById("resetSearchBtn")

// Función para cambiar entre pestañas
navTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const tabName = this.getAttribute("data-tab")
    switchTab(tabName, this)
  })
})

function switchTab(tabName, clickedButton) {
  // Ocultar todas las pestañas
  const tabs = document.querySelectorAll(".tab-content")
  tabs.forEach((tab) => tab.classList.remove("active"))

  // Remover clase active de todos los botones
  navTabs.forEach((btn) => btn.classList.remove("active"))

  // Mostrar pestaña seleccionada
  document.getElementById(tabName).classList.add("active")

  // Agregar clase active al botón clickeado
  clickedButton.classList.add("active")
}

// Manejo del formulario de cálculo manual
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Limpiar mensajes de error previos
  errorMessage.classList.remove("show")
  errorMessage.textContent = ""

  // Mostrar card de resultados con loading
  resultCard.classList.add("show")
  loading.classList.add("show")
  resultContent.style.display = "none"
  submitBtn.disabled = true

  // Recopilar datos del formulario
  const formData = {
    tiempo_contrato_meses: Number.parseInt(document.getElementById("tiempo_contrato_meses").value),
    retrasos_pago: Number.parseInt(document.getElementById("retrasos_pago").value),
    uso_mensual: Number.parseFloat(document.getElementById("uso_mensual").value),
    plan: document.getElementById("plan").value,
  }

  try {
    // Llamada a la API
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Mostrar resultados
    displayResults(data)
  } catch (error) {
    console.error("Error:", error)
    errorMessage.textContent = `Error al conectar con la API: ${error.message}. Verifica que la URL del endpoint esté configurada correctamente.`
    errorMessage.classList.add("show")
    resultCard.classList.remove("show")
  } finally {
    submitBtn.disabled = false
  }
})

function displayResults(data) {
  loading.classList.remove("show")
  resultContent.style.display = "block"

  const previsionElement = document.getElementById("prevision")
  const probabilidadElement = document.getElementById("probabilidad")
  const probabilityBar = document.getElementById("probabilityBar")

  // Mostrar previsión
  previsionElement.textContent = data.prevision || "No disponible"

  // Determinar el riesgo basado en la probabilidad
  const probability = data.probabilidad || 0
  const probabilityPercent = Math.round(probability * 100)

  // Actualizar probabilidad
  probabilidadElement.textContent = `${probabilityPercent}%`
  probabilityBar.style.width = `${probabilityPercent}%`
  probabilityBar.textContent = `${probabilityPercent}%`

  // Aplicar estilos según el riesgo
  if (probability >= 0.7) {
    previsionElement.classList.add("high-risk")
    previsionElement.classList.remove("low-risk")
    probabilityBar.classList.add("high-risk")
    probabilityBar.classList.remove("low-risk")
  } else if (probability <= 0.3) {
    previsionElement.classList.add("low-risk")
    previsionElement.classList.remove("high-risk")
    probabilityBar.classList.add("low-risk")
    probabilityBar.classList.remove("high-risk")
  } else {
    previsionElement.classList.remove("high-risk", "low-risk")
    probabilityBar.classList.remove("high-risk", "low-risk")
  }
}

function resetForm() {
  form.reset()
  resultCard.classList.remove("show")
  resultContent.style.display = "none"
  loading.classList.remove("show")
}

resetBtn.addEventListener("click", resetForm)

// Manejo del formulario de búsqueda
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Limpiar mensajes previos
  searchError.classList.remove("show")
  searchError.textContent = ""
  searchResult.style.display = "none"

  // Mostrar loading
  searchLoading.classList.add("show")
  searchBtn.disabled = true

  const numeroCliente = document.getElementById("numero_cliente").value

  try {
    // Llamada a la API de búsqueda
    const response = await fetch(`${SEARCH_ENDPOINT}?client_id=${numeroCliente}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Cliente no encontrado: ${response.status}`)
    }

    const data = await response.json()
    displaySearchResults(data, numeroCliente)
  } catch (error) {
    console.error("Error:", error)
    searchError.textContent = `Error al buscar el cliente: ${error.message}. Verifica que el número de cliente sea correcto.`
    searchError.classList.add("show")
  } finally {
    searchLoading.classList.remove("show")
    searchBtn.disabled = false
  }
})

function displaySearchResults(data, clientId) {
  searchResult.style.display = "block"

  // Mostrar información del cliente
  document.getElementById("client_id").textContent = clientId
  document.getElementById("client_tiempo").textContent = `${data.tiempo_contrato_meses} meses`
  document.getElementById("client_retrasos").textContent = data.retrasos_pago
  document.getElementById("client_uso").textContent = data.uso_mensual
  document.getElementById("client_plan").textContent = data.plan

  // Mostrar predicción
  const previsionElement = document.getElementById("search_prevision")
  const probabilidadElement = document.getElementById("search_probabilidad")
  const probabilityBar = document.getElementById("search_probabilityBar")

  previsionElement.textContent = data.prevision || "No disponible"

  const probability = data.probabilidad || 0
  const probabilityPercent = Math.round(probability * 100)

  probabilidadElement.textContent = `${probabilityPercent}%`
  probabilityBar.style.width = `${probabilityPercent}%`
  probabilityBar.textContent = `${probabilityPercent}%`

  // Aplicar estilos según el riesgo
  if (probability >= 0.7) {
    previsionElement.classList.add("high-risk")
    previsionElement.classList.remove("low-risk")
    probabilityBar.classList.add("high-risk")
    probabilityBar.classList.remove("low-risk")
  } else if (probability <= 0.3) {
    previsionElement.classList.add("low-risk")
    previsionElement.classList.remove("high-risk")
    probabilityBar.classList.add("low-risk")
    probabilityBar.classList.remove("high-risk")
  } else {
    previsionElement.classList.remove("high-risk", "low-risk")
    probabilityBar.classList.remove("high-risk", "low-risk")
  }
}

function resetSearch() {
  searchForm.reset()
  searchResult.style.display = "none"
  searchError.classList.remove("show")
}

resetSearchBtn.addEventListener("click", resetSearch)

// Modo demo: descomentar para simular respuesta de API si no hay endpoint configurado
/*
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    resultCard.classList.add('show');
    loading.classList.add('show');
    resultContent.style.display = 'none';
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Datos de prueba
    const mockData = {
        prevision: "Va a cancelar",
        probabilidad: 0.81
    };
    
    displayResults(mockData);
});
*/
