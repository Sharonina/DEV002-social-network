import { registroUsuarioLogica } from '../logic/registroUsuarioLogica.js';

const RegistroUsuario = () => {
    const contenedor = document.createElement('section');
    contenedor.classList.add('registro-usuario');
    const view = `
        <div class ="imagen">
            <img src="../assets/tindog_logo_r.png" alt="imagen de logo: tindog"/>
        </div>
        <div class="campos-registro">
            <div>
                <label>Nombre</label>
                <input id="nombreUsuario" type="text" placeholder="Sharon Gizela Arana Mendoza">
                <p id='mensajeErrorNombre' class='hide'>Ingresa tu nombre</p>
            </div>
            <!--<div>
                <label>Usuario</label>
                <input id="idUsuario" type="text" placeholder="@elsully">
                <p id='mensajeErrorUsuario' class='hide'>Ingresa el nombre de usuario</p>
            </div>-->
            <div>
                <label>Correo electrónico</label>
                <input id="correoUsuario" type="text" placeholder="sharendoza@gmail.com">
                <p id='mensajeErrorCorreo' class='hide'>Ingresa un correo</p>
            </div>
            <div>
                <label>Contraseña</label>
                <input id="contrasenaUsuario" type="password" placeholder="***********">
                <p id='mensajeErrorContrasena' class='hide'>Ingresa una contraseña</p>
            </div>
            <div>
                <label>Confirma tu contraseña</label>
                <input id="confirmacionContrasena" type="password" placeholder="***********">
                <p id='mensajeErrorConfirmacion' class='hide'>Por favor, confirma tu contraseña</p>
            </div>
        </div>
        <div class="botonesRegistro">
            <div class="registroCorreo">
                <input  id='registroCorreoBoton' type="submit" value="Registrarse">
            </div>
            <div class="registroGoogle">
                <button id="registroGmailBtn">
                    <img src="../assets/logo-google.png" alt="G " />
                    Registrarse con Google
                </button>
            </div>
            <div class="volverInicioSesion">
                <span>¿Ya tienes cuenta?</span>
                <a href="inicio-sesion">Iniciar Sesión</a>
            </div>
        </div>
    `;
    contenedor.innerHTML = view;
    registroUsuarioLogica(contenedor);
    return contenedor;
};

export default RegistroUsuario;
