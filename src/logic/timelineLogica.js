import {
    onSnapshot, collection, query, where, getDocs, doc, getDoc,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import {
    database, auth, storage, currentUser, deletePost, getPostData,
} from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');
    const postPublicado = contenedor.querySelector('.postPublicado');

    // consultar texto del post
    const userUid = window.localStorage.getItem('uid');
    const subColRef = collection(database, 'usuarios', userUid, 'userPosts');

    onSnapshot(subColRef, (querySnapshot) => {
        postPublicado.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const fechaPublicacion = new Date().toLocaleDateString('es-es', { weekday: 'long', month: 'long', day: 'numeric' });
            postPublicado.innerHTML += `
                <section class='postIndividual'>
                    <div class='postEncabezado'>
                        <figure class='imagenCabecera'>
                            <img class='imgUsuario' src='./assets/dog-iconuser.png' alt = 'foto usuario'/>
                        </figure>
                        <div class='name'>
                            <div class='nameSuperior'>
                                <p class='nombreMascota'>${post.petName}</p>
                                <p class = 'username'>@${post.username}</p>
                            </div>
                            <p class='tiempo'>${fechaPublicacion}</p>
                        </div>
                        <div class='postOptionsContainer'>
                            <button class='editarPost' data-uid='${doc.id}'>
                                <img src='./assets/pencil.png' alt="Ícono para editar post"/>
                            </button>
                            <button class='borrarPost'>
                                <img class='borrarPostImg' src='./assets/bin.png' data-uid='${doc.id}' alt="Ícono para borrar post"/>
                            </button>
                        </div>
                    </div>
                    <div class='postTexto'>
                        <p class ='textoPost'>${post.valorPost}</p>
                    </div>
                    <figure class='postImagen'>
                        <img class ='imagenDelPost' src='' alt = ''/>
                    </figure>
                    <div class='postBotones'>
                        <button class = 'likes'>
                            <img class='likeImage' src='./assets/heart.png' alt="foto de like a post"/>
                        </button>
                        <span class = 'contadorLikes'>10</span>
                    </div>
                </section>
            `;
        });
        /* const optionPostContainer = postPublicado.querySelectorAll('.toggleOptionsContainer');
        const postOptionsBtn = postPublicado.querySelectorAll('.dotsBtn');
        postOptionsBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                optionPostContainer.classList.remove('hide');
            });
        }); */

        const borrarPostBtn = postPublicado.querySelectorAll('.borrarPostImg');
        borrarPostBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let text = '¿Mover a la papelera?';
                if (confirm(text) === true) {
                    deletePost(e.target.dataset.uid);
                } else {
                    text = 'You canceled!';
                }
            });
            /* console.log(dataset.uid);
            deletePost(dataset.uid); */
        });
        /* borrarPostBtn.forEach((btn) => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                console.log(dataset.uid);
                deletePost(dataset.uid);
            });
        }); */
        const editarPostBtn = postPublicado.querySelectorAll('.editarPost');
        editarPostBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {

            });
        });
    });
};
