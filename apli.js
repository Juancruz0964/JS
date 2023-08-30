let nombreUsuario;
let calificaciones = [];

nombreUsuario = prompt("Por favor, ingrese su nombre completo:");
alert("Bienvenido " + nombreUsuario + "!");

for (let i = 0; i < 3; i++) {
    let nota = parseInt(prompt("Ingrese la calificación " + (i + 1) + ":"));
    calificaciones.push(nota);
}

const opcion = parseInt(prompt("Seleccione una opción:\n1. Calcular Promedio\n2. Verificar Promoción"));

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
