// Lógica del cuestionario. Las preguntas se definen en preguntas.js

const NIVELES = {
  facil:   { nombre: "Fácil",   color: "var(--facil)",   emoji: "🌱", texto: "Empezamos suave, para calentar." },
  medio:   { nombre: "Medio",   color: "var(--medio)",   emoji: "🔥", texto: "Ahora hay que hacer memoria de verdad." },
  dificil: { nombre: "Difícil", color: "var(--dificil)", emoji: "💎", texto: "Solo para expertas en nosotros." },
  final:   { nombre: "Final",   color: "var(--final)",   emoji: "👑", texto: "La más difícil de todas." },
  ultra:   { nombre: "Super Ultra Mega Difícil", color: "var(--ultra)", emoji: "🚨", texto: "Imposible." },
};
const ORDEN = ["facil", "medio", "dificil", "final", "ultra"];

const app = document.getElementById("app");
const preguntas = ORDEN.flatMap(n => PREGUNTAS.filter(p => p.nivel === n));
// Las "ultra" son sorpresa: no se cuentan hasta que aparecen
const visibles = preguntas.filter(p => p.nivel !== "ultra").length;
let indice = 0;
let aciertos = { facil: 0, medio: 0, dificil: 0, final: 0, ultra: 0 };

// ---------- Utilidades ----------

const esperar = ms => new Promise(r => setTimeout(r, ms));

function barajar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapar(texto) {
  const d = document.createElement("div");
  d.textContent = texto;
  return d.innerHTML;
}

// Reemplaza el contenido de la tarjeta y repite la animación de entrada
function pintar(html) {
  app.style.animation = "none";
  app.offsetHeight;
  app.style.animation = "";
  app.innerHTML = html;
}

function confeti(cantidad, simbolos = ["❤️", "💕", "✨", "💖", "🌸"]) {
  for (let i = 0; i < cantidad; i++) {
    const s = document.createElement("span");
    s.className = "confeti";
    s.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = 2 + Math.random() * 2 + "s";
    s.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 5000);
  }
}

// ---------- Pantallas ----------

function inicio() {
  indice = 0;
  aciertos = { facil: 0, medio: 0, dificil: 0, final: 0, ultra: 0 };
  document.body.classList.remove("modo-final", "modo-ultra");
  pintar(`
    <div class="center">
      <span class="corazon">❤️</span>
      <h1>${escapar(CONFIG.titulo)}</h1>
      <p class="muted">Hola, ${escapar(CONFIG.nombreElla)}. He preparado ${visibles} preguntas sobre nuestros viajes y momentos juntos, de más fácil a más difícil. ¿Te atreves?</p>
      <button class="btn" onclick="introNivel()">Empezar</button>
    </div>
  `);
}

function introNivel() {
  if (preguntas[indice].nivel === "final") return introFinal();
  if (preguntas[indice].nivel === "ultra") return introUltra();
  const n = NIVELES[preguntas[indice].nivel];
  pintar(`
    <div class="center intro-nivel">
      <span class="emoji">${n.emoji}</span>
      <h2>Nivel ${n.nombre}</h2>
      <p class="muted">${n.texto}</p>
      <button class="btn" style="background:${n.color}" onclick="mostrarPregunta()">Vamos</button>
    </div>
  `);
}

// Secuencia dramática antes de la pregunta final:
// se apaga la luz, frases de suspense, cuenta atrás y golpe con destello
async function introFinal() {
  document.body.classList.add("modo-final");
  await esperar(900);

  for (const frase of ["Has llegado muy lejos...", "Pero aún queda una pregunta.", "La más difícil de todas."]) {
    pintar(`<div class="center final-frase">${frase}</div>`);
    await esperar(2000);
  }

  for (const num of [3, 2, 1]) {
    pintar(`<div class="center"><span class="cuenta">${num}</span></div>`);
    await esperar(1000);
  }

  const destello = document.createElement("div");
  destello.className = "destello";
  document.body.appendChild(destello);
  setTimeout(() => destello.remove(), 1200);

  pintar(`
    <div class="center intro-final">
      <span class="corona">👑</span>
      <h1 class="titulo-final">Pregunta final</h1>
      <p class="muted">No hay presión... pero esta es la que más importa.</p>
      <button class="btn btn-final" onclick="mostrarPregunta()">Estoy preparada</button>
    </div>
  `);
  app.style.animation = "temblor .5s ease";
  confeti(30, ["✨", "⭐", "👑", "💛"]);
}

// Sorpresa después de la "final": finge que termina, salta la alarma
// y las palabras SUPER ULTRA MEGA DIFÍCIL caen una a una
async function introUltra() {
  pintar(`
    <div class="center">
      <span class="corazon">💖</span>
      <h2>Calculando tu resultado<span class="puntos-carga"></span></h2>
    </div>
  `);
  await esperar(2500);

  // Glitch + alarma
  app.classList.add("glitch");
  const alarma = document.createElement("div");
  alarma.className = "alarma";
  document.body.appendChild(alarma);
  setTimeout(() => alarma.remove(), 2400);
  await esperar(700);

  document.body.classList.remove("modo-final");
  document.body.classList.add("modo-ultra");
  app.classList.remove("glitch");

  for (const frase of ["ESPERA.", "¿De verdad creías que había terminado?", "⚠️ Nivel secreto desbloqueado ⚠️"]) {
    pintar(`<div class="center final-frase texto-glitch">${frase}</div>`);
    await esperar(2000);
  }

  pintar(`
    <div class="center intro-ultra">
      <span class="sirena">🚨</span>
      <h1 class="titulo-ultra" id="titulo-ultra"></h1>
    </div>
  `);
  const titulo = document.getElementById("titulo-ultra");
  for (const palabra of ["SUPER", "ULTRA", "MEGA", "DIFÍCIL"]) {
    await esperar(650);
    const s = document.createElement("span");
    s.className = "palabra";
    s.textContent = palabra;
    titulo.appendChild(s);
    app.style.animation = "none";
    app.offsetHeight;
    app.style.animation = "temblor .35s ease";
  }
  await esperar(500);
  confeti(40, ["🚨", "🔥", "🤯", "💀", "⚡"]);
  titulo.insertAdjacentHTML("afterend", `
    <p class="muted">Solo el 0,0001% de las personas la aciertan.</p>
    <button class="btn btn-ultra" onclick="mostrarPregunta()">Lo voy a intentar</button>
  `);
}

function mostrarPregunta() {
  const p = preguntas[indice];
  const n = NIVELES[p.nivel];
  const correcta = p.opciones[0];
  const opciones = barajar(p.opciones);
  const sorpresa = p.nivel === "ultra";
  const progreso = sorpresa ? 100 : (indice / visibles) * 100;

  pintar(`
    <div class="top">
      <span class="nivel" style="background:${n.color}">${n.nombre}</span>
      <span class="muted">${sorpresa ? "?? / ??" : `${indice + 1} / ${visibles}`}</span>
    </div>
    <div class="barra"><div style="width:${progreso}%"></div></div>
    ${p.foto ? `<img class="foto" src="${escapar(p.foto)}" alt="">` : ""}
    <h2>${escapar(p.pregunta)}</h2>
    <div class="opciones">
      ${opciones.map(o => `<button class="opcion" data-ok="${o === correcta}">${escapar(o)}</button>`).join("")}
    </div>
    <div id="zona-feedback"></div>
  `);

  app.querySelectorAll(".opcion").forEach(btn => {
    btn.addEventListener("click", () => responder(btn, p));
  });
}

function responder(btn, p) {
  const acierto = btn.dataset.ok === "true";
  app.querySelectorAll(".opcion").forEach(b => {
    b.disabled = true;
    if (b.dataset.ok === "true") b.classList.add("correcta");
  });
  if (acierto) {
    aciertos[p.nivel]++;
    confeti(12);
  } else {
    btn.classList.add("incorrecta");
  }

  const ultima = indice === preguntas.length - 1;
  const cambiaNivel = !ultima && preguntas[indice + 1].nivel !== p.nivel;
  const titulo = acierto
    ? ["¡Correcto! 🎉", "¡Eso es! 💕", "¡Muy bien! ✨"][Math.floor(Math.random() * 3)]
    : `Casi... era "${escapar(p.opciones[0])}" 🙈`;

  document.getElementById("zona-feedback").innerHTML = `
    <div class="feedback" style="background:${acierto ? "var(--ok-soft)" : "var(--bad-soft)"}">
      <strong>${titulo}</strong>
      ${p.recuerdo ? `<span>${escapar(p.recuerdo)}</span>` : ""}
    </div>
    <div class="acciones">
      <button class="btn" id="siguiente">${ultima || preguntas[indice + 1].nivel === "ultra" ? "Ver resultado" : "Siguiente"}</button>
    </div>
  `;
  document.getElementById("siguiente").addEventListener("click", () => {
    indice++;
    if (ultima) final();
    else if (cambiaNivel) introNivel();
    else mostrarPregunta();
  });
}

function final() {
  document.body.classList.remove("modo-final", "modo-ultra");
  const total = Object.values(aciertos).reduce((a, b) => a + b, 0);
  const pct = total / preguntas.length;
  const veredicto =
    pct === 1 ? "¡Perfecto! Te sabes nuestra historia de memoria 😍" :
    pct >= 0.7 ? "¡Muy bien! Está claro que prestas atención 💕" :
    pct >= 0.4 ? "Nada mal... aunque habrá que repetir algún viaje para refrescar la memoria 😉" :
    "Uy... ¡parece que tenemos que viajar más para que te acuerdes! 😂";

  pintar(`
    <div class="center">
      <span class="corazon">💖</span>
      <h2>Resultado final</h2>
      <div class="puntos-grandes">${total} / ${preguntas.length}</div>
      <p>${veredicto}</p>
      <div class="resumen">
        ${ORDEN.filter(n => preguntas.some(p => p.nivel === n)).map(n => `
          <div><span>${NIVELES[n].emoji} ${NIVELES[n].nombre}</span>
          <span>${aciertos[n]} / ${preguntas.filter(p => p.nivel === n).length}</span></div>
        `).join("")}
      </div>
      <p class="muted"><em>${escapar(CONFIG.mensajeFinal)}</em></p>
      <button class="btn" onclick="inicio()">Jugar otra vez</button>
    </div>
  `);
  confeti(40);
}

inicio();
