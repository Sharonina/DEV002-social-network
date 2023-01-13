import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { database, auth } from '../firebase/configuracionFirebase.js';

export const creacionPostLogica = (contenedor) => {
    const ingresoPost = contenedor.querySelector('#ingresoPost');
    const ladraloBtn = contenedor.querySelector('.ladraloBtn');

    ladraloBtn.addEventListener('click', () => {
        const valorPost = ingresoPost.value;
        const userUid = window.localStorage.getItem('uid');

        const posts = collection(database, 'posts');
        Promise.all([
            addDoc(collection(posts, auth.currentUser.uid, 'userPosts'), {
                userUid, valorPost,
            }),

        ]);
    });
};
