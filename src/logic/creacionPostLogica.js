import { addDoc, collection, where, query, getDocs, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { database, auth, currentUser } from '../firebase/configuracionFirebase.js';

export const creacionPostLogica = (contenedor) => {
    const ingresoPost = contenedor.querySelector('#ingresoPost');
    const ladraloBtn = contenedor.querySelector('.ladraloBtn');

    ladraloBtn.addEventListener('click', async () => {
        const valorPost = ingresoPost.value;
        const userUid = window.localStorage.getItem('uid');
        console.log(userUid);

        // consultar usuario--------------------------------------------------------
        // const consultaUsuario = collection(database, 'usuarios');
        /* const q = query(collection(database, 'usuarios'), where('username', 'in', [userUid === 'uid']));

        console.log(q);
        console.log('hola1');
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc);
            console.log('hola2');
            console.log(doc.id, ' => ', doc.data());
            return (doc.id, doc.data());
        }); */
        //---------------------------------------------------------------------------

        // creacion de subcoleccion y valor del post
        if (ingresoPost.value.length > 0) {
            const posts = collection(database, 'posts');
            Promise.all([
                addDoc(collection(posts, auth.currentUser.uid, 'userPosts'), {
                    userUid, valorPost, // username, // petName,
                }),
            ]);
        }
        ingresoPost.value = '';
    });
};
