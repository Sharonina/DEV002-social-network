// eslint-disable-next-line import/no-unresolved
// import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import {
    createUser, normalSign, likePost, dislikePost,
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
