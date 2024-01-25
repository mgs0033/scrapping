document.addEventListener('DOMContentLoaded', () => {
    fetch('/rss')
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const items = xml.querySelectorAll('entry');
            let noticiasHTML = '';
            items.forEach(item => {
                const title = item.querySelector('title')?.textContent ?? 'Sin título';
                const summary = item.querySelector('summary')?.textContent ?? 'No hay resumen disponible';
                const linkElement = item.querySelector('link[rel="alternate"]');
                const linkHref = linkElement ? linkElement.getAttribute('href') : '#';
                const thumbnailElement = item.querySelector('media\\:thumbnail, thumbnail');
                const imageUrl = thumbnailElement ? thumbnailElement.getAttribute('url') : 'ruta/a/imagen/por/defecto.jpg';
                noticiasHTML += `
            <li>
            <h3>${title}</h3>
            <p>${summary}</p>
              <a href="${linkHref}" target="_blank">
                <img src="${imageUrl}" alt="Imagen de la noticia">
                
              </a>
            </li>`;
            });
            document.getElementById('lista-noticias').innerHTML = noticiasHTML;
        })
        .catch(error => console.error('Error al cargar las noticias:', error));
});