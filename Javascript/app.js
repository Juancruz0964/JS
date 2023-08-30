let nombreUsuario;
let calificaciones = [];

function calcularPromedio(calificaciones) {
    let total = 0;
    for (let i = 0; i < calificaciones.length; i++) {
        total += calificaciones[i];
    }
    return total / calificaciones.length;
}

function promocionaMateria(promedio) {
    if (promedio >= 7) {
        alert("¡Felicitaciones! Usted promocionó la materia.");
    } else {
        alert("Lo siento, no ha promocionado la materia.");
    }
}

function validarNombre(nombre) {
    const letras = /^[A-Za-z\s]+$/;
    return letras.test(nombre);
}

nombreUsuario = prompt("Por favor, ingrese su nombre completo:");

while (!validarNombre(nombreUsuario)) {
    alert("El nombre no puede contener números ni símbolos.");
    nombreUsuario = prompt("Por favor, ingrese su nombre completo:");
}

alert("Bienvenido " + nombreUsuario + "!");

for (let i = 0; i < 5; i++) {
    let nota = prompt("Ingrese su calificación " + (i + 1) + ", o escriba 'Listo' para terminar:");

    if (nota.toUpperCase() === "LISTO") {
        break;
    }

    nota = parseInt(nota);

    while (isNaN(nota) || nota < 1 || nota > 10) {
        alert("Ingrese una nota válida entre 1 y 10.");
        nota = parseInt(prompt("Ingrese su calificación " + (i + 1) + ", o escriba 'Listo' para terminar:"));
    }

    calificaciones.push(nota);
}

const opcion = parseInt(prompt("Seleccione una opción digitando su número:\n1. Calcular Promedio\n2. Verificar Promoción"));

switch (opcion) {
    case 1:
        // Capturar calificaciones y calcular promedio
        const promedio = calcularPromedio(calificaciones);
        alert("El promedio de sus calificaciones es: " + promedio.toFixed(2));
        break;
    case 2:
        // Capturar calificaciones, calcular promedio y verificar promoción
        const promedioVerificacion = calcularPromedio(calificaciones);
        promocionaMateria(promedioVerificacion);
        break;
    default:
        alert("Opción inválida");
}










































/*let nota1 = parseFloat(prompt("Ingrese su primera nota:"));
let nota2 = parseFloat(prompt("Ingrese su segunda nota:"));
let nota3 = parseFloat(prompt("Ingrese su tercera nota:"));

let notasValidas = true;



if (isNaN(nota1) || nota1 > 10){
    alert("Por favor ingrese sus notas correctamente.")
    notasValidas = false
}
if (isNaN(nota2) || nota2 > 10){
    alert("Por favor ingrese sus notas correctamente.")
    notasValidas = false
}
if (isNaN(nota3) || nota3 > 10){
    alert("Por favor ingrese sus notas correctamente.")
    notasValidas = false
}

if (notasValidas){

    let promedio = (nota1 + nota2 + nota3)/3;

    if (promedio >= 7) {
        alert ("Felicitaciones " + nombre + " usted promociono la materia.")
    } else{
    alert("El alumno " + nombre + " no promocionó la materia")
    }
}*/

