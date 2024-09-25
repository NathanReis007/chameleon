const $logo = document.querySelector("#logo");
const $menu = document.querySelector("#menu");
const $menuInfo = document.querySelector("#menuInfo");
const $menuMobileItens = document.querySelectorAll(".noActivated");
const toggleMenu = (isToggle=true, elements) => {
    if(isToggle) {
        $menu.classList.toggle("activated");
        $menuInfo.classList.toggle("activated");
        $logo.classList.toggle("activated");
    }
    else {
        $menu.classList.remove("activated");
        $menuInfo.classList.add("activated");
        $logo.classList.remove("activated");
    }

    $menuMobileItens.forEach((menuItem) => {
        if(isToggle) {
            menuItem.classList.toggle("noActivated");
        }
        else {
            menuItem.classList.add("noActivated");
        }
    });
};

const $filtro = document.querySelector("#filtro");
const toggleFiltro = (menu) => {
    $filtro.classList.toggle("activated");
    if(menu) {
        toggleMenu();
    }
}

const $menuConta = document.querySelectorAll(".menuConta");
const toggleMenuConta = (isToggle=true) => {
    if(isToggle) {
        $menuConta.forEach((menu) => menu.classList.toggle("activated"));
    }
    else {
        $menuConta.forEach((menu) => menu.classList.remove("activated"));
    }
}

const closeMenus = () => {
    toggleMenu(false);
    toggleMenuConta(false);
}

const logout = () => {
    openDialog.confirm("Desconectar","Deseja realmente sair da sua conta?").then(response => {
        if(response) {
            Auth.logout();
        }
    });
}