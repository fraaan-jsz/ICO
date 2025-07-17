document.addEventListener("DOMContentLoaded", () => {
  // --- BORRAR PROGRESO DE VERSIONES ANTERIORES (RESET AUTOMÁTICO) ---
  localStorage.removeItem("aprobadosRamos");

  // --- RAMOS AGRUPADOS POR SEMESTRE ---
  const semestres = [
    {
      nombre: "1° Semestre",
      ramos: [
        {nombre:"Pensamiento y Actualidad Económica", prereq:[]},
        {nombre:"Introducción a la Economía", prereq:[]},
        {nombre:"Álgebra", prereq:[]},
        {nombre:"Introducción al Management", prereq:[]},
        {nombre:"Comunicación Escrita", prereq:[]},
        {nombre:"Comunicación Oral", prereq:[]},
        {nombre:"Taller Mi Primer Año UDD", prereq:[]},
        {nombre:"CELE 1", prereq:[]}
      ]
    },
    {
      nombre: "2° Semestre",
      ramos: [
        {nombre:"Contabilidad I", prereq:[]},
        {nombre:"Cálculo", prereq:["Álgebra"]},
        {nombre:"Business Tech", prereq:[]},
        {nombre:"Macroeconomía", prereq:["Introducción a la Economía"]},
        {nombre:"Lectura Crítica", prereq:[]},
        {nombre:"Pensamiento Crítico", prereq:[]},
        {nombre:"CELE 2", prereq:[]},
        {nombre:"Inglés A2-", prereq:[]}
      ]
    },
    {
      nombre: "3° Semestre",
      ramos: [
        {nombre:"Comportamiento Organizacional", prereq:["Introducción al Management"]},
        {nombre:"Microeconomía", prereq:["Introducción a la Economía","Cálculo"]},
        {nombre:"Contabilidad II", prereq:["Contabilidad I"]},
        {nombre:"Desarrollo Profesional I", prereq:["Comunicación Escrita","Comunicación Oral","Taller Mi Primer Año UDD","Lectura Crítica","Pensamiento Crítico"]},
        {nombre:"Probabilidades e Inferencia", prereq:["Cálculo"]},
        {nombre:"CELE 3", prereq:[]},
        {nombre:"Inglés A2+", prereq:["Inglés A2-"]}
      ]
    },
    {
      nombre: "4° Semestre",
      ramos: [
        {nombre:"Derecho y Empresa", prereq:["Introducción al Management"]},
        {nombre:"Marketing I", prereq:["Introducción al Management","Inglés A2-"]},
        {nombre:"Ética de los Negocios", prereq:["Introducción al Management"]},
        {nombre:"Emprender con Impacto", prereq:["Introducción al Management"]},
        {nombre:"Herramientas para el Análisis de Datos", prereq:["Probabilidades e Inferencia"]},
        {nombre:"Métodos Estadísticos", prereq:["Probabilidades e Inferencia"]},
        {nombre:"Semana i", prereq:["Contabilidad I","Cálculo","Business Tech","Macroeconomía","Pensamiento Crítico"]},
        {nombre:"Pasantía de Verano", prereq:[]}
      ]
    },
    {
      nombre: "5° Semestre",
      ramos: [
        {nombre:"Organizaciones Ágiles", prereq:["Introducción al Management"]},
        {nombre:"Business Innovation Technologies", prereq:["Business Tech"]},
        {nombre:"Finanzas", prereq:["Contabilidad II"]},
        {nombre:"Competencia y Mercados", prereq:["Microeconomía"]},
        {nombre:"Estrategia de Visualización de Datos", prereq:["Herramientas para el Análisis de Datos","Métodos Estadísticos"]},
        {nombre:"CELE 4", prereq:[]},
        {nombre:"Inglés B1-", prereq:["Inglés A2+"]}
      ]
    },
    {
      nombre: "6° Semestre",
      ramos: [
        {nombre:"Estrategia", prereq:["Microeconomía","Marketing I","Finanzas","Inglés B1-"]},
        {nombre:"Marketing II", prereq:["Marketing I"]},
        {nombre:"Emprendimiento Innovador", prereq:["Emprender con Impacto"]},
        {nombre:"Desarrollo Profesional II", prereq:["Desarrollo Profesional I"]},
        {nombre:"Finanzas Corporativas", prereq:["Finanzas"]},
        {nombre:"Proyecto de Análisis de Datos", prereq:["Estrategia de Visualización de Datos"]},
        {nombre:"Inglés B1+", prereq:["Inglés B1-"]},
        {nombre:"CELE 5", prereq:[]}
      ]
    }
  ];

  // --- COLORES PASTELES ---
  const colores = ["#f3d1f4","#e5d4f6","#f9e0f7","#e6d7f7","#f6d8e7","#e8d9f4","#f5e2f7","#ead7f6"];

  const aprobados = new Set();
  function guardarProgreso() {
    localStorage.setItem("aprobadosRamos", JSON.stringify([...aprobados]));
  }

  const mallaDiv = document.getElementById("malla");

  function render() {
    mallaDiv.innerHTML = "";
    semestres.forEach((sem, i) => {
      const semestreDiv = document.createElement("div");
      semestreDiv.classList.add("semestre");
      semestreDiv.style.background = colores[i % colores.length];
      semestreDiv.innerHTML = `<h2>${sem.nombre}</h2>`;

      sem.ramos.forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";

        if (!ramo.prereq.every(pr => aprobados.has(pr))) {
          div.classList.add("bloqueado");
        }

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

      mallaDiv.appendChild(semestreDiv);
    });
  }

  render();
});
