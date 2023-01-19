import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { auth } from '../firebase/configuracionFirebase.js';

export const homeLogica = () => {
    // Metodo onAuthStateChanged - Obtener el usuario que ha iniciado sesión actualmente
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            window.localStorage.setItem('uid', uid);
        } else {
            window.location.href = 'bienvenida';
        }
    });
};
