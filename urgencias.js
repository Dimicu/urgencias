class Paciente {

    constructor(nom, ape, anos, hra, prio) {
        this.nombre = nom;
        this.apellidos = ape;
        this.edad = anos;
        this.horaEntrada = hra;
        this.prioridad = prio;
    };

    toString() {
        return "Nombre: " + this.nombre + " | " + "Apellidos: " + this.apellidos + " | " + "Edad: " + this.edad + " | " + " Fecha_Entrada: " + this.horaEntrada + " | " + "Prioridad: " + this.prioridad;
    }
}

let listaUx = [];

function crearPaciente() {
    let nom = document.getElementById("nom").value;
    let ape = document.getElementById("ape").value;
    let anos = document.getElementById("anos").value;
    let fech = document.getElementById("fecha").value;
    let prio = calcularPrioridad();

    let paciente = new Paciente(nom, ape, anos, fech, prio);
    listaUx.push(paciente);
}

function calcularPrioridad() {
    let cabeza = document.getElementById("cabeza");
    let corazon = document.getElementById("corazon");
    let tronco = document.getElementById("tronco");
    let brazos = document.getElementById("brazos");
    let piernas = document.getElementById("piernas");

    let lesiones = [cabeza.checked, corazon.checked, tronco.checked, brazos.checked, piernas.checked]; //Visto en internet, checkbox.value y checked
    let prioridad = 0;
    let i = 12;

    lesiones.map((element) => {
        i = i - 2;
        if (element) { prioridad = prioridad + i };

    })

    return prioridad;
}
/*------------------------------------------------------CAMBIOS EN PRIO Y TABLA----------------------------------------------------------- */
function ordenarListaUx() {
    listaUx.sort((a, b) => b.prioridad - a.prioridad);
}

/*Intervalo para actulizacion de la tabla */
let intervalo1;
let intervalo2;
function actualizarTabla() {
    intervalo1 = setInterval(mostrarTablaUx, 5000);

}
function actualizarLista() {

    intervalo2 = setInterval(mostrarListaUx, 5000);
}

function parar() {
    clearInterval(intervalo1);
    clearInterval(intervalo2);
}



function subirPrio() {
   
}
function bajarPrio() {
   
}
/*------------------------------------------------------------------------------------------------------------------------------------------ */
function mostrarListaUx() {

    ordenarListaUx();

    let listaUl = document.getElementById("listaPac");
    while (listaUl.firstChild) { //Visto en internet
        listaUl.removeChild(listaUl.firstChild) //Visto en internet
    }


    listaUx.forEach((element) => {
        let texto = element.toString();
        let contenido = document.createTextNode(texto);//Visto en chatGpt
        let linea = document.createElement("li");
        linea.appendChild(contenido);
        listaUl.appendChild(linea);

    })

}

function mostrarTablaUx() {

    ordenarListaUx();


    let espacio = document.getElementById("espacioTabla");
    espacio.innerHTML = "";
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tablaPac");
    tabla.setAttribute("border", "solid 1px")


    //botonArriba.setAttribute("onclick", "FUNCION ORDENAR ARRIBA");


    //botonArriba.setAttribute("onclick", "FUNCION ORDENAR ABAJO");


    let fila = "";
    let celda = "";
    espacio.appendChild(tabla);


    listaUx.forEach(element => {

        fila = tabla.insertRow(-1);
        let valoresElemento = Object.values(element); //Visto en otro ejercicio previo, sacado de internet.
        for (i = 0; i < valoresElemento.length; i++) {
            celda = fila.insertCell(-1);
            celda.innerHTML = valoresElemento[i];

        }

        /*Tuve que ver como poner un boton en las dos ultimas de cada fila con GPT
        Yo lo definia fuera del bucle y lo creaba en cada vuelta, pero solo aparecia en 
        la ultima fila, y es porque un objeto DOM solo puede tener un unico padre, lo que movia los botones de fila en 
        fila hasta quedarse en la ultima.
        Ahora si los defino dentro del bucle, son como objetos nuevos hijos de cada celda
        */
        celda = fila.insertCell(-1);
        let botonArriba = document.createElement("button");
        botonArriba.setAttribute("id", "botonArriba");
        botonArriba.setAttribute("type", "button");
        botonArriba.innerText = "Arriba";
        celda.appendChild(botonArriba);

        celda = fila.insertCell(-1);
        let botonAbajo = document.createElement("button");
        botonAbajo.setAttribute("id", "botonAbajo");
        botonAbajo.innerText = "Abajo";
        celda.appendChild(botonAbajo);

    });
}

