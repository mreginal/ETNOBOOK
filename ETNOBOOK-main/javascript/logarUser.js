async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://etnobook-api.onrender.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();

            // Armazena o token no localStorage
            localStorage.setItem('jwtToken', JSON.stringify(data.token));
            console.log("Login realizado com sucesso");
            window.location.href = "../views/main.html";
        } else {
            const errorMsg = await response.text();
            alert(errorMsg);
            console.log("Token não encontrado com sucesso");
        }
    } catch (error) {
        console.error('Erro ao logar usuário:', error);
        alert('Erro ao logar usuário. Por favor, tente novamente.');
    }
}
