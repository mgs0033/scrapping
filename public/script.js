fetch('/productos')
    .then(response => response.json())
    .then(data => {
        const productosList = document.getElementById('productosLista');

        // Iterar sobre los datos y crear elementos de lista
        data.forEach(producto => {
            const listItem = document.createElement('div');
            listItem.innerHTML=`
            <h3>${producto.Titulo}</h3>
            <p>Precio: ${producto.Precio}</p>
            <img src="${producto['Imagen-src']}" alt="${producto.titulo}">
            <hr>
            `;
            productosList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));


    
    
    