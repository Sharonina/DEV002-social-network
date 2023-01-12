const Timeline = () => {
    const view = `
        <!--<section class="timeline">-->
        <article class='post'>
            <textarea type="text" id="ingresoPost" class="areaDeTexto" placeholder="¿En qué estás pensando ahora?"></textarea>
            <!--<input type="text" name='post' placeholder="¿En qué estás pensando?"/>-->
            <section class='botones'>
                <div class="postImageBtn">
                    <button>
                        <img src='../assets/picture_purple.png' alt="ícono para ingreso a match"/>
                    </button>
                </div>
                <button class="ladraloBtn">Ládralo</button>
            </section>
        </article>
        <!--</section>-->
    `;
    return view;
};
export default Timeline;
