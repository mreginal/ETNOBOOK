async function loginUser() {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    try {
        const response = await fetch('https://etnobook-api.onrender.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });

        const data = await response;

        if (data) {
           console.log("Login realizado com sucesso") // Exibe a mensagem de resposta do servidor para sucesso
           window.location.href = "../views/main.html";
        } else {
            alert(data.msg); // Exibe a mensagem de erro do servidor para falha
            console.log("Token não encontrado com sucesso")
        }
    } catch (error) {
        console.error('Erro ao logal usuário:', error);
        alert('Erro ao logar usuário. Por favor, tente novamente.');
    }
}



