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
    const uploadProfileImage = contenedor.querySelector('#addImageButton');
    const fileImage = contenedor.querySelector('#file');
    const nombre = contenedor.querySelector('#nombreMascota');
    const usuario = contenedor.querySelector('#idUsuario');
    const edad = contenedor.querySelector('#edadMascota');
    const ubicacion = contenedor.querySelector('#dogLocation');
    const raza = contenedor.querySelector('#dogBreed');
    const tallaRadios = document.getElementsByName('dogSize');
    const sexoRadios = document.getElementsByName('dogSex');
    const mensajeErrorNombre = contenedor.querySelector('#mensajeErrorNombre');
    const mensajeErrorUsuario = contenedor.querySelector('#mensajeErrorUsuario');
    const mensajeErrorEdad = contenedor.querySelector('#mensajeErrorEdad');
    const mensajeErrorSexo = contenedor.querySelector('#mensajeErrorSexo');
    const mensajeErrorUbicacion = contenedor.querySelector('#mensajeErrorUbicacion');
    const mensajeErrorRaza = contenedor.querySelector('#mensajeErrorRaza');
    const mensajeErrorTalla = contenedor.querySelector('#mensajeErrorTalla');
    const saveUserData = contenedor.querySelector('#guardarDatos');

    function UserException(message, code) {
        this.message = message;
        this.code = code;
        console.log(code);
    }

    const validateFields = () => {
        mensajeErrorNombre.classList.add('hide');
        mensajeErrorUsuario.classList.add('hide');
        mensajeErrorEdad.classList.add('hide');
        mensajeErrorSexo.classList.add('hide');
        mensajeErrorUbicacion.classList.add('hide');
        mensajeErrorRaza.classList.add('hide');
        mensajeErrorTalla.classList.add('hide');

        function check(radios) {
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) {
                    return true;
                };

            };
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

    const validateUser = async () => {
        let usernameValue = usuario.value;
        const usernamesRef = collection(database, "usernames");
        const q = query(usernamesRef, where("username", "==", usernameValue));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const resultado = doc.data();
            if(Object.keys(resultado).length > 0){
                throw new Error('auth/invalid-username')
            }
        });
    }

    const urlContainer = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEXT1t3Y19bb2tre3t3k4+HR0NDIyc3AwMK2t7ivr6+mpaWenJuEhZBmaHdQUmQ/QVIcDibjAAADfklEQVR42u2Wu29SURzHrya3D0dbEmMcSB8mGgcL1MdY7qFEXbjQs9SFRKnaJqYLbWiXJgasslq4J01cHAxQnRwEEgcX49Q41cE4d1D8D8DzO5xy4DwKxpVvwuHmnvv5fc/v/H73YQ011FD/q5XN5ym8Yg0uG/tIEWPs+q0BhfF0hGQBca5bA8nGE2iRIQk0CGOv2DiOOLKEkOPvl1GGlFJ4BqEoIHCAomUvfZpFpl7yUi4CJE2RED2KVGrehhl5Ui+RAp6kF17wKBFHoO0aIUaf0UqVkCyLnfFY9qArNI6XNCB5Go+wdS28yLF1gaIUITmDCcx5LPZNSAVYwMHbYLMKSBFScTK09nDAxMyzOsKuwFQBdnZxN+3jJpB/nZ4v6pAxMCFZQMLnQ/P0n+s+ICSpXRcBhCftm0Anuspi7WiQ/RogaYyYgqijO4DoVjZSqTLERbKiDPFiCjIOEyZEn8xyP0RNZq1OTkeymuz7IAU1+36IpyD1ahvBRiSm60lWSnrNW9SW8/Ihrwsoqe4xdwmh981XbeRe64iOt/nUuqaNecNE/jQ/t5GnrV90vGtAaLsKpPVNILzHNIVZE4hz2PzQRq61jum4zKf2ZBfYY978F7/yxo8cPOPNrytMvgvpkUCK+uKTgoqs6RG7Yka2OeLJxe8gkwpS0yKj9Sp3HxgZk5HLBx8THMmfIDHN40Ugt342Gz+WBMKU1CMehgudT61Go3HURvYHQw4BOZaQdRPCUrjUajZ+v2GEY0DGJcR53Wp8QW0EnlaavlyWEBR59x1qGkIobESIQGZh0248gBdFgv6gMTStvNqN+GAH5hN8WDC4bPe4wNW+OB1mB0PiaN6lSWNMB/ADRLew/W5kAU8EZzFOBOfwTDeSk28XgSAfdnEcBhd1I4VTkDl4HYfZ5wXfMfUes1kkUZfAFBRkahoJF1BMul0E0quwQJJyv/RHYlK/iFwkQZ5qX57rIEXs9kGkFgNEvvmdfAfZ0SKFEeyGegi/cNmTu5KfPZNyg4II+K18ZzIruQjvM3iCOzgB6D8Rz4hYdurs1HQwGLDFq0fjUlI3RS3ajvZsUkVGRTwd4lk6RDzIpFe43Kxqm8d0Z7M6RP+C2aor1upzMSt9IpdEHFk2rEH9it2CSB7bEtM25+RImXJpN2UZ9Lhc1n34P9qIWUaNbKasoYYa6t/1F3AWrLl/AjIsAAAAAElFTkSuQmCC'];

    if(fileImage){
        const handleChange = () => {
            let reader = new FileReader();
            reader.onload = (e) => {
                let urlImage = e.target.result;
                profileImage.src = urlImage;
                urlContainer.unshift(urlImage)
                console.log(urlImage)
                console.log(urlContainer[0]);
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

            setDoc(doc(getFirestore(), "usernames", auth.currentUser.uid), {
                username: usuario.value,
            });

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
                mensajeErrorUsuario.classList.remove('hide');
            } else if (errors?.username?.code === 'auth/invalid-username' || error.message === 'auth/invalid-username') {
                mensajeErrorUsuario.innerHTML = 'Usuario inválido, ya está registrado';
                mensajeErrorUsuario.classList.remove('hide');
            } else {
                mensajeErrorUsuario.innerHTML = '';
                mensajeErrorUsuario.classList.add('hide');
            }

            if (errors?.age?.code === 'auth/empty-age') {
                mensajeErrorEdad.innerHTML = 'Ingresa la edad';
                mensajeErrorEdad.classList.remove('hide');
            } else if (errors?.age?.code === 'auth/invalid-age') {
                mensajeErrorEdad.innerHTML = 'Ingresa una edad válida. Por ejemplo: 5';
                mensajeErrorEdad.classList.remove('hide');
            } else {
                mensajeErrorEdad.classList.add('hide');
            }

            if (errors?.sex?.code === 'auth/empty-sex') {
                mensajeErrorSexo.innerHTML = 'Elige el sexo';
                mensajeErrorSexo.classList.remove('hide');
            } else {
                mensajeErrorSexo.classList.add('hide');
            }

            if (errors?.location?.code === 'auth/empty-location') {
                mensajeErrorUbicacion.innerHTML = 'Ingresa tu ubicación';
                mensajeErrorUbicacion.classList.remove('hide');
            } else if (errors?.location?.code === 'auth/invalid-location') {
                mensajeErrorUbicacion.innerHTML = 'Ingresa una ubicación válida. Por ejemplo: Sao Paulo, Brasil';
                mensajeErrorUbicacion.classList.remove('hide');
            } else {
                mensajeErrorUbicacion.classList.add('hide');
            }

            if (errors?.breed?.code === 'auth/empty-breed') {
                mensajeErrorRaza.innerHTML = 'Ingresa la raza';
                mensajeErrorRaza.classList.remove('hide');
            } else if (errors?.breed?.code === 'auth/invalid-breed') {
                mensajeErrorRaza.innerHTML = 'Ingresa una raza válida. Por ejemplo: Golden Retriever';
                mensajeErrorRaza.classList.remove('hide');
            } else {
                mensajeErrorRaza.classList.add('hide');
            }

            if (errors?.size?.code === 'auth/empty-size') {
                mensajeErrorTalla.innerHTML = 'Elige el tamaño';
                mensajeErrorTalla.classList.remove('hide');
            } else {
                mensajeErrorTalla.classList.add('hide');
            }

        }
    });
};
