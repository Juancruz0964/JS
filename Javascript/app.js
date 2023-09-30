let carrito = [];
const carritoCount = document.getElementById('carrito-count');
const carritoList = document.getElementById('carrito-list');
const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
const carritoIcon = document.querySelector('#carritoIcon');
const listaProductos = document.getElementById('lista-productos');
const jsonUrl = 'productos.json';

// Función para mostrar el mensaje de confirmación
function mostrarMensajeConfirmacion(nombre) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: `Se ha agregado "${nombre}" al carrito.`,
        showConfirmButton: false,
        timer: 1000
    });
}

// Inicializar el modal una sola vez al cargar la página
const productModal = new bootstrap.Modal(document.getElementById('productModal'));

function mostrarModal() {
    const modalBody = document.getElementById('carrito-list');
    modalBody.innerHTML = ''; // Limpia contenido anterior del modal

    let total = 0;

    for (const item of carrito) {
        const productoInfo = productos.find((prod) => prod.nombre === item.nombre);

        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${productoInfo.imagen}" alt="${item.nombre}" style="max-height: 100px;">
            ${item.nombre} (Cantidad: ${item.cantidad}) - Precio: $${productoInfo.precio * item.cantidad}
            <button data-product="${item.nombre}" class="btn btn-danger btn-sm btn-remove">Eliminar</button>
        `;

        modalBody.appendChild(li);

        total += productoInfo.precio * item.cantidad;
    }

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `Total: $${total}`;
    modalBody.appendChild(totalElement);

    productModal.show();
}

// Event listener para cerrar el modal cuando se hace clic en "Seguir comprando"
document.querySelector('#productModal .btn-secondary').addEventListener('click', () => {
    productModal.hide();
});

// Event listener para mostrar el modal cuando se hace clic en el ícono del carrito
carritoIcon.addEventListener('click', () => {
    mostrarModal();
});

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find((item) => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, cantidad: 1, precio }); // Agregar detalles del producto
    }

    // Actualizar el contador del carrito en el frontend
    carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);

    // Guardar los datos del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarMensajeConfirmacion(nombre);
}

function eliminarDelCarrito(nombre) {
    const productoIndex = carrito.findIndex((item) => item.nombre === nombre);

    if (productoIndex !== -1) {
        if (carrito[productoIndex].cantidad === 1) {
            carrito.splice(productoIndex, 1);
        } else {
            carrito[productoIndex].cantidad--;
        }

        // Actualizar el contador del carrito en el frontend
        carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);

        // Guardar los datos actualizados del carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar el carrito actualizado en el modal
        mostrarModal();
    }

    // Cerramos el modal actual
    var myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.hide();
}

// Event listener para eliminar productos del carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remove')) {
        const nombre = event.target.getAttribute('data-product');
        eliminarDelCarrito(nombre);
    }
});

// Event listeners para los botones "Añadir al carrito"
const botonesAgregar = document.querySelectorAll('.btn-add-to-cart');

botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-product');
        agregarAlCarrito(nombre);
    });
});

// Botón para finalizar la compra
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
btnFinalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'El carrito no posee productos.',
            showConfirmButton: true,
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Procesando compra',
            text: 'Por favor, espere...',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

        // Simulación de una operación asincrónica con `.then`
        realizarCompraWithThen()
            .then(() => {
                Swal.close(); // Cierra el mensaje de "Procesando compra"

                Swal.fire({
                    icon: 'success',
                    title: 'Compra finalizada',
                    text: 'La compra se ha realizado con éxito.',
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Limpia el carrito
                        carrito = [];
                        carritoCount.innerText = 0;
                        carritoList.innerHTML = '';

                        // Cierra el modal
                        productModal.hide();
                    }
                });
            })
            .catch((error) => {
                Swal.close(); // Cierra el mensaje de "Procesando compra" en caso de error

                Swal.fire({
                    icon: 'error',
                    title: 'Error al finalizar compra',
                    text: error.message,
                    showConfirmButton: true,
                });
            });
    }
});

// Función que simula la compra con `.then`
function realizarCompraWithThen() {
    return new Promise((resolve, reject) => {
        // Simulación de una operación asincrónica
        setTimeout(() => {
            const exito = Math.random() < 0.8; // porcentaje de éxito o error para hacer más "real" la compra.

            if (exito) {
                resolve();
            } else {
                reject(new Error('No se pudo completar la compra.'));
            }
        }, 2000); // Tiempo del SweetAlert
    });
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Intenta obtener los datos del carrito desde el almacenamiento web
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verifica si hay productos en el carrito guardado
    if (carritoGuardado.length > 0) {
        // Reconstruye el carrito en la interfaz
        carrito = carritoGuardado;
        carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);
    }
});

// Inicializar los productos desde un archivo JSON
let productos = [];

fetch(jsonUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cargar productos.');
        }
        return response.json();
    })
    .then((data) => {
        productos = data;
        // Procesa los datos y crea elementos HTML para mostrar la lista de productos
        data.forEach((producto) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
            listaProductos.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
