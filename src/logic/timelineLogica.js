import { onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { database, auth } from '../firebase/configuracionFirebase.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');

    /* onGetPost((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            html += `
                <div>
                    <h3>${post.valorPost}</h3>
                </div>
            `;
        });
        postsContainer.innerHTML = html;
    }); */
    const userUid = window.localStorage.getItem('uid');
    const subColRef = collection(database, 'posts', userUid, 'userPosts');

    onSnapshot(subColRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            console.log(post.valorPost);
        });
    });
};
