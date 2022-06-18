const nombre=prompt("Pone tu nombre")
const impuestoGanancias = 0.35
const impuestoPais = 0.3
const productos = [{
    id:1,
    juego:"Call of duty",
    precio: 1200
},
{
    id:2,
    juego:"Cyberpunk",
    precio:2500
}]
const productosHTML = document.getElementById("productos")
const cantidadDeProductosHTML = document.getElementById("cantidadDeproductosEnElCarrito")
const carritoHTML= document.getElementById("carrito")
const totalSteamHTML = document.getElementById("totalSteam")
const totalRealHTML = document.getElementById("totalReal")
let acumuladorDeHTML=''
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

const agregarPreciosReales = () => {
    productos.forEach(element => {
        element.precioReal = element.precio * impuestoPais + element.precio * impuestoGanancias + element.precio
    })
}

const ponerProductosEnHTML = () => {
    productos.forEach(element =>{
        acumuladorDeHTML += `<div id="${element.id}">
        <h2>${element.juego}</h2>
        <h4>precio: ${element.precio}</h4>
        <h4>precio real: ${element.precioReal}</h4>
        <button type="button" class="btn-primary" onclick="agregarAlCarrito(${element.id})">Agregar</button>
        </div>
        <br>
        <br>`
    })
    productosHTML.innerHTML=acumuladorDeHTML
}

document.getElementById("saludo").innerHTML=`<h1 class="text-center">Bienvenido ${nombre}!</h1>`
agregarPreciosReales()
ponerProductosEnHTML()