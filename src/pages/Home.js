import Header from '../templates/Header.js';
import CreacionPost from '../templates/creacionPost.js';
import { homeLogica } from '../logic/homeLogica.js';
import { headerLogica } from '../logic/headerLogica.js';
import { creacionPostLogica } from '../logic/creacionPostLogica.js';


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

    const contenedorPadre = document.createElement('section');
    contenedor.classList.add('Todo');

    contenedorPadre.appendChild(contenedor);
    contenedorPadre.appendChild(otroContenedor);

    console.log(contenedorPadre);
    homeLogica(contenedorPadre);
    headerLogica(contenedor);
    creacionPostLogica(otroContenedor);
    return contenedorPadre;
};

export default Home;
