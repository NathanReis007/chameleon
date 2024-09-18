const $logo = document.querySelector("#logo");
const $menu = document.querySelector("#menu");
const $menuInfo = document.querySelector("#menuInfo");
const toggleMenu = (isToggle=true) => {
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
};