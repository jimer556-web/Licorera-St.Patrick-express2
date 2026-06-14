// 🛒 AQUÍ SE GUARDAN TUS PRODUCTOS
let carrito = [];

// ✅ FUNCIÓN PARA AGREGAR - NO SE TOCA NADA DE AQUÍ
function agregarCarrito(nombre, precio, imagen) {
    // Ver si ya existe
    let existe = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            existe = true;
            carrito[i].cantidad += 1;
            break;
        }
    }

    // Si no existe, lo agregamos nuevo
    if (!existe) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    // Actualizamos todo
    actualizarCarrito();
    alert("✅ " + nombre + " agregado al carrito");
}

// ✅ ESTA ES LA FUNCIÓN PRINCIPAL, AHORA ES OBLIGATORIA Y FUNCIONA SEGURO
function actualizarCarrito() {
    // BUSCAMOS LOS ESPACIOS (ahora lo hace bien)
    const espacioLista = document.getElementById('lista-carrito');
    const espacioTotal = document.getElementById('total');

    // SI NO EXISTEN, NO SEGUIMOS (evita errores)
    if (!espacioLista || !espacioTotal) {
        return;
    }

    // BORRAMOS LO ANTERIOR PARA VOLVER A DIBUJAR
    espacioLista.innerHTML = "";
    let sumaTotal = 0;

    // RECORREMOS CADA PRODUCTO GUARDADO
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];

        // SUMAMOS AL TOTAL
        sumaTotal += producto.precio * producto.cantidad;

        // CREAMOS EL CÓDIGO DE ESTE PRODUCTO
        let item = document.createElement("div");
        item.className = "item-carrito";
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toFixed(2)} x ${producto.cantidad}</p>
            </div>
            <button onclick="borrarProducto(${i})">×</button>
        `;

        // LO PONEMOS EN LA LISTA
        espacioLista.appendChild(item);
    }

    // MOSTRAMOS EL TOTAL
    espacioTotal.innerHTML = "Total: $" + sumaTotal.toFixed(2);
}

// ✅ FUNCIÓN PARA BORRAR
function borrarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// ✅ FUNCIÓN PARA ABRIR Y CERRAR
function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    if (panel) {
        panel.classList.toggle('activo');
        // CADA VEZ QUE ABRES, SE ACTUALIZA SOLO
        actualizarCarrito();
    }
}