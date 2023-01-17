import { onSnapshot, collection, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import { database, auth, storage, currentUser, deletePost, getPostData } from '../firebase/configuracionFirebase.js';
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
                        <button class = 'likes'>
                            <img class='likeImage' src='./assets/heart.png' alt="foto de like a post"/>
                        </button>
                        <button class = 'contadorLikes'>10</button>
                    </div>
                </section>
            `;
        });
        const borrarPostBtn = postPublicado.querySelectorAll('.borrarPost');
        borrarPostBtn.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deletePost(dataset.uid);
            });
        });
        const editarPostBtn = postPublicado.querySelectorAll('.editarPost');
        editarPostBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                
            });
        });
    });
};
