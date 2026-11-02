/* =========================================================
   ✏️  EDITA AQUÍ TUS PREGUNTAS
   ---------------------------------------------------------
   - nivel: "facil", "medio", "dificil", "final" o "ultra" (se ordenan solas)
   - opciones: la PRIMERA es siempre la correcta
     (se barajan automáticamente al mostrarse)
   - recuerdo: mensaje que aparece después de responder
   - foto (opcional): ruta a una imagen, p. ej. "fotos/roma.jpg"
   ========================================================= */
const CONFIG = {
  nombreElla: "mi amor",
  titulo: "¿Cuánto recuerdas de nosotros?",
  mensajeFinal: "Gracias por cada viaje, cada plan y cada momento. Lo mejor de todos estos recuerdos es haberlos vivido contigo. Te quiero ❤️",
};

const PREGUNTAS = [
  // ---------- FÁCIL ----------
  {
    nivel: "facil",
    pregunta: "¿Dónde fue nuestra primera cita?",
    opciones: ["En un minigolf", "En el cine", "En la pista de patinaje del Wanda Metropolitano", "En la bolera"],
    recuerdo: "Todavía me acuerdo de lo nervioso que estaba.",
  },
  {
    nivel: "facil",
    pregunta: "¿A qué ciudad fue nuestro primer viaje juntos?",
    opciones: ["Roma", "París", "Lisboa", "Londres"],
    recuerdo: "El primero de muchos ✈️",
  },
  {
    nivel: "facil",
    pregunta: "¿Qué día es nuestro aniversario?",
    opciones: ["1 de febrero", "2 de abril", "21 de junio", "9 de octubre"],
    recuerdo: "El mejor día del calendario.",
  },
  {
    nivel: "facil",
    pregunta: "¿Donde fue la primera vez que nos besamos?",
    opciones: ["La Riviera", "Mon", "Nuit", "Panda"],
  },

  // ---------- MEDIO ----------
  {
    nivel: "medio",
    pregunta: "¿Qué comimos en la primera comida del viaje a Roma?",
    opciones: ["Pasta carbonara y amatricciana en ollas", "Pizza en Trastevere", "Pasta y pizza en el coliseo", "Macas"],
    recuerdo: "La mejor paaastaaa, sin discusión.",
  },
  {
    nivel: "medio",
    pregunta: "¿A qué concierto fuimos juntos por primera vez?",
    opciones: ["Panorama", "Melendi", "La La Love You", "Fiestas navalafuente"],
  },

  // ---------- DIFÍCIL ----------
  {
    nivel: "dificil",
    pregunta: "¿Cuando te dije te quiero por primera vez?",
    opciones: ["En el coche, despues de la bolera y el hundreds", "En Mon, cuando las gemelas se quedaron boquiabiertas", "En Halloween del año pasado", "En la pista de hielo del Wanda"],
    recuerdo: "Si aciertas esta, tienes memoria de elefante 🐘",
  },
  {
    nivel: "dificil",
    pregunta: "¿Qué fecha pone en el cuadro?",
    opciones: ["19-06-2026", "18-06-2026", "17-06-2026", "16-06-2026"],
  },
  {
    nivel: "dificil",
    pregunta: "¿Quien es mejor jugando a las cartas?",
    opciones: ["Tu novio", "Yo", "Yo no", "Oreo"],
  },

  // ---------- 👑 PREGUNTA FINAL (la más difícil de todas) ----------
  // Va al final, con una animación especial antes de mostrarse
  {
    nivel: "final",
    pregunta: "¿Cuánto te quiero?",
    opciones: ["Más que a nada en el mundo", "Mucho", "Bastante", "Un poquito"],
    recuerdo: "Y cada día un poco más ❤️",
  },

  // ---------- 🚨 SUPER ULTRA MEGA DIFÍCIL (sorpresa) ----------
  // Aparece cuando ella cree que ya ha terminado. No cuenta en el
  // número de preguntas que se anuncia al principio.
  {
    nivel: "ultra",
    pregunta: "¿Quién quiere más a quién?",
    opciones: ["Yo a ti, y .", "Tú a mí", "Empate", "Nadie lo sabe"],
    recuerdo: "Lo siento, esta la gano yo 😌❤️",
  },
];
