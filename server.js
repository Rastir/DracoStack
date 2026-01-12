const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());

// Servir archivos estáticos desde la raíz actual
app.use(express.static('.'));

// Proxy para tu API
app.use('/api', createProxyMiddleware({
  target: 'http://66.97.36.159:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
});