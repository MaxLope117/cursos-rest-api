import express from 'express';
import {} from 'dotenv/config.js'
import cursosRoutes from './routes/cursos.routes.js'

const app = express();

app.use(express.json());
app.use('/api', cursosRoutes)

//* Servidor.
app.listen(process.env.SERVER_PORT || 3000);
console.log(`\nServidor corriendo en el puerto: ${ process.env.SERVER_PORT || 3000 }\n`)