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
                                            <img class ='imagenDelPost' src='./assets/dog-iconuser.png' alt = 'foto usuario'/>
                                            <p class = 'nombreMascota'>      </p>
                                            <p class = 'username'>   </p>
                                            <button>editar</button>
                                        </div> 
                                        <div class='postTexto'>
                                            <p class ='textoPost'>${post.valorPost}</p>
                                        </div>
                                        <div class='postBotones'>
                                            <button>me encorazona</button>
                                            <button>numero de likes</button>
                                        </div>
                                    </section>
                                    `;
        });
    });
};
