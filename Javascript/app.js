
let nombre = prompt("Por favor, ingrese su nombre completo:");
alert ("Bienvenido "+ nombre + "!");



let nota1 = parseFloat(prompt("Ingrese su primera nota:"));
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
