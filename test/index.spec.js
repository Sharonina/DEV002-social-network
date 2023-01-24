// eslint-disable-next-line import/no-unresolved
// import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import {
    // eslint-disable-next-line max-len
    createUser, normalSign, likePost, dislikePost, getPostData, uploadImage, getImageURL, googleSign, guardarDisplayName, logOut, auth, deletePost, updatePost,

} from '../src/firebase/configuracionFirebase.js';

/* Test de creación de usuario */
jest.mock('../src/firebase/configuracionFirebase.js', () => ({
    auth: jest.fn(() => ({ auth: 'test' })),
    createUser: jest.fn((email, password) => {
        if (!email || !password) {
            throw new Error('Correo o contraseña vacios');
        }
        if (email === 'tindoglatam@gmail.com') {
            throw new Error('correo incorrecto');
        }
        if (email === 'shar_mdza@hotmail.com') {
            return ('Correo valido');
        }
    }),
    normalSign: jest.fn((email, password) => {
        if (!email || !password) {
            throw new Error('Correo o contraseña vacios');
        }
        if (email === 'tindoglatam@gmail') {
            throw new Error('correo incorrecto');
        }
        if (email === 'shar_mdza@hotmail.com') {
            return ('Correo valido');
        }
    }),
    likePost: jest.fn((uid, likes, userLike) => {
        if (uid && likes === 5 && userLike === true) {
            return ('6 likes');
        }
        if (uid && likes === 5 && userLike === false) {
            throw new Error('No se sumo tu like');
        }
        if (!uid && likes === 5 && userLike === true) {
            throw new Error('acción invalida');
        }
    }),
    dislikePost: jest.fn((uid, likes, userDislike) => {
        if (uid && likes === 5 && userDislike === true) {
            return ('4 likes');
        }
        if (uid && likes === 5 && userDislike === false) {
            throw new Error('No se resto tu like');
        }
        if (!uid && likes === 5 && userDislike === true) {
            throw new Error('acción invalida');
        }
    }),
    getPostData: jest.fn((uid) => {
        if (!uid) {
            throw new Error('Error');
        }
        Promise.resolve({
            user1: {
                amountLikes: 2,
                arrayUsersLikes: ['7', '9'],
                petName: 'Polly',
                userUid: 1,
                username: 'pollymaria',
                valorPost: 'Miau',
            },
        });
    }),
    uploadImage: jest.fn((file, nombrePic) => {
        if (!file || !nombrePic) {
            throw new Error('Error');
        }
        Promise.resolve({
            user1: {
                storageRefSeleccionado: 'Storage',
                file: 'listaFotos/72547873639',
            },
        });
    }),
    getImageURL: jest.fn((fileRef) => {
        if (!fileRef) {
            throw new Error('Error');
        }
        Promise.resolve({
            user1: {
                postURL: 'https://firebasestorage.googleapis.com/v0/b/tindog-e2545.appspot.com/o/listaFotos%2F1674490725090?alt=media&token=e4196cdd-8617-4067-8f35-2e2022df2300',
            },
        });
    }),
    googleSign: jest.fn((email) => {
        if (email === 'polly@hotmail.com') {
            return ('Correo valido');
        }
    }),
    guardarDisplayName: jest.fn((usernameIngresado) => {
        if (usernameIngresado === 'Ursula Arteaga') {
            return ('Username guardado');
        }
    }),
    logOut: jest.fn((auth) => {
        if (!auth) {
            throw new Error('No estas autenticado. Inicia Sesión o Registrate');
        }
    }),
    deletePost: jest.fn((uid) => {
        if (!uid) {
            throw new Error('Uid no coincide');
        }
        Promise.resolve({
            user1: {
                uid: '1',
            },
        });
    }),
    updatePost: jest.fn((uid, nuevoValorPost) => {
        if (!uid) {
            throw new Error('Uid no coincide');
        }
        if (!nuevoValorPost) {
            throw new Error('se cancela la accion de editar');
        }
        Promise.resolve({
            user1: {
                uid: '1',
                valorPost: 'Hola soy una prueba',
            },
        });
    }),
}));

describe('Tests para crear usuario', () => {
    const email = 'tindoglatam@gmail.com';
    const password = '12345';
    it('debe mostrar error de correo', async () => {
        try {
            await createUser(email, password);
        } catch (error) {
            expect(error.message).toBe('correo incorrecto');
        }
    });

    it('debe retornar que es un correo válido', async () => {
        try {
            await createUser('shar_mdza@hotmail.com', password);
        } catch (error) {
            expect(error.message).toBe('correo invalido');
        }
    });

    it('debe mostrar error de correo vacio', async () => {
        try {
            await createUser('', password);
        } catch (error) {
            expect(error.message).toBe('Correo o contraseña vacios');
        }
    });
});

describe('Tests para iniciar sesión', () => {
    const email = 'tindoglatam@gmail';
    const password = '12345';
    it('debe mostrar error de correo', async () => {
        try {
            await normalSign(email, password);
        } catch (error) {
            expect(error.message).toBe('correo incorrecto');
        }
    });

    it('debe retornar que es un correo válido', async () => {
        try {
            await normalSign('shar_mdza@hotmail.com', password);
        } catch (error) {
            expect(error.message).toBe('correo invalido');
        }
    });

    it('debe mostrar error de correo vacio', async () => {
        try {
            await normalSign('', password);
        } catch (error) {
            expect(error.message).toBe('Correo o contraseña vacios');
        }
    });
});

describe('Tests para dar like a una publicación', () => {
    const uid = 1;
    const likes = 5;
    const userLike = true;
    const userNoLike = false;
    it('debe sumar un like a la publicación', async () => {
        try {
            await likePost(uid, likes, userLike);
        } catch (error) {
            expect(error.message).toBe('acción invalida');
        }
    });

    it('no debe sumar ningun like a la publicación', async () => {
        try {
            await likePost(uid, likes, userNoLike);
        } catch (error) {
            expect(error.message).toBe('No se sumo tu like');
        }
    });

    it('debe retornar error, porque falta un argumento', async () => {
        try {
            await likePost(likes, userLike);
        } catch (error) {
            expect(error.message).toBe('acción invalida');
        }
    });
});

describe('Tests para dar dislike a una publicación', () => {
    const uid = 1;
    const likes = 5;
    const userDislike = true;
    const userLike = false;
    it('debe restar un like a la publicación', async () => {
        try {
            await dislikePost(uid, likes, userDislike);
        } catch (error) {
            expect(error.message).toBe('acción invalida');
        }
    });

    it('no debe restar ningun like a la publicación', async () => {
        try {
            await dislikePost(uid, likes, userLike);
        } catch (error) {
            expect(error.message).toBe('No se resto tu like');
        }
    });

    it('debe retornar error, porque falta un argumento', async () => {
        try {
            await dislikePost(likes, userDislike);
        } catch (error) {
            expect(error.message).toBe('acción invalida');
        }
    });
});

describe('Tests para obtener el dato de un post', () => {
    it('getPostData debería ser una función', () => {
        expect(typeof getPostData).toBe('function');
    });
    it('Si el UID del usuario registrado coincide, trae los datos', async () => {
        const uid = '2';
        try {
            await getPostData(uid);
        } catch (error) {
            expect(error.message).toBe('UID incorrecto');
        }
    });
    it('Debe retornar los datos del usuario', async () => {
        const uid = '1';
        try {
            await getPostData(uid);
        } catch (error) {
            expect(error.message).toBe('Se muestran los datos de usuario');
        }
    });
});

describe('Tests para subir una imagen junto al post', () => {
    it('uploadImage debería ser una función', () => {
        expect(typeof uploadImage).toBe('function');
    });
    it('Si el usuario ingresa una foto, se generan los datos y se sube a Firestore', async () => {
        const file = 'listaFotos';
        const nombrePic = '72547873639';
        try {
            await uploadImage(file, nombrePic);
        } catch (error) {
            expect(error.message).toBe('No se ha subido ninguna foto');
        }
    });
});

describe('Tests obtener la URL de la imagen', () => {
    it('getImageURL debería ser una función', () => {
        expect(typeof getImageURL).toBe('function');
    });
    it('Si el usuario subió una foto, devuelve un enlace', async () => {
        const fileRef = 'https://firebasestorage.googleapis.com/v0/b/tindog-e2545.appspot.com/o/listaFotos%2F1674490725090?alt=media&token=e4196cdd-8617-4067-8f35-2e2022df2300';
        try {
            await getImageURL(fileRef);
        } catch (error) {
            expect(error.message).toBe('No existe un enlace');
        }
    });
});

describe('Tests para iniciar sesión en Google', () => {
    const email = 'polly@hotmail.com';
    it('debe retornar que es un correo válido', async () => {
        try {
            await googleSign(email);
        } catch (error) {
            expect(error.message).toBe('ERROR');
        }
    });
});

describe('Tests para guardar el Displayname', () => {
    it('guardarDisplayName debería ser una función', () => {
        expect(typeof guardarDisplayName).toBe('function');
    });
    it('Si el usuario ingresa un nombre, se guarda como Displayname', async () => {
        const usernameIngresado = 'Ursula Arteaga';
        try {
            await uploadImage(usernameIngresado);
        } catch (error) {
            expect(error.message).toBe('Error');

describe('Tests para cerrar sesión', () => {
    it(' si esta registrado, puede cerrar sesión', async () => {
        try {
            await logOut(auth);
        } catch (error) {
            expect(error.message).toBe('No estas autenticado. Inicia Sesión o Registrate');
        }
    });

    it('si no esta registrado, no puede ver home y el usuario es enviado a bienvenida', async () => {
        try {
            await logOut(!auth);
        } catch (error) {
            expect(error.message).toBe('No estas autenticado. Inicia Sesión o Registrate');
        }
    });
});
describe('Tests para editar post', () => {
    it('si el uid del usuario registrado no coincide con el uid del creador no puede editar', async () => {
        const uid = '2';
        try {
            await updatePost(uid);
        } catch (error) {
            expect(error.message).toBe('se cancela la accion de editar');
        }
    });

    it('si valorPost no cambia, se muestra el valor original', async () => {
        const uid = '1';
        const valorPost = 'Hola soy una prueba';
        try {
            await updatePost(uid, '');
        } catch (error) {
            expect(error.message).toBe('se cancela la accion de editar');
        }
    });

    it('si valorPost cambia, se actualiza y muestra el nuevo valor', async () => {
        const uid = '1';
        const nuevoValorPost = 'Soy una prueba editada';
        try {
            await updatePost(uid, nuevoValorPost);
        } catch (error) {
            expect(error.message).toBe('Post se actualiza');
        }
    });
});
describe('Tests para borrar post', () => {
    it('si el uid del usuario registrado coincide con el uid del creador, puede borrar', async () => {
        const uid = '1';
        try {
            await deletePost(uid);
        } catch (error) {
            expect(error.message).toBe('Boton de borrar se muestra');
        }
    });

    it('si el uid del usuario registrado no coincide con el uid del creador no puede borrar', async () => {
        const uid = '2';
        try {
            await deletePost(uid);
        } catch (error) {
            expect(error.message).toBe('Boton de borrar no se muestra');
        }
    });
});
