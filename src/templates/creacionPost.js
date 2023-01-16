const CreacionPost = () => {
    const view = `
        <article class='post'>
            <textarea type="text" id="ingresoPost" class="areaDeTexto" placeholder="¿En qué estás pensando ahora?" maxlength="160"
            ></textarea>
            <!--<input type="text" name='post' placeholder="¿En qué estás pensando?"/>-->
        </article>
        <section class='botones'>
            <div class="postImageBtn">
                <label for='file' class='addImageButton'>
                    <img src='../assets/picture_gray.png' alt="ícono para subir una imagen al post"/>
                </label>
                <input type='file' class='hide' id='file' accept='image'/>
            </div>
            <div class='ladraloBtn'>
                <button class="ladraloBtn">Ládralo</button>
            </div>
        </section>
    `;
    return view;
};
export default CreacionPost;
