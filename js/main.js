// 1. Manejo del Header al hacer Scroll (Efecto visual)
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 2. CONTROLADOR DEL FORMULARIO (Lógica Omnicanal: WhatsApp + Email)
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    departamento: formData.get("departamento"),
    servicio: formData.get("servicio"),
    canal: formData.get("canal_contacto"), // Captura la elección: whatsapp o email
  };

  // --- ANALYTICS (Se conecta con el ID G-EYPC8MSNZ7 del HTML) ---
  if (typeof gtag === "function") {
    gtag("event", "generate_lead", {
      method: data.canal,
      location: data.departamento,
      service: data.servicio,
    });
  }

  // --- LÓGICA DE ENRUTAMIENTO (OMNICANALIDAD) ---
  const mensajeBase = `Hola Cargotrans, soy *${data.nombre}*. Deseo cotizar el servicio de *${data.servicio}* para el departamento de *${data.departamento}*. Mi correo es: ${data.email}`;

  if (data.canal === "whatsapp") {
    // RUTA A: WhatsApp API
    const urlWA = `https://wa.me/50578113134?text=${encodeURIComponent(mensajeBase)}`;
    window.open(urlWA, "_blank");
  } else {
    // RUTA B: Protocolo SMTP (Correo)
    const asunto = encodeURIComponent(
      `Solicitud de Cotización: ${data.nombre}`,
    );
    const cuerpo = encodeURIComponent(mensajeBase.replace(/\*/g, "")); // Limpia formato de WhatsApp para el correo
    window.location.href = `mailto:ventas@cargotrans.com.ni?subject=${asunto}&body=${cuerpo}`;
  }

  // Feedback visual y Reset de la Vista
  const btn = this.querySelector("button");
  const originalText = btn.innerText;
  btn.innerText = "¡SOLICITUD ENVIADA!";
  btn.disabled = true;

  setTimeout(() => {
    alert(
      `¡Gracias ${data.nombre}! Tu solicitud ha sido procesada vía ${data.canal.toUpperCase()}. Un asesor te contactará para la tasación final.`,
    );
    btn.innerText = originalText;
    btn.disabled = false;
    this.reset();
  }, 1000);
});

// 3. Efectos UX (Aparición suave de tarjetas)
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
