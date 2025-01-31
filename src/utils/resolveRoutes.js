import Bienvenida from '../pages/Bienvenida.js';
import RegistroUsuario from '../pages/RegistroUsuario.js';
import Error404 from '../pages/Error404.js';
import FormularioRegistroMascota from '../pages/FormularioRegistroMascota.js';
import InicioSesion from '../pages/InicioSesion.js';
import Home from '../pages/Home.js';
import RecuperarContraseña from '../pages/RecuperarContraseña.js';

export const routes = {
    '/': Home,
    '/404': Error404,
    '/bienvenida': Bienvenida,
    '/inicio-sesion': InicioSesion,
    '/registro-usuario': RegistroUsuario,
    '/formulario-registro': FormularioRegistroMascota,
    '/match': 'Match',
    '/:id': 'PerfilUsuario',
    '/:id-match': 'PerfilMatch',
    '/busqueda-usuario': 'BusquedaUsuario',
    '/recuperar-contrasena': RecuperarContraseña,
};

export const resolveRoutes = (route) => {
    const routesList = Object.keys(routes);
    if (route) {
        const validRoute = routesList.includes(route) ? route : '/404';
        return validRoute;
    }
    return `/${route}`;
};
