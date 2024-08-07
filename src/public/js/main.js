const form = document.getElementById('form-carga');
const productsList = document.getElementById('listproduct');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('addArticle', { name: articleName });

    // Limpiar el campo de entrada
    articleNameInput.value = '';
});

// Escuchar el evento 'updateArticles' desde el servidor
socket.on('updateProducts', (products) => {
    // Limpiar la lista de artículos
    productsList.innerHTML = '';

    products.forEach(product => {
        productsList.innerHTML += `
        <div class="card product-card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Producto">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
                <a href="#" class="btn btn-primary btn-delete">Quitar</a>
            </div>
        </div>
    `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            socket.emit('deleteArticle', article.name);
        });
    });
});