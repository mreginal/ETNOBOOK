async function registerUser() {
    console.log('register');
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="sexo"]:checked').id; // Obtém o ID do radio button selecionado
    const address = document.getElementById('address').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    console.log(name, lastname, email, password, confirmpassword);

    try {
        console.log("chegou aqui")
        
        const response = await fetch('https://etnobook-api.onrender.com/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        
            },
            body: JSON.stringify({
                name,
                lastname,
                birthdate,
                gender,
                address,
                phonenumber,
                email,
                password,
                confirmpassword,
            }),

        });
        console.log("chegou aqui 2")

        const data = await response.json();

        if (response.ok) {
            console.log('Usuário registrado com sucesso:', data);
            window.location.href = "../views/login.html";
        } else {
            console.log("Usuário erro");
            alert(data.msg); // Exibe a mensagem de erro do servidor para falha
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário. Por favor, tente novamente.');
    }
}



