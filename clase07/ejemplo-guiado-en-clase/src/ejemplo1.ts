import express, { type Request, type Response, type Application } from 'express'
const app: Application = express();
// Configuraciones
app.set('case sensitive routing', true);
app.set('appName', 'Curso de Express');
app.set('puerto', 3000);
// Middlewares
app.use(express.json());
// Rutas
app.get('/ProbandoCaseSensitive', (req: Request, res: Response) => {
res.send('Probando Case Sensitive');
});
// Inicio del servidor
const puerto = app.get('puerto') as number;
app.listen(puerto, () => {
console.log(`Servidor ${app.get('appName')} en el puerto ${puerto}`);
});