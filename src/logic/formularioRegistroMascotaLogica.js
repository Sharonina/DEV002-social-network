// eslint-disable-next-line import/no-unresolved
import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { auth, coleccionUsuarios2, storage, coleccionNombresUsuario, database } from '../firebase/configuracionFirebase.js';

import { addDoc, getDocs, doc, setDoc, getFirestore, updateDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { currentUser } from '../firebase/configuracionFirebase.js';
import { valorUid } from './registroUsuarioLogica.js';
import { ref, uploadString } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { collection, query, where } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';


export const formularioRegistroMascotaLogica = (contenedor) => {
    const profileImage = contenedor.querySelector('#profileImg');
    const uploadProfileImage = contenedor.querySelector('#addImageButton')
    const fileImage = contenedor.querySelector('#file')
    const nombre = contenedor.querySelector('#nombreMascota');
    const usuario = contenedor.querySelector('#idUsuario');
    const edad = contenedor.querySelector('#edadMascota');
    const ubicacion = contenedor.querySelector('#dogLocation');//En Firestore existe la opcion de colocar un GeoPoint
    const raza = contenedor.querySelector('#dogBreed');
    const tallaRadios = document.getElementsByName('dogSize');
    const sexoRadios = document.getElementsByName('dogSex');

    //traer los input de los radio  1 por cada uno, validar si el input esta checked para enviar ´el valor correspondiente´
    const mensajeErrorNombre = contenedor.querySelector('#mensajeErrorNombre');
    const mensajeErrorUsuario = contenedor.querySelector('#mensajeErrorUsuario');
    // console.log(mensajeErrorUsuario.innerHTML)
    const mensajeErrorEdad = contenedor.querySelector('#mensajeErrorEdad');
    const mensajeErrorSexo = contenedor.querySelector('#mensajeErrorSexo');
    const mensajeErrorUbicacion = contenedor.querySelector('#mensajeErrorUbicacion');
    const mensajeErrorRaza = contenedor.querySelector('#mensajeErrorRaza');
    const mensajeErrorTalla = contenedor.querySelector('#mensajeErrorTalla');
    const saveUserData = contenedor.querySelector('#guardarDatos');

    /* usuario.addEventListener("keyup", () => {
        getDocs(coleccionNombresUsuario)
            // Nota Pris: Any time you read data from the Database, you receive the data as a DataSnapshot
            .then((snapshot) => {
                const listaUsuarios = [];
                snapshot.docs.forEach((documento) => {
                    listaUsuarios.push({ ...documento.data() });
                    console.log(listaUsuarios);
                });
                const usuarioEncontrado = listaUsuarios.some(elemento => elemento.username === usuario.value);
                if (usuarioEncontrado) {
                    mensajeErrorUsuario.innerHTML = 'Usuario inválido, ya está registrado';
                    mensajeErrorUsuario.classList.remove('hide');
                } else {
                    mensajeErrorUsuario.innerHTML = '';
                    mensajeErrorUsuario.classList.add('hide');
                }
            });
    }); */

    // getDocs(coleccionNombresUsuario)
    //     // Nota Pris: Any time you read data from the Database, you receive the data as a DataSnapshot
    //     .then((snapshot) => {
    //         const listaUsuarios = [];
    //         snapshot.docs.forEach((documento) => {
    //             listaUsuarios.push({ ...documento.data() });
    //             //listaUsuarios.push({ ...documento.data() });
    //             console.log(listaUsuarios);
    //         });
    //         const usuarioEncontrado = listaUsuarios.some(elemento => elemento.username === usuario.value);
    //         console.log(usuarioEncontrado);
    //     });

    function UserException(message, code) {
        this.message = message;
        this.code = code;
        console.log(code); //
    }

    const validateFields = () => {
        mensajeErrorNombre.classList.add('hide');
        mensajeErrorUsuario.classList.add('hide');
        mensajeErrorEdad.classList.add('hide');
        mensajeErrorSexo.classList.add('hide');
        mensajeErrorUbicacion.classList.add('hide');
        mensajeErrorRaza.classList.add('hide');
        //Talla
        mensajeErrorTalla.classList.add('hide');

        function check(radios) {
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) {
                    // console.log('los check fueron elegidos')
                    return true;
                };

            };
            // console.log('los check no han sido elegidos')
            return false;
        };

        const errors = {};

        // Name validation
        if (!nombre.value) {
            errors.name = new UserException('Ingresa el nombre de tu mascota', 'auth/empty-name');
        }

        // Username validation
        if (!usuario.value) {
            errors.username = new UserException('Ingresa un nombre de usuario', 'auth/empty-username');
        }

        // Age validation
        if (!edad.value) {
            errors.age = new UserException('Ingresa la edad', 'auth/empty-age');
        } else if (!(Number.isInteger(parseInt(edad.value)))) {
            errors.age = new UserException('Ingresa un número entero', 'auth/invalid-age');
        }

        // Sex Validation
        if (check(sexoRadios) === false) {
            errors.sex = new UserException('Elige el sexo', 'auth/empty-sex');
        }

        // Location validation
        if (!ubicacion.value) {
            errors.location = new UserException('Ingresa tu ubicación', 'auth/empty-location');
        } else if (typeof ubicacion.value != 'string') {
            errors.location = new UserException('Ingresa solamente palabras', 'auth/invalid-location');
        }

        // Breed validation
        if (!raza.value) {
            errors.breed = new UserException('Ingresa la raza de tu mascota', 'auth/empty-breed');
        } else if (typeof raza.value != 'string') {
            errors.breed = new UserException('Ingresa solamente palabras', 'auth/invalid-breed');
        }

        // Size Validation
        if (check(tallaRadios) === false) {
            errors.size = new UserException('Elige el tamaño', 'auth/empty-size');
        }

        return errors;
    };

//
    const validateUser = async () => {
        let usernameValue = usuario.value;
        const usernamesRef = collection(database, "usernames");
        const q = query(usernamesRef, where("username", "==", usernameValue));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const resultado = doc.data();
            //{username: 'manzanita'}
            if(Object.keys(resultado).length > 0){
                throw new Error('auth/invalid-username')
            }
        });
    }

    // onAuthStateChanged(auth, (user) => {
    //     if (user) { // User is signed in
    //         console.log(user);
    //         const uid = user.uid;
    //         console.log(uid)
    //         window.localStorage.removeItem('uid')
    //         window.localStorage.setItem('uid', uid)
    //         /* uidArray.push(uid) */
    //     }
    // });

    const urlContainer = [];

    if(fileImage){
        const handleChange = () => {
            let reader = new FileReader();
            reader.onload = (e) => {
                let urlImage = e.target.result;
                profileImage.src = urlImage;
                urlContainer.push(urlImage)
                console.log(urlContainer);
            }
            reader.readAsDataURL(fileImage.files[0]);
        }

        fileImage.addEventListener('change', handleChange);
    }

    const subirImagenPerfil = async(valorsillo) => {
        const storageRef = ref(storage, `ikhybex-Bftzx/ ${valorsillo}`);
        await uploadString(storageRef, urlContainer[0], 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
        });
    }

    saveUserData.addEventListener('click', async () => {
        const errors = validateFields();

        try {
            if (Object.keys(errors).length > 0) {
                throw new Error('hay errores');
            }

            await subirImagenPerfil(auth.currentUser.uid);
            await validateUser();
            
            //---------------------------------------------------------------------------------------
            // const guardarDisplayName = (valorUsuario) => updateProfile(auth.currentUser, {
            //     displayName: valorUsuario,
            // });

            // const displayUsuario = guardarDisplayName(usuario.value)
            //----------------------------------------------------------------------------------------



            //PARA ACTUALIZAR DOC ---------------------------------------------------------------------
            const documentoReferencia = doc(getFirestore(), "usuarios", auth.currentUser.uid);
            const usuarios = await updateDoc(documentoReferencia, {
                petName: nombre.value,
                username: usuario.value,
                age: edad.value,
                location: ubicacion.value,
                breed: raza.value,
                // pictureUrl: 'referenciaCS',
                sex: document.querySelector('input[name="dogSex"]:checked').value,
                size: document.querySelector('input[name="dogSize"]:checked').value,
                esterilizacion: document.getElementById('esterilizacion').checked,
                vacunasAlDia: document.getElementById('vacunas').checked,
            });

            //YA FUNCIONA-------------------------------------------------------------
            setDoc(doc(getFirestore(), "usernames", auth.currentUser.uid), {
                username: usuario.value,
            });
            //YA FUNCIONA-------------------------------------------------------------

            window.location.href = '/';

        } catch (error) {
            console.log(error, 'error');
            if (error?.code === 'auth/empty-name' || errors?.name?.code === 'auth/empty-name') {
                mensajeErrorNombre.innerHTML = 'Ingresa el nombre de tu mascota';
                mensajeErrorNombre.classList.remove('hide');
            } else {
                mensajeErrorNombre.classList.add('hide');
            }

            if (errors?.username?.code === 'auth/empty-username') {
                mensajeErrorUsuario.innerHTML = 'Ingresa el nombre de usuario';
                mensajeErrorUsuario.classList.remove('hide');// show
            } else if (errors?.username?.code === 'auth/invalid-username' || error.message === 'auth/invalid-username') {
                //'Usuario inválido, ya está registrado
                mensajeErrorUsuario.innerHTML = 'Usuario inválido, ya está registrado';
                mensajeErrorUsuario.classList.remove('hide');
            } else {
                mensajeErrorUsuario.innerHTML = '';
                mensajeErrorUsuario.classList.add('hide');
            }

            if (errors?.age?.code === 'auth/empty-age') {
                mensajeErrorEdad.innerHTML = 'Ingresa la edad';
                mensajeErrorEdad.classList.remove('hide');// show
            } else if (errors?.age?.code === 'auth/invalid-age') {
                mensajeErrorEdad.innerHTML = 'Ingresa una edad válida. Por ejemplo: 5';
                mensajeErrorEdad.classList.remove('hide');// show
            } else {
                mensajeErrorEdad.classList.add('hide');// hide
            }

            if (errors?.sex?.code === 'auth/empty-sex') {
                mensajeErrorSexo.innerHTML = 'Elige el sexo';
                mensajeErrorSexo.classList.remove('hide');// show
            } else {
                mensajeErrorSexo.classList.add('hide');// hide
            }

            if (errors?.location?.code === 'auth/empty-location') {
                mensajeErrorUbicacion.innerHTML = 'Ingresa tu ubicación';
                mensajeErrorUbicacion.classList.remove('hide');// show
            } else if (errors?.location?.code === 'auth/invalid-location') {
                mensajeErrorUbicacion.innerHTML = 'Ingresa una ubicación válida. Por ejemplo: Sao Paulo, Brasil';
                mensajeErrorUbicacion.classList.remove('hide');// show
            } else {
                mensajeErrorUbicacion.classList.add('hide');// hide
            }

            if (errors?.breed?.code === 'auth/empty-breed') {
                mensajeErrorRaza.innerHTML = 'Ingresa la raza';
                mensajeErrorRaza.classList.remove('hide');// show
            } else if (errors?.breed?.code === 'auth/invalid-breed') {
                mensajeErrorRaza.innerHTML = 'Ingresa una raza válida. Por ejemplo: Golden Retriever';
                mensajeErrorRaza.classList.remove('hide');// show
            } else {
                mensajeErrorRaza.classList.add('hide');// hide
            }

            if (errors?.size?.code === 'auth/empty-size') {
                mensajeErrorTalla.innerHTML = 'Elige el tamaño';
                mensajeErrorTalla.classList.remove('hide');// show
            } else {
                mensajeErrorTalla.classList.add('hide');// hide
            }

        }
    });
};
