import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import {
    auth, storage, storageRef, currentUser,
} from '../firebase/configuracionFirebase.js';

export const headerLogica = (contenedor) => {
    // Desplegar menú de opciones

    const imagenPerfil = contenedor.querySelector('#menuOpciones');
    const menu = contenedor.querySelector('.menuContainer');
    const userProfileImg = contenedor.querySelector('.userImage');

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

    /*      */
    // Cerrar sesion

    const botonCerrarSesion = contenedor.querySelector('#cerrarSesion');
    console.log(botonCerrarSesion);
    botonCerrarSesion.addEventListener('click', async () => {
        await signOut(auth);
        console.log('estas haciendo clic');
        window.location.href = 'bienvenida';
    });
};
