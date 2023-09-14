const carrito = [];
let total = 0;

function mostrarModal(producto, precio) {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    modalTitle.textContent = 'Producto Agregado';
    modalBody.textContent = `Has añadido "${producto}" al carrito por $${precio}.`;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();

    // Actualiza el carrito y el precio total
    carrito.push({ producto, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito');
    const carritoTotalElement = document.getElementById('carritoTotal');

    // Actualiza la lista de productos en el carrito
    carritoElement.innerHTML = '';
    carrito.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.producto} - $${item.precio}`;
        carritoElement.appendChild(itemElement);
    });

    // Actualiza el precio total
    carritoTotalElement.textContent = `Total: $${total}`;
}

const botones = document.querySelectorAll('.btn-add-to-cart');
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.getAttribute('data-product');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        mostrarModal(producto, precio);
    });
});