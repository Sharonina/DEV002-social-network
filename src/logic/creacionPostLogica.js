/* eslint-disable max-len */
import {
    addDoc, doc, collection, where, query, getDocs, getDoc, setDoc, onSnapshot, serverTimestamp, orderBy, getFirestore
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { database, auth, currentUser, uploadImage, getImageURL } from '../firebase/configuracionFirebase.js';
import { ref } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';

export const creacionPostLogica = (contenedor) => {
    const ingresoPost = contenedor.querySelector('#ingresoPost');
    const ladraloBtn = contenedor.querySelector('.ladraloBtn');

    ladraloBtn.addEventListener('click', async () => {
        const valorPost = ingresoPost.value;
        const userUid = window.localStorage.getItem('uid');
        console.log(userUid);

        // consultar usuario--------------------------------------------------------

        const docRef = doc(database, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        // console.log('Estoy imprimiendo el userUID');
        // console.log(docRef.id);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            console.log(docSnap.data().username);
            console.log(docSnap.data().petName);
        } else {
            console.log('No such document!');
        }
        const username = docSnap.data().username;
        const petName = docSnap.data().petName;
        const amountLikes = 0;
        const arrayUsersLikes = [];
        //---------------------------------------------------------------------------

        // creacion de subcoleccion y valor del post
        if (ingresoPost.value.length > 0) {
            const posts = collection(database, 'usuarios');
            const fechaPublicacion = new Date().toLocaleDateString('es-es', {
                month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
            });
            const createdAt = serverTimestamp();
            // -----------------------------------------------------------------
            const inputFile = contenedor.querySelector('#file');
            const urlArray = [];
            if (inputFile.files[0]) {
                const date = new Date();
                const result = await uploadImage(inputFile.files[0], date.getTime());
                console.log(result);
                const url = await getImageURL(result.ref);
                console.log(url);
                urlArray.push(url);
            } else {
                urlArray.push(null);
            }
            const postURL = urlArray[0];
            console.log(postURL);
            // -----------------------------------------------------------------
            const otroArchivo = collection(database, 'postsTimeline');
            addDoc((otroArchivo), {
                // eslint-disable-next-line max-len
                userUid, valorPost, username, petName, amountLikes, arrayUsersLikes, fechaPublicacion, createdAt, postURL,
            });
            // console.log(await getDoc(otroArchivo));
            /* Promise.all([
                addDoc(collection(posts, auth.currentUser.uid, 'userPosts'), {
                    userUid, valorPost, username, petName, amountLikes, arrayUsersLikes, fechaPublicacion, createdAt,
                }),
            ]); */
        }
        ingresoPost.value = '';
    });
};
