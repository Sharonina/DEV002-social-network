import Header from '../templates/Header.js';
import CreacionPost from '../templates/creacionPost.js';
import Timeline from '../templates/Timeline.js';
import { homeLogica } from '../logic/homeLogica.js';
import { headerLogica } from '../logic/headerLogica.js';
import { creacionPostLogica } from '../logic/creacionPostLogica.js';
import { timelineLogica } from '../logic/timelineLogica.js';

const Home = () => {
    const contenedor = document.createElement('section');
    contenedor.classList.add('Home');
    contenedor.innerHTML = '';
    const view = Header();
    contenedor.innerHTML = view;
    const otroContenedor = document.createElement('section');
    otroContenedor.classList.add('CreacionPost');
    const otroview = CreacionPost();
    otroContenedor.innerHTML = otroview;

    const elRegresoDelContenedor = document.createElement('section');
    elRegresoDelContenedor.classList.add('Timeline');
    const volverAlViewII = Timeline();
    elRegresoDelContenedor.innerHTML = volverAlViewII;

    const contenedorPadre = document.createElement('section');
    contenedor.classList.add('Todo');

    contenedorPadre.appendChild(contenedor);
    contenedorPadre.appendChild(otroContenedor);
    contenedorPadre.appendChild(elRegresoDelContenedor);

    console.log(contenedorPadre);
    homeLogica(contenedorPadre);
    headerLogica(contenedor);
    creacionPostLogica(otroContenedor);
    timelineLogica(elRegresoDelContenedor);
    return contenedorPadre;
};

export default Home;
