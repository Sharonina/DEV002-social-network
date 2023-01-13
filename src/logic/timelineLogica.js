import { addDoc, getDocs, doc, setDoc, collection, getFirestore, query, where } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { database, coleccionPost, getCurrentUser, auth } from '../firebase/configuracionFirebase.js';

export const timelineLogica = (contenedor) => {
    const ingresoPost = contenedor.querySelector('#ingresoPost');
    const ladraloBtn = contenedor.querySelector('.ladraloBtn');

    ladraloBtn.addEventListener('click', () => {
        console.log('hiciste clic');
        console.log(ingresoPost.value);
        const valorPost = ingresoPost.value;
        const userUid = window.localStorage.getItem('uid');
        console.log(userUid);
        /* setDoc(collection(getFirestore(), 'posts', auth.currentUser.uid, 'userPosts'), {
            valorPost,
            // addDoc(collection(database, 'userPosts'), { valorPost });
        }); */

        const posts = collection(database, 'posts');
        Promise.all([
            addDoc(collection(posts, auth.currentUser.uid, 'userPosts'), {
                userUid, valorPost,
            }),

        ]);
    });
};
