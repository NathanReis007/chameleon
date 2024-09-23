const $eye = document.querySelector("#eye");
const $password = document.querySelector("#password");

$eye.onclick = () => {
    $password.type = $password.type === 'password' ? 'text' : 'password';
    $eye.src = $password.type === 'password' ? '../../assets/icons/eye-slash.svg' : '../../assets/icons/eye.svg';
}

const $form = document.querySelector("form");
const $submit = document.querySelector("#submit");

$form.oninput = () => {
    $submit.disabled = !$form.checkValidity();
}

$form.onsubmit = (event) => {
    event.preventDefault();

    const user = $form.user.value;
    const password = $form.password.value;

    const result = Auth.login(user, password);
    if(!result.status) {
        window.alert(result.message)
    }
}

Auth.verifyAuth(true);