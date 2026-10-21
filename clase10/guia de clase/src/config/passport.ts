import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// Declara el tipo de objeto User, exportar esta interfaz para que pueda ser importada y
// reutilizada en otros archivos del proyecto (por ejemplo, en el servicio de autenticación,
// controladores o middlewares).
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
}

// "Base de datos" simulada en memoria
// Contraseña en texto plano para ambos usuarios: "123456"
export const usersDB: User[] = [
    {
        id: '1',
        email: 'admin@correo.com',
        passwordHash: bcrypt.hashSync('123456', 10),
        name: 'Administrador'
    },
    {
        id: '2',
        email: 'user@correo.com',
        passwordHash: bcrypt.hashSync('123456', 10),
        name: 'Usuario Normal'
    }
];

// Configuración de la estrategia local
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = usersDB.find((u) => u.email === email);

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                const isMatch = await bcrypt.compare(password, user.passwordHash);

                if (!isMatch) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serializar usuario (Guardar solo el ID en la sesión)
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserializar usuario (Recuperar el usuario completo a partir del ID en la sesión)
passport.deserializeUser((id: string, done) => {
    const user = usersDB.find((u) => u.id === id);
    done(null, user || false);
});
