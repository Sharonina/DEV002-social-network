// eslint-disable-next-line import/no-unresolved
// import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import {
    normalSign, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, createUser,
} from '../src/firebase/configuracionFirebase.js';

jest.mock('../src/firebase/configuracionFirebase.js', () => ({
    auth: jest.fn(() => ({ auth: 'test' })),
    createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
        if (!email || !password) {
            throw new Error('Error');
        }
        Promise.resolve({
            email: 'ingrid',
        });
    }),
}));

describe('Tests para crear usuario', () => {
    const email = 'tindoglatam@gmail.com';
    const password = '123456';
    it('Debería poder llamar a createUserWithEmailAndPassword', () => {
        createUser(email, password);
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
});
