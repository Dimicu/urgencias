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
    let nomDefec = "Diego";
    let ape = document.getElementById("ape").value;
    let apeDefe = "Miras Curras";
    let anos = document.getElementById("anos").value;
    let anosDefe = 31;
    let fech = document.getElementById("fecha").value;
    let fechaAHora = new Date();
    let fechaString = fechaAHora.toLocaleString("es-ES");

    let prio = calcularPrioridad();

    let paciente = new Paciente(nom || nomDefec, ape || apeDefe, anos || anosDefe, fech || fechaString, prio);
    listaUx.push(paciente);
}

function calcularPrioridad() {
    let cabeza = document.getElementById("cabeza");
    let corazon = document.getElementById("corazon");
    let torax = document.getElementById("torax");
    let abdomen = document.getElementById("abdomen");
    let pelvis = document.getElementById("pelvis");
    let brazos = document.getElementById("brazos");
    let piernas = document.getElementById("piernas");

    let lesiones = [cabeza.checked, corazon.checked, torax.checked, abdomen.checked, pelvis.checked, brazos.checked, piernas.checked]; //Visto en internet, checkbox.value y checked
    let prioridad = 0;
    let i = 12;

    lesiones.map((element) => {
        i = i - 1;
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
//Me falto esto por implementar, nose como coger el valor del array una vez pintado con el boton
}
function bajarPrio() {
//Me falto esto por implementar, nose como coger el valor del array una vez pintado con el boton
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

