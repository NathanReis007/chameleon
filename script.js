const $logo = document.querySelector("#logo");
const $menu = document.querySelector("#menu");
const $menuInfo = document.querySelector("#menuInfo");
const toggleMenu = () => {
    $menu.classList.toggle("activated");
    $menuInfo.classList.toggle("activated");
};