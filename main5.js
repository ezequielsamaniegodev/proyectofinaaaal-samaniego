function mostrarProductosEnCarrito() {
    const datosLocalStorage = JSON.parse(localStorage.getItem('autosSeleccionados')) || [];
    const seccionCarrito = document.getElementById('carrito-section');

    seccionCarrito.innerHTML = '';

    datosLocalStorage.forEach(producto => {
        const card = document.createElement('div');
        card.setAttribute('data-modelo', producto.modelo);
        card.classList.add('card-carritoo');
        card.innerHTML = `
            <div>
                <p>${producto.modelo}</p>
                <p>EAD: ${producto.precio}</p>
                <p class="cantidad">Amount: ${producto.cantidad}</p>
                <button class="boton-sumar">+</button>
                <button class="boton-restar">-</button>
            </div>
        `;
        seccionCarrito.appendChild(card);

        const cantidadElemento = card.querySelector('.cantidad');
        const botonSumar = card.querySelector('.boton-sumar');
        const botonRestar = card.querySelector('.boton-restar');

        botonSumar.addEventListener('click', () => {
            producto.cantidad += 1;
            cantidadElemento.innerText = `Amount: ${producto.cantidad}`;
            localStorage.setItem('autosSeleccionados', JSON.stringify(datosLocalStorage));
        });

        botonRestar.addEventListener('click', () => {
            if (producto.cantidad > 0) {
                producto.cantidad -= 1;
                cantidadElemento.innerText = `Amount: ${producto.cantidad}`;
                localStorage.setItem('autosSeleccionados', JSON.stringify(datosLocalStorage));
            }
        });
    });
}

mostrarProductosEnCarrito();

const botonPagar = document.getElementById('pay');
botonPagar.addEventListener('click', () => {
  Swal.fire({
    title: "To finish the process go to this link:",
    icon: "info",
    html: `
      <a href="https://www.visa.com.ar/">payment methods</a>
    `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
      <i class="fa fa-thumbs-up"></i>OK
    `,
  });
});