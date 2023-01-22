import {
    onSnapshot, collection, query, where, getDocs, doc, getDoc, serverTimestamp, orderBy,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import {
    database, auth, storage, currentUser, deletePost, getPostData, getPostData2, likePost, dislikePost, getPost, updatePost,
} from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');
    const postPublicado = contenedor.querySelector('.postPublicado');

    let id = '';
    const postId = '';

    const userUid = window.localStorage.getItem('uid');

    const subColRef = query(collection(database, 'postsTimeline'), orderBy('createdAt', 'desc'));

    onSnapshot(subColRef, (querySnapshot) => {
        postPublicado.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();

            postPublicado.innerHTML += `
                    <section class='postIndividual'>
                        <div class='postEncabezado'>
                            <figure class='imagenCabecera'>
                                <img class='imgUsuario' src='./assets/dog-iconuser.png' data-uid='${doc.id}' alt = 'foto usuario'/>
                            </figure>
                            <div class='name'>
                                <div class='nameSuperior'>
                                    <p class='nombreMascota'>${post.petName}</p>
                                    <p class = 'username'>@${post.username}</p>
                                </div>
                                <p class='tiempo'>${post.fechaPublicacion}</p>
                            </div>
                            <div class='postOptionsContainer hide' data-uid='${doc.id}'>
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
                            <img class ='imagenDelPost' src='${post.postURL}' alt = ''/>
                        </figure>
                        <div class='postBotones'>
                            <button class = 'likes' data-uid='${doc.id}'>
                                <img class='likeImage' data-uid='${doc.id}' src='./assets/heart.png' alt="foto de like a post"/>
                            </button>
                            <span class = 'contadorLikes'>${post.arrayUsersLikes.length}</span>
                        </div>
                    </section>
                `;

            const optionsContainer = postPublicado.querySelectorAll('.postOptionsContainer');
            const validacionPostPropio = () => {
                optionsContainer.forEach((item) => {
                    getPost(item.dataset.uid)
                        .then((elUserUid) => {
                            const datoUsuario = elUserUid.data().userUid;
                            // console.log(datoUsuario);
                            if (datoUsuario === auth.currentUser.uid) {
                                item.classList.remove('hide');
                            }
                        });
                });
            };
            validacionPostPropio();
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

        // const userProfileImg = contenedor.querySelectorAll('.imgUsuario');

        const editarPostBtn = postPublicado.querySelectorAll('.editarPostImg');
        editarPostBtn.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const docPost = await getPost(e.target.dataset.uid);
                const post = docPost.data();
                id = docPost.id;
                const postMessage = prompt('Edita tu ladrido. Woof!', post.valorPost);
                if (postMessage == null || postMessage === post.valorPost) {
                    console.log('no me editaron');
                } else if (postMessage !== post.valorPost) {
                    updatePost(id, { valorPost: postMessage });
                }
            });
        });

        const likeButton = postPublicado.querySelectorAll('.likes');
        const likeImg = postPublicado.querySelectorAll('.likeImage');
        const contadorLikes = postPublicado.querySelectorAll('.contadorLikes');
        contadorLikes.forEach((btn) => {
            if (btn.innerHTML === '0') {
                btn.classList.add('hide');
            } else {
                btn.classList.remove('hide');
            }
        });

        likeImg.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.src = './assets/heart_rosa.png';
            });
        });

        likeButton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const currentUserLike = auth.currentUser.uid;
                const idLikeButton = e.target.dataset.uid;
                getPostData2(idLikeButton)
                    .then((document) => {
                        const post = document.data();
                        if (!post.arrayUsersLikes.includes(currentUserLike)) {
                            const likes = (post.amountLikes) + 1;
                            likePost(idLikeButton, likes, currentUserLike);
                        } else {
                            const likes = (post.amountLikes) - 1;
                            dislikePost(idLikeButton, likes, currentUserLike);
                            // likeImg.src = './assets/heart.png';
                        }
                    })
                    .catch(() => {
                    });
            });
        });
        const imgUsuario = postPublicado.querySelectorAll('.imgUsuario');

        const eluid = (elemento, uidUnitario) => {
            onAuthStateChanged(auth, () => {
                getDownloadURL(ref(storage, `ikhybex-Bftzx/ ${uidUnitario}`))
                    .then((urlimg) => {
                        // eslint-disable-next-line no-param-reassign
                        elemento.src = urlimg;
                    });
            });
        };
        //
        imgUsuario.forEach((item) => {
            getPost(item.dataset.uid)
                .then((elUserUid) => {
                    const datoUsuario = elUserUid.data().userUid;
                    // console.log(datoUsuario);
                    eluid(item, datoUsuario);
                    // }
                });
        });
        // Comentario de prueba para el commit 2
    });
};
