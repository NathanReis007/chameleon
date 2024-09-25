const Auth = {
    createUser(formData) {
        const createUser = {
            user: formData.get("user"), 
            password: formData.get("password"), 
            email: formData.get("email"), 
            professional: !!formData.get("professional")
        };

        if(createUser.password !== formData.get("password-confirm")) return { status: false, message: 'Senhas diferentes!' };

        const userLocal = localStorage.getItem("user");

        let users = [createUser];
        if(userLocal) {
            users = JSON.parse(userLocal);
            users.push(createUser);
        }

        localStorage.setItem("user", JSON.stringify(users));
        localStorage.setItem("session", `{user: ${user}, email: ${email}}`)
    },

    login(user, password) {
        const userLocal = localStorage.getItem("user");
        if(!userLocal) return { status: false, message: 'Erro: Usuário não cadastrado!' };
        
        const result = JSON.parse(userLocal).find((u) => u.user === user && u.password === password || u.email === user && u.password === password);
        if(!!result) {
            localStorage.setItem("session", JSON.stringify({user: result.user, email: result.email}));
            window.location = "../../index.html";
            return { status: true, message: 'Ok.' };
        }
        $form.reset();
        return { status: false, message: 'Dados inválidos! Verifique seus dados.' };
    },

    logout() {
        localStorage.removeItem("session");
    }
}