// 1. Manejo del Header al hacer Scroll
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 2. Manejo del Formulario (Captura de Leads)
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtenemos los datos incluyendo el nuevo campo de departamento
  const formData = new FormData(this);
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    departamento: formData.get("departamento"), // Captura el departamento seleccionado
    servicio: formData.get("servicio"),
  };

  console.log("Datos capturados para el análisis de Marketing:", data);

  // Feedback visual al usuario
  const btn = this.querySelector("button");
  const originalText = btn.innerText;

  btn.innerText = "ENVIANDO...";
  btn.disabled = true;

  // Simulación de respuesta del servidor usando el departamento en el mensaje
  setTimeout(() => {
    alert(
      `¡Gracias ${data.nombre}! Hemos registrado tu solicitud para el departamento de ${data.departamento}. Un asesor de Cargotrans te contactará pronto.`,
    );
    btn.innerText = originalText;
    btn.disabled = false;
    this.reset();
  }, 1500);
});

// 3. Efecto de aparición suave para las tarjetas (Opcional - UX)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100");
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".stat-card").forEach((card) => {
  card.style.transform = "translateY(20px)";
  card.classList.add("transition-all", "duration-700", "opacity-0");
  observer.observe(card);
});
