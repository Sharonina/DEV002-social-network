import { onSnapshot, collection, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import { database, auth, storage, currentUser, deletePost, getPostData2, likePost, dislikePost } from '../firebase/configuracionFirebase.js';
import Timeline from '../templates/Timeline.js';

export const timelineLogica = (contenedor) => {
    const postsContainer = contenedor.querySelector('.Timeline');
    const postPublicado = contenedor.querySelector('.postPublicado');

    // consultar texto del post
    const userUid = window.localStorage.getItem('uid');
    const subColRef = collection(database, 'usuarios', userUid, 'userPosts');
    // const array = []
    // const docId = []
    onSnapshot(subColRef, (querySnapshot) => {
        postPublicado.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            // array.push(post);
            // docId.push(doc.id);
            const fechaPublicacion = new Date().toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric' });
            postPublicado.innerHTML += `
                <section class = 'postIndividual'>
                    <div class = 'postEncabezado'>
                        <figure class ='imagenCabecera'>
                            <img class = 'imgUsuario' src='./assets/dog-iconuser.png' alt = 'foto usuario'/>
                        </figure>
                        <div class='name'>
                            <p class = 'nombreMascota'>${post.petName}</p>
                            <p class = 'tiempo'>${fechaPublicacion}</p>
                        </div>
                        <p class = 'username'>@${post.username}</p>
                        <button class='borrarPost' data-uid='${doc.id}'>Eliminar</button>
                        <button class='editarPost' data-uid='${doc.id}'>Editar</button>
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
                        <button class = 'contadorLikes'>${post.arrayUsersLikes.length}</button>
                    </div>
                </section>
            `;
            // if (post.arrayUsersLikes.length === 0) {
            //     contadorLikes.innerHTML = '';
            // }
            // Boton de likes y dislikes
            // const likeButton = postPublicado.querySelectorAll('.likes');
            // console.log(likeButton);
            // likeButton.forEach((like) => {
            //     like.addEventListener('click', () => {
            //         console.log('me dieron click');
            //         console.log(doc.id);
            //         console.log(post.arrayUsersLikes);
            //         const currentUserLike = post.userUid;
            //         const idLikeButton = doc.id;
            //         if (!post.arrayUsersLikes.includes(currentUserLike)) {
            //             console.log('le sumaron 1 :D ');
            //             const likes = (post.amountLikes) + 1;
            //             likePost(idLikeButton, likes, currentUserLike);
            //         } else {
            //             console.log('le restaron 1 :(');
            //             const likes = (post.amountLikes) - 1;
            //             dislikePost(idLikeButton, likes, currentUserLike);
            //         }
            //     });
            // });
        });
        const borrarPostBtn = postPublicado.querySelectorAll('.borrarPost');
        borrarPostBtn.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                console.log(dataset.uid);
                deletePost(dataset.uid);
            });
        });
        const editarPostBtn = postPublicado.querySelectorAll('.editarPost');
        editarPostBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                
            });
        });
        // querySnapshot.forEach((doc) => {
        // console.log(array[0]);
        // console.log(docId[0]);
        // Boton de likes y dislikes
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
                        } else {
                            const likes = (post.amountLikes) - 1;
                            dislikePost(idLikeButton, likes, currentUserLike);
                        }
                    })
                    .catch(() => {
                    });
            });
        });
        // const contadorLikes = contenedor.querySelectorAll('.contadorLikes');
        // contadorLikes.forEach((btn) => {
        //     console.log((btn.innerHTML === 0) ? 'lala');
        // });
        // console.log(likeButton);
        // likeButton.forEach((like) => {
        //     like.addEventListener('click', ({ target: { dataset } }) => {
        //         console.log('me dieron click');
        //         console.log(docId[0]);
        //         console.log(array[0].arrayUsersLikes);
        //         const currentUserLike = auth.currentUser.userUid;
        //         let idLikeButton = docId[0];
        //         getPostData2(idLikeButton)
        //             .then((document) => {
        //                 const post = document.data();
        //                 console.log(post);
        //                 console.log('Si pasa');
        //                 if (!post.arrayUsersLikes.includes(currentUserLike)) {
        //                     console.log('le sumaron 1 :D ');
        //                     const likes = (post.amountLikes) + 1;
        //                     likePost(idLikeButton, likes, currentUserLike);
        //                 } else {
        //                     console.log('le restaron 1 :(');
        //                     const likes = (post.amountLikes) - 1;
        //                     dislikePost(idLikeButton, likes, currentUserLike);
        //                 }
        //             });
        //         idLikeButton = '';
        //     });
        // });
    });
};
