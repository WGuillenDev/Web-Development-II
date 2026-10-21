import express, { type Request, type Response, type NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import './config/passport.js'; // Importar la configuración de Passport

const app = express();

// Configuración de vistas con EJS
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares para procesar formularios HTTP y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Sesiones HTTP
app.use(
    session({
        secret: 'clave_secreta_para_sesion',
        resave: false,
        saveUninitialized: false
    })
);

// Inicializar Passport y el soporte de sesiones de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware personalizado para proteger rutas
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// --- RUTAS ---
// Vista de Login
app.get('/login', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('login');
});

// Procesar Formulario de Login
app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);

// Vista Protegida del Perfil
app.get('/profile', ensureAuthenticated, (req: Request, res: Response) => {
    // Passport adjunta el usuario autenticado a req.user
    res.render('profile', { user: req.user });
});

// Cerrar Sesión
app.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

// Puerto de inicio
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});