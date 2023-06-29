let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let contenedor = document.getElementById("misprods");

function renderizarProductos() {
    for (const producto of productos) {
        contenedor.innerHTML += `
            <div class="card col-sm-6 col-md-4 col-lg-3">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    
                    <p class="card-text negrita">${producto.nombre}</p>
                    <p class="card-text"> ${producto.descripcion}</p>
                    <p class="card-text negrita">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
    }
}

// Renderizar los elementos del carrito en la tabla
for (const producto of carrito) {
	document.getElementById('tablabody').innerHTML += `
		<tr>
			<td>${producto.id}</td>
			<td>${producto.nombre}</td>
			<td>${producto.descripcion}</td>
			<td>$${producto.precio}</td>
		</tr>
	`;
}

// Actualizar el total
let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;

function agregarACarrito(prodAAgregar) {
    carrito.push(prodAAgregar);
    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${prodAAgregar.id}</td>
            <td>${prodAAgregar.nombre}</td>
			<td>${prodAAgregar.descripcion}</td>
            <td>$${prodAAgregar.precio}</td>
        </tr>
    `;
    localStorage.setItem("carrito", JSON.stringify(carrito));
	// Incrementar el total
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;
	console.log(localStorage.getItem("carrito"))
} 

function limpiarCarrito() {
    carrito = [];
    document.getElementById('tablabody').innerHTML = '';
    document.getElementById('total').innerText = 'Total a pagar $: ';
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById('finalizar').addEventListener('click', limpiarCarrito);

contenedor.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const productId = target.id.replace('btn', '');
        const producto = productos.find(p => p.id === productId);
        if (producto) {
            agregarACarrito(producto);
			localStorage.setItem("carrito", JSON.stringify(carrito));
			console.log(producto) 
        }
    }
});

renderizarProductos();

