// --- CONFIGURACIÓN DE RAMOS Y PRERREQUISITOS ---
const ramos = [
  // SEMESTRE 1
  {nombre:"Pensamiento y Actualidad Económica", prereq:[]},
  {nombre:"Introducción a la Economía", prereq:[]},
  {nombre:"Álgebra", prereq:[]},
  {nombre:"Introducción al Management", prereq:[]},
  {nombre:"Comunicación Escrita", prereq:[]},
  {nombre:"Comunicación Oral", prereq:[]},
  {nombre:"Taller Mi Primer Año UDD", prereq:[]},
  {nombre:"CELE 1", prereq:[]},

  // SEMESTRE 2
  {nombre:"Contabilidad I", prereq:[]},
  {nombre:"Cálculo", prereq:["Álgebra"]},
  {nombre:"Business Tech", prereq:[]},
  {nombre:"Macroeconomía", prereq:["Introducción a la Economía"]},
  {nombre:"Lectura Crítica", prereq:[]},
  {nombre:"Pensamiento Crítico", prereq:[]},
  {nombre:"CELE 2", prereq:[]},
  {nombre:"Inglés A2-", prereq:[]},

  // SEMESTRE 3
  {nombre:"Comportamiento Organizacional", prereq:["Introducción al Management"]},
  {nombre:"Microeconomía", prereq:["Introducción a la Economía","Cálculo"]},
  {nombre:"Contabilidad II", prereq:["Contabilidad I"]},
  {nombre:"Desarrollo Profesional I", prereq:["Comunicación Escrita","Comunicación Oral","Taller Mi Primer Año UDD","Lectura Crítica","Pensamiento Crítico"]},
  {nombre:"Probabilidades e Inferencia", prereq:["Cálculo"]},
  {nombre:"CELE 3", prereq:[]},
  {nombre:"Inglés A2+", prereq:["Inglés A2-"]},

  // SEMESTRE 4
  {nombre:"Derecho y Empresa", prereq:["Introducción al Management"]},
  {nombre:"Marketing I", prereq:["Introducción al Management","Inglés A2-"]},
  {nombre:"Ética de los Negocios", prereq:["Introducción al Management"]},
  {nombre:"Emprender con Impacto", prereq:["Introducción al Management"]},
  {nombre:"Herramientas para el Análisis de Datos", prereq:["Probabilidades e Inferencia"]},
  {nombre:"Métodos Estadísticos", prereq:["Probabilidades e Inferencia"]},
  {nombre:"Semana i", prereq:["Contabilidad I","Cálculo","Business Tech","Macroeconomía","Pensamiento Crítico"]},
  {nombre:"Pasantía de Verano", prereq:[]},
        
  // SEMESTRE 5
  {nombre:"Organizaciones Ágiles", prereq:["Introducción al Management"]},
  {nombre:"Business Innovation Technologies", prereq:["Business Tech"]},
  {nombre:"Finanzas", prereq:["Contabilidad II"]},
  {nombre:"Competencia y Mercados", prereq:["Microeconomía"]},
  {nombre:"Estrategia de Visualización de Datos", prereq:["Herramientas para el Análisis de Datos","Métodos Estadísticos"]},
  {nombre:"CELE 4", prereq:[]},
  {nombre:"Inglés B1-", prereq:["Inglés A2+"]},
      
  // SEMESTRE 6
  {nombre:"Estrategia", prereq:["Microeconomía","Marketing I","Finanzas","Inglés B1-"]},
  {nombre:"Marketing II", prereq:["Marketing I"]},
  {nombre:"Emprendimiento Innovador", prereq:["Emprender con Impacto"]},
  {nombre:"Desarrollo Profesional II", prereq:["Desarrollo Profesional I"]},
  {nombre:"Finanzas Corporativas", prereq:["Finanzas"]},
  {nombre:"Proyecto de Análisis de Datos", prereq:["Estrategia de Visualización de Datos"]},
  {nombre:"Inglés B1+", prereq:["Inglés B1-"]},
  {nombre:"CELE 5", prereq:[]}
];

// --- COLORES PASTELES (ROSADOS Y MORADOS) POR SEMESTRE ---
const colores = [
  "#f3d1f4", // pastel rosado
  "#e5d4f6", // pastel lila
  "#f9e0f7", // rosado más claro
  "#e6d7f7", // lila grisáceo
  "#f6d8e7", // rosa suave
  "#e8d9f4", // lila suave
  "#f5e2f7", // rosado lavanda
  "#ead7f6"  // pastel morado
];

// --- CARGAR Y GUARDAR PROGRESO ---
const aprobados = new Set(JSON.parse(localStorage.getItem("aprobadosRamos") || "[]"));

function guardarProgreso() {
  localStorage.setItem("aprobadosRamos", JSON.stringify([...aprobados]));
}

// --- RENDERIZADO DE LA MALLA ---
const mallaDiv = document.getElementById("malla");

function render() {
  mallaDiv.innerHTML = "";
  let semestreActual = 1;
  let colorIndex = 0;
  let semestreDiv;

  ramos.forEach((ramo, i) => {
    if (i % 8 === 0) {
      semestreDiv = document.createElement("div");
      semestreDiv.classList.add("semestre");
      semestreDiv.style.background = colores[colorIndex % colores.length];
      semestreDiv.innerHTML = `<h2>${semestreActual}° Semestre</h2>`;
      mallaDiv.appendChild(semestreDiv);
      semestreActual++;
      colorIndex++;
    }

    const div = document.createElement("div");
    div.className = "ramo";

    // Estado bloqueado si no tiene todos los prerrequisitos aprobados
    if (!ramo.prereq.every(pr => aprobados.has(pr))) {
      div.classList.add("bloqueado");
    }

    // Estado aprobado si ya está en el set
    if (aprobados.has(ramo.nombre)) {
      div.classList.add("aprobado");
    }

    div.textContent = ramo.nombre;

    div.addEventListener("click", () => {
      if (!div.classList.contains("bloqueado")) {
        if (aprobados.has(ramo.nombre)) {
          aprobados.delete(ramo.nombre);
        } else {
          aprobados.add(ramo.nombre);
        }
        guardarProgreso();
        render();
      }
    });

    semestreDiv.appendChild(div);
  });
}

// --- INICIALIZAR ---
render();
