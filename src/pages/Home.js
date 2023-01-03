import Header from '../templates/Header.js';
import Timeline from '../templates/timeline.js';
import { homeLogica } from '../logic/homeLogica.js';

const Home = () => {
    const contenedor = document.createElement('section');
    contenedor.classList.add('Home');
    const view = Header`
        <h3>hey</h3>
    `;
    contenedor.innerHTML = view;
    homeLogica(contenedor);
    return contenedor;
};

export default Home;
