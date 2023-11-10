document.addEventListener('DOMContentLoaded', function() {
    fetch('autos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const cards = document.querySelectorAll('.swiper-slide.cardjs');
            datos.forEach((auto, indice) => {
                const cardActual = cards[indice];
                cardActual.querySelector('p').innerText = auto.modelo;
                cardActual.querySelector('p:nth-of-type(2)').innerText = `EAD ${auto.precio}`;
                cardActual.querySelector('#boton-comprar').addEventListener('click', () => {
                    const datosLocalStorage = JSON.parse(localStorage.getItem('autosSeleccionados')) || [];

                    const autoExistente = datosLocalStorage.find(pepito => pepito.modelo === auto.modelo);

                    if (autoExistente) {
                        autoExistente.cantidad += 1;
                    } else {
                        datosLocalStorage.push({
                            modelo: auto.modelo,
                            precio: auto.precio,
                            stock: auto.stock,
                            cantidad: 1
                        });
                    }

                    localStorage.setItem('autosSeleccionados', JSON.stringify(datosLocalStorage));

                    mostrarNumeroCarrito();
                });
            });
        });
});

function mostrarNumeroCarrito() {
    const datosLocalStorage = JSON.parse(localStorage.getItem('autosSeleccionados')) || [];
    const numeroCarrito = document.getElementById('numero-carrito');
    let total = 0;

    for (let i = 0; i < datosLocalStorage.length; i++) {
        total += datosLocalStorage[i].cantidad;
    }

    numeroCarrito.innerText = total.toString();
}

mostrarNumeroCarrito();
