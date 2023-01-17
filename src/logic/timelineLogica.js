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
    // console.log(subColRef); 
    // console.log(auth.currentUser);

    /* const petName = [];
    onGetPostData((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            petName.push(postData.petName);
        });
    }); */
    /* database.collection('usuarios').document(userUid).get()addOnSuccessListener onSnapshot(function(result) {
        let data = result.data();
        console.log(data());
    }); */

   /*  const dataPetPost = collection(database, 'usuarios', userUid, 'petName');
    // console.log(dataPetPost.petName);
    onSnapshot(dataPetPost, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const petName = doc.data();
            console.log(petName.petName);
        });
    }); */

    /* const docData = getPostData(userUid);
    console.log(docData.data()); */

    onSnapshot(subColRef, (querySnapshot) => {
        postPublicado.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            console.log(post.valorPost);
            postPublicado.innerHTML += `
                                    <section class = 'postIndividual'>
                                        <div class = 'postEncabezado'>
                                            <figure class ='imagenCabecera'>
                                                <img class = 'imgUsuario' src='./assets/dog-iconuser.png' alt = 'foto usuario'/>
                                            </figure>
                                            <div class='name'>
                                                <p class = 'nombreMascota'>${post.petName}</p>
                                                <p class = 'tiempo'>Tiempo</p>
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
