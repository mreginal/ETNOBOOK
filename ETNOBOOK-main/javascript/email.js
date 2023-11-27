function enviarEmail() {
    // Recupere os valores dos campos
    var nome = document.getElementById("nome").value;
    var remetente = document.getElementById("remetente").value;
    var assunto = document.getElementById("assunto").value;
    var mensagem = document.getElementById("mensagem").value;

    // Construa o objeto de dados a ser enviado para a API
    var data = {
        remetente: remetente,
        destinatario: "testeapiETNOBOOK@gmail.com",
        assunto: assunto,
        mensagem: mensagem
    };

    // Faça uma solicitação POST para a sua API
    fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Erro:', error));
}



document.addEventListener('DOMContentLoaded', function () {
    console.log("teste");
    document.querySelector('.botao-enviar').addEventListener('click', enviarEmail);
});
