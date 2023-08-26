let nombreUsuario;
let calificaciones = [];


nombreUsuario = prompt("Por favor, ingrese su nombre completo:");
alert ("Bienvenido "+ nombre + "!");

for (let i = 0; i < 3; i++) {
    let nota = parseInt(prompt("Ingrese la calificación " + (i + 1) + ":"));
    calificaciones.push(nota);
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
}
/*