const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // Importe o body-parser

const { configureCors } = require('../cors/cors');

const app = express();
const port = 3000;

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        clientId: 'seu-client-id',
        clientSecret: 'seu-client-secret',
        refreshToken: 'seu-refresh-token',
        accessToken: 'seu-access-token',
    },
});


// Configuração do CORS
configureCors(app);

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json()); // Ou use bodyParser.json() se preferir

// Rota para enviar e-mails
app.post('/enviar-email', (req, res) => {
    const { remetente, destinatario, assunto, mensagem } = req.body;

    // Configuração do e-mail
    const mailOptions = {
        from: remetente,
        to: destinatario,
        subject: assunto,
        text: mensagem,
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar o e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('E-mail enviado com sucesso');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
