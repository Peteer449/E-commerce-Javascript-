const nombre=prompt("Pone tu nombre")
const impuestoGanancias = 0.35
const impuestoPais = 0.3
let productos = [{
    id:1,
    juego:"Call of duty",
    precio: 1200
},
{
    id:2,
    juego:"Cyberpunk",
    precio:2500
},
{
    id:3,
    juego:"Juanito y los clonosaurios",
    precio:600
},
{
    id:4,
    juego:"Putting challenge",
    precio:200
},
{
    id:5,
    juego:"God of war",
    precio:5000
}]



/*Carrito y compra*/
const productosHTML = document.getElementById("productos")
const cantidadDeProductosHTML = document.getElementById("cantidadDeproductosEnElCarrito")
const carritoHTML= document.getElementById("carrito")
const totalSteamHTML = document.getElementById("totalSteam")
const totalRealHTML = document.getElementById("totalReal")
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
let precioTotal = 0
let precioTotalReal = 0
let idDelCarrito = 0

const agregarAlCarrito = (id) => {
    const producto = productos.find(element => element.id == id)
    idDelCarrito++
    precioTotal += producto.precio
    precioTotalReal += producto.precioReal
    cantidadDeProductosHTML.innerHTML++
    carritoHTML.innerHTML +=`
    <div id="${idDelCarrito}" class="d-flex flex-wrap">
    <hr class="col-12">
        <div class="col-11">${producto.juego}</div> 
        <button type="button" class="btn-danger col-1" onclick="sacarDelCarrito(${producto.id},${idDelCarrito})">
            X
        </button>
    <hr class="col-12">
    </div>
    `
    totalSteamHTML.innerHTML = precioTotal
    totalRealHTML.innerHTML = precioTotalReal
    alertPlaceholder.innerHTML = `<div class="alert alert-success alert-dismissible fixed-bottom" role="alert"> Agregaste ${producto.juego} al carrito! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
}

const sacarDelCarrito = (id, idCarrito) => {
    const producto = productos.find(element => element.id == id)
    precioTotal -= producto.precio
    precioTotalReal -= producto.precioReal
    cantidadDeProductosHTML.innerHTML--
    document.getElementById(idCarrito).innerHTML=null
    totalSteamHTML.innerHTML = precioTotal
    totalRealHTML.innerHTML = precioTotalReal
}

const comprar = () => {
    if(precioTotalReal===0){
        alert(`Dale ${nombre}, compra algo`)
    }else{
        alert(`Felicidades ${nombre}, compraste jueguitos, gastaste $${precioTotalReal} de veras`)
        carritoHTML.innerHTML=null
        cantidadDeProductosHTML.innerHTML=0
        totalSteamHTML.innerHTML = 0
        totalRealHTML.innerHTML = 0
        precioTotal=0
        precioTotalReal=0
    }
}

/*Termina carrito y compra*/


/*Crear la pagina al iniciar*/
let acumuladorDeHTML=''

const agregarPreciosReales = () => {
    productos.forEach(element => {
        element.precioReal = element.precio * impuestoPais + element.precio * impuestoGanancias + element.precio
    })
}

const ponerProductosEnHTML = (objeto) => {
    objeto.forEach(element =>{
        acumuladorDeHTML += `<div id="${element.id}" class="col-3 d-flex flex-wrap border border-dark border-3 rounded-2 p-3">
            <h2 class="row-4 col-12">${element.juego}</h2>
            <div class="row-4 col-12">
                <h4>precio Steam: ${element.precio}</h4>
                <h4>precio real: ${element.precioReal}</h4>
            </div>
            <button type="button" class="btn btn-primary row-4 col-12 align-self-end" onclick="agregarAlCarrito(${element.id})">Agregar</button>
        </div>`
    })
    productosHTML.innerHTML=acumuladorDeHTML
}

/*Termina crear la pagina al iniciar */


/*Ordenar productos*/
const botonMayorAMenor = document.getElementById("boton--mayor-a-menor")
const botonMenorAMayor = document.getElementById("boton--menor-a-mayor")
const botonDefault = document.getElementById("boton--default")
const ordenados = document.getElementById("ordenados")

botonDefault.onclick = () => {
    acumuladorDeHTML = ""
    if(acumuladorDeNoFiltrados.length>=1){
        acumuladorDeNoFiltrados.sort(function (a,b) {
            if (a.id>b.id){return 1}
            if(a.id<b.id){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(acumuladorDeNoFiltrados)
    }
    else{
        productos.sort(function (a,b) {
            if (a.id>b.id){return 1}
            if(a.id<b.id){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(productos)
    }
    ordenados.innerHTML="Default"
}

botonMenorAMayor.onclick = () => {
    acumuladorDeHTML = ""
    if(acumuladorDeNoFiltrados.length>=1){
        acumuladorDeNoFiltrados.sort(function (a,b) {
            if (a.precio>b.precio){return 1}
            if(a.precio<b.precio){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(acumuladorDeNoFiltrados)
    }
    else{
        productos.sort(function (a,b) {
            if (a.precio>b.precio){return 1}
            if(a.precio<b.precio){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(productos)
    }
    ordenados.innerHTML = "Menor a mayor"
}

botonMayorAMenor.onclick = () => {
    acumuladorDeHTML = ""
    if(acumuladorDeNoFiltrados.length>=1){
        acumuladorDeNoFiltrados.sort(function (a,b) {
            if (a.precio<b.precio){return 1}
            if(a.precio>b.precio){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(acumuladorDeNoFiltrados)
    }
    else{
        productos.sort(function (a,b) {
            if (a.precio<b.precio){return 1}
            if(a.precio>b.precio){return -1}
            else {return 0}
        })
        ponerProductosEnHTML(productos)
    }
    ordenados.innerHTML="Mayor a menor"
}

/*Termina ordenar productos*/


/*Filtro de precios*/

const filtroMaximo = document.getElementById("maximo")
filtroMaximo.addEventListener("change",filtrar)
let acumuladorDeFiltrados = []
let acumuladorDeNoFiltrados = []

function filtrar (e) {
    acumuladorDeHTML = ""
    acumuladorDeFiltrados=[]
    acumuladorDeNoFiltrados=[]
    let precioQueIngresoElUsuario = e.target.value
    productos.map(element => {
        element.precio <= precioQueIngresoElUsuario?acumuladorDeNoFiltrados.push(element):acumuladorDeFiltrados.push(element)
    })
    ponerProductosEnHTML(acumuladorDeNoFiltrados)
}

const botonBorrarFiltro = document.getElementById("boton--borrar-filtro")
botonBorrarFiltro.onclick = () => {
    acumuladorDeNoFiltrados=[]
    filtroMaximo.value=""
    acumuladorDeHTML=""
    ponerProductosEnHTML(productos)
}

/*Termina filtro de precios*/


document.getElementById("saludo").innerHTML=`<h1 class="text-center">Bienvenido ${nombre}!</h1>`

agregarPreciosReales()
ponerProductosEnHTML(productos)