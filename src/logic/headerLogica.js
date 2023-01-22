import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import {
    auth, storage, storageRef, currentUser,
} from '../firebase/configuracionFirebase.js';
// eslint-disable-next-line import/order, import/no-unresolved
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
// eslint-disable-next-line import/no-duplicates
import { coleccionNombresUsuario } from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const headerLogica = (contenedor) => {
    // Desplegar menú de opciones
    const imagenPerfil = contenedor.querySelector('#menuOpciones');
    const menu = contenedor.querySelector('.menuContainer');
    const userProfileImg = contenedor.querySelector('.userImage');
    const search = contenedor.querySelector('.searcher');
    const container = contenedor.querySelector('.container');
    console.log(search);
    // console.log('El selector');
    // const postsContainer = contenedor.querySelector('.Timeline');
    // console.log(postsContainer);

    // Función que filtra según el input ingresado
    // eslint-disable-next-line max-len
    const filter = (array, input) => array.filter((e) => e.includes(input.toLowerCase()));
    // Función para crear/darle forma a las tarjetas
    function createCard(pokemon) {
        // Crear el contenedor div de la tarjeta
        const card = document.createElement('div');
        card.classList.add('pokemonCard');
        console.log(card);

        // // Crear el contenedor div de la imagen
        // const imageContainer = document.createElement('figure');
        // imageContainer.classList.add('imageContainer');

        // // Crear un elemento imagen
        // const image = document.createElement('img');
        // image.src = pokemon.img;

        // // Crear un contenedor de tipo párrafo para el numero
        // const number = document.createElement('p');
        // number.classList.add('name');
        // number.textContent = `${pokemon.num}`;
        // //Crear un contenedor de tipo párrafo para el nombre
        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = `${pokemon}`;

        // //Poblar los contenedores
        // imageContainer.appendChild(image);
        // card.appendChild(imageContainer);
        card.appendChild(name);
        // card.appendChild(number);
        // Poblar al contenedor principal
        container.appendChild(card);

        // const type = pokemon.type;
        // const cardColor = colors[type[0]];
        // card.style.backgroundColor = cardColor;
    }
    // Función para buscar los pokemones y cálculos agregados segun el buscador
    function searchPokemon(pokemon) {
        search.addEventListener('keyup', (e) => {
            console.log(e);
            const newArray = filter(pokemon, search.value);
            console.log(newArray);
            // return newArray;
            container.innerHTML = '';
            newArray.forEach((element) => {
                createCard(element);
            });
            // numberPokemons.innerHTML = ("N°" + newArray.length);
            // percentagePokemons.innerHTML = (calculatePercentage(pokemon, newArray) + '%');
        });
    }

    getDocs(coleccionNombresUsuario)
        .then((snapshot) => {
            const lista = [];
            snapshot.docs.forEach((doc) => {
                lista.push(doc.data().username);
            });
            searchPokemon(lista);
            createCard(lista);
        });

    const eluid = async () => {
        await onAuthStateChanged(auth, () => {
            getDownloadURL(ref(storage, `ikhybex-Bftzx/ ${auth.currentUser.uid}`))
                .then((urlimg) => {
                    userProfileImg.src = urlimg;
                });
        });
    };

    eluid();

    imagenPerfil.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Cerrar sesion

    const botonCerrarSesion = contenedor.querySelector('#cerrarSesion');
    console.log(botonCerrarSesion);
    botonCerrarSesion.addEventListener('click', async () => {
        await signOut(auth);
        console.log('estas haciendo clic');
        window.localStorage.removeItem('uid');
        window.location.href = 'bienvenida';
    });
};
