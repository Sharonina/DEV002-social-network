import { addDoc, doc, collection, where, query, getDocs, getDoc,  setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
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

        const docRef = doc(database, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            console.log(docSnap.data().username);
            console.log(docSnap.data().petName);
        } else {
            console.log('No such document!');
        }
        const username = docSnap.data().username;
        const petName = docSnap.data().petName;
        let amountLikes = 0;
        let arrayUsersLikes = [];
        //---------------------------------------------------------------------------

        // creacion de subcoleccion y valor del post
        if (ingresoPost.value.length > 0) {
            const posts = collection(database, 'usuarios');
            Promise.all([
                addDoc(collection(posts, auth.currentUser.uid, 'userPosts'), {
                    userUid, valorPost, username, petName, amountLikes, arrayUsersLikes,
                }),
            ]);
        }
        ingresoPost.value = '';
    });
};
