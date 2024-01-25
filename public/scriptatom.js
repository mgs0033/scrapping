document.addEventListener('DOMContentLoaded', () => {
  fetch('/atom') // Cambiado a '/atom' para obtener noticias en formato Atom
    .then(res => res.json())
    .then(data => {
      let noticiasHTML = '';
      data.forEach(item => {
        const title = item.titulo || 'Sin título';
        const summary = item.resumen || 'No hay resumen disponible';
        const linkHref = item.enlace || '#';
        const imageUrl = item.imagen || 'ruta/a/imagen/por/defecto.jpg';
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
