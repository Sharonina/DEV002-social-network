import {
    onSnapshot, collection, query, where, getDocs, doc, getDoc,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import {
    database, auth, storage, currentUser, deletePost, getPostData, getPostData2, likePost, dislikePost, getPost, updatePost
} from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');
    const postPublicado = contenedor.querySelector('.postPublicado');
    let id = '';

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
                            <button class='editarPost'>
                                <img class='editarPostImg' src='./assets/pencil.png' data-uid='${doc.id}' alt="Ícono para editar post"/>
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
                        <button class = 'likes' data-uid='${doc.id}'>
                            <img class='likeImage' data-uid='${doc.id}' src='./assets/heart.png' alt="foto de like a post"/>
                        </button>

                        <!-- <button class = 'contadorLikes'>${post.arrayUsersLikes.length}</button> -->

                        <span class = 'contadorLikes'>${post.arrayUsersLikes.length}</span>

                    </div>
                </section>
            `;
        });

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
        });

        const editarPostBtn = postPublicado.querySelectorAll('.editarPostImg');
        editarPostBtn.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const docPost = await getPost(e.target.dataset.uid);
                const post = docPost.data();
                console.log(post.valorPost);
                id = docPost.id;
                console.log(id);
                let postMessage = prompt('Edita tu ladrido. Woof!', post.valorPost);
                if (postMessage == null || postMessage === post.valorPost) {
                    console.log('no me editaron');
                } else if (postMessage !== post.valorPost) {
                    console.log('post editado');
                    updatePost(id, { valorPost: postMessage });
                }
            });
        });

        const likeImg = postPublicado.querySelectorAll('.likeImage');
        const likeButton = postPublicado.querySelectorAll('.likes');
        likeButton.forEach((btn) => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                console.log(dataset.uid);
                const currentUserLike = auth.currentUser.uid;
                const idLikeButton = dataset.uid;
                getPostData2(idLikeButton)
                    .then((document) => {
                        const post = document.data();
                        console.log(post);
                        if (!post.arrayUsersLikes.includes(currentUserLike)) {
                            const likes = (post.amountLikes) + 1;
                            likePost(idLikeButton, likes, currentUserLike);
                            likeImg.src = './assets/heart_rosa.png';
                        } else {
                            const likes = (post.amountLikes) - 1;
                            dislikePost(idLikeButton, likes, currentUserLike);
                            likeImg.src = './assets/heart.png';
                        }
                    })
                    .catch(() => {
                    });
            });
        });
    });
};
