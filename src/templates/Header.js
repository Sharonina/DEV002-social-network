const Header = () => {
    const view = `
        <section class="header">
            <div class="headerSuperior">
                <input class='logoButton' type='image' title='logo' src='../assets/tindog_logo_r.png'/>
                <button class='profileImage' id="menuOpciones">
                    <img class='userImage' src='./assets/dog-iconuser.png' alt="foto de perfil del usuario activo"/>
                </button>
                <div class="menuContainer">
                    <ul class="menu" id="menuLista">
                        <li class="opciones"> <input type="submit" value="Mi perfil"/> </li>
                        <li class="opciones"> <input type="submit" value="Editar perfil"/> </li>
                        <li class="opciones"> <input type="submit" id="cerrarSesion" value="Cerrar Sesión"/></li>
                    </ul>
                </div>
            </div>
            <div class="headerInferior">
                <div class="searchContainer">
                    <input class='searcher' type="text" placeholder="Ingresa nombre de usuario"/>
                    <input class='searcherIcon' type='image' src='../assets/search_icon.png'/>
                </div>
                <div class="matchBtnContainer">
                    <button>
                        <img src='../assets/heart_bco.png' alt="ícono para ingreso a match"/>
                    </button>
                </div>
            </div>
            <div class="container">
            </div>
        </section>
    `;
    return view;
};
export default Header;
