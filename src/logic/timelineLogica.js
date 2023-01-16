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
            postPublicado.innerHTML += `
                                    <section class = 'postIndividual'>
                                        <div class = 'postEncabezado'>
                                            <figure class ='imagenCabecera'>
                                                <img src='./assets/dog-iconuser.png' alt = 'foto usuario'/>
                                            </figure>
                                            <div class='name'>
                                                <p class = 'nombreMascota'>Nombre Mascota</p>
                                                <p class = 'tiempo'>Tiempo</p>
                                            </div>
                                            <p class = 'username'>@username</p>
                                            <button>editar</button>
                                        </div> 
                                        <div class='postTexto'>
                                            <p class ='textoPost'>${post.valorPost}</p>
                                        </div>
                                        <figure class='postImagen'>
                                            <img class ='imagenDelPost' src='' alt = ''/>
                                        </figure>
                                        <div class='postBotones'>
                                            <button class = 'likes'>
                                                <img class='likeImage' src='./assets/heart_rosa.png' alt="foto de like a post"/>
                                            </button>
                                            <button class = 'contadorLikes'>10</button>
                                        </div>
                                    </section>
                                    `;
        });
    });
};
