import express from 'express';
import {} from 'dotenv/config.js'
import cursosRoutes from './routes/cursos.routes.js'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
})
app.use('/api', cursosRoutes);

app.use(cors());


//* Servidor.
app.listen(process.env.SERVER_PORT || 3000);
console.log(`\nServidor corriendo en el puerto: ${ process.env.SERVER_PORT || 3000 }\n`)