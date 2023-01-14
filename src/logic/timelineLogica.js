import { onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { database, auth } from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');
    const postPublicado = contenedor.querySelector('.postPublicado');

    const userUid = window.localStorage.getItem('uid');
    const subColRef = collection(database, 'posts', userUid, 'userPosts');

    onSnapshot(subColRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            console.log(post.valorPost);
            postPublicado.innerHTML += `${post.valorPost}`;
        });
    });
};
