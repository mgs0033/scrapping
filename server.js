const express = require('express');
const fs = require('fs');
const FeedParser = require('feedparser'); // Agrega esta línea para importar FeedParser


const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/productos', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get('/rss', async (req, res) => {
  const RSS_URL = "https://www.bbc.com/mundo/temas/internacional/index.xml";

  try {
      // Importación dinámica de node-fetch
      const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
      const response = await fetch(RSS_URL);
      const data = await response.text();
      res.send(data);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error al obtener el RSS');
  }
});

app.get('/rss', async (req, res) => {
  const RSS_URL = "https://www.bbc.com/mundo/ultimas_noticias/index.xml";

  try {
      const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
      const response = await fetch(RSS_URL);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const feedparser = new FeedParser();
      const noticias = [];

      response.body.pipe(feedparser);

      feedparser.on('readable', function () {
          let item;
          while (item = this.read()) {
              noticias.push({
                  titulo: item.title,
                  resumen: item.summary,
                  publicado: item.pubDate || item.date,
                  enlace: item.link,
                  imagen: item.image ? item.image.url : null
              });
          }
      });

      feedparser.on('end', function () {
          res.json(noticias);
      });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send(`Error al obtener el RSS: ${error.message}`);
  }
});



app.get('/atom', async (req, res) => {
  const ATOM_URL = "https://www.arona.org/DesktopModules/Noticias/Feed.ashx?format=atom";

  try {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    const response = await fetch(ATOM_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feedparser = new FeedParser();
    const noticias = [];

    response.body.pipe(feedparser);

    feedparser.on('readable', function () {
      let item;
      while (item = this.read()) {
        noticias.push({
          titulo: item.title,
          resumen: item.summary,
          publicado: item.pubDate || item.date,
          enlace: item.link,
          imagen: item.image ? item.image.url : null
        });
      }
    });

    feedparser.on('end', function () {
      res.json(noticias);
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Error al obtener el Atom: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});