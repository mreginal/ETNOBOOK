document.addEventListener('DOMContentLoaded', function () {
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    
});

const apiUrl = 'https://etnobook-api.onrender.com/plantas';

async function obterDadosDaAPI() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao obter dados da API');
        }
        return response.json();
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
}

function redirecionarParaPaginaDetalhada(planta) {
    // Verifica se o token JWT está presente
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    if (!jwtToken) {
    // Se o token não estiver presente, exibe um alerta e redireciona para a página de login
    window.alert('Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login.');
    window.location.href = '../views/login.html';
    return;
}

    // Cria elementos HTML para exibir detalhes da planta
    const header = criarElementoHeader();
    const detalhesContainer = criarElementoDetalhes(planta);
    
    document.body.innerHTML = '';
    document.body.appendChild(header);
    document.body.appendChild(detalhesContainer);
}


function criarElementoHeader() {
    const header = document.createElement('header');
    const logo = criarElementoLogo();

    header.appendChild(logo);

    return header;
}

function criarElementoLogo() {
    const logo = document.createElement('img');
    logo.className = 'logo';
    logo.src = '../imagens/etb.png';

    // Redirecionando para home ao clicar na logo do app
    logo.addEventListener('click', function () {
        window.location.href = '../views/main.html';
    });

    return logo;
}

function criarElementoDetalhes(planta) {
    const detalhesContainer = document.createElement('div');
    detalhesContainer.className = 'detalhes-container';

    const informacoesContainer = criarElementoInformacoes(planta);
    const imagemContainer = criarElementoImagem(planta);
    const footer = criarElementoFooter();

    detalhesContainer.appendChild(informacoesContainer);
    detalhesContainer.appendChild(imagemContainer);
    detalhesContainer.appendChild(footer);

    return detalhesContainer;
}

function criarElementoInformacoes(planta) {
    const informacoesContainer = document.createElement('div');
    informacoesContainer.className = 'info-container';

    const nomePopular = criarElementoComTexto('h1', 'nome-popular', `Nome: ${planta.nome}`);
    const nomeCientifico = criarElementoComTexto('h2', 'nome_cientifico', `Nome Científico: ${planta.nomecientifico}`);
    const descricao = criarElementoComTexto('p', 'descricao', `Descrição: ${planta.descricao}`);

    informacoesContainer.appendChild(nomePopular);
    informacoesContainer.appendChild(nomeCientifico);
    informacoesContainer.appendChild(descricao);

    const artigos = criarElementoArtigos(planta.artigo);
    informacoesContainer.appendChild(artigos);

    return informacoesContainer;
}

function criarElementoArtigos(artigos) {
    const textoArtigos = document.createElement('p');
    textoArtigos.textContent = 'Artigos:';

    const linksArtigos = artigos.map((artigo, index) => {
        const link = document.createElement('a');
        link.textContent = `Artigo ${index + 1}`;
        link.setAttribute('href', artigo);
        link.setAttribute('target', '_blank');

        return link;
    });

    textoArtigos.append(...linksArtigos);

    return textoArtigos;
}

function criarElementoImagem(planta) {
    const imagemContainer = document.createElement('div');
    imagemContainer.className = 'img-container';

    const img = document.createElement('img');
    img.className = 'img_planta';
    img.src = planta.imagem;

    imagemContainer.appendChild(img);

    return imagemContainer;
}

function criarElementoFooter() {
    const footer = document.createElement('footer');
    footer.className = 'fixar-rodape';

    const copyright = criarElementoComTexto('p', null, `&copy; Todos os direitos reservados | Etnobook 2023`);
    footer.appendChild(copyright);

    return footer;
}

function criarElementoComTexto(tag, className, textContent) {
    const elemento = document.createElement(tag);
    if (className) {
        elemento.className = className;
    }
    elemento.textContent = textContent;

    return elemento;
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const plantas = await obterDadosDaAPI();
        const elementosSwiper = criarElementosSwiper(plantas);

        const swiperWrapper = document.querySelector('.swiper-wrapper');
        elementosSwiper.forEach((elemento, index) => {
            swiperWrapper.appendChild(elemento);
            elemento.addEventListener('click', () => redirecionarParaPaginaDetalhada(plantas[index]));
        });

        const swiper = new Swiper("#swiper-main", {
            slidesPerView: 2,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    } catch (error) {
        console.error('Erro ao processar dados:', error);
    }
});

function criarElementosSwiper(plantas) {
    return plantas.map(criarElementoSwiper);
}

function criarElementoSwiper(planta) {
    const divPlanta = document.createElement('div');
    divPlanta.className = 'swiper-slide';
    divPlanta.setAttribute('data-id', planta.nomecientifico);

    const nomeCientifico = criarElementoComTexto('p', 'nome_cientifico', planta.nomecientifico);
    const descricaoPlanta = criarElementoComTexto('p', 'descricao_planta', planta.descricao);
    const nomePopular = criarElementoComTexto('h1', 'nome_popular', planta.nome);
    const img = criarElementoImagem(planta);

    divPlanta.appendChild(nomeCientifico);
    divPlanta.appendChild(descricaoPlanta);
    divPlanta.appendChild(nomePopular);
    divPlanta.appendChild(img);

    return divPlanta;
}

async function buscarPersonalizada() {
    const queryKeyword = document.getElementById('busca_filtro').value.trim().toLowerCase();
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    if (!jwtToken) {
    // Se o token não estiver presente, exibe um alerta e redireciona para a página de login
    window.alert('Você precisa estar logado para acessar esta página. Você será para a página de login.');
    window.location.href = '../views/login.html';
    return;
}

    try {
        const response = await fetch('https://etnobook-api.onrender.com/plantas/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: queryKeyword
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Exibe a resposta do servidor em formato JSON

            // Faça algo com os dados, por exemplo, renderize na tela
            renderizarDados(data);
        } else {
            const errorMsg = await response.text();
            alert(errorMsg); // Exibe a mensagem de erro do servidor para falha
            console.log("Nenhuma planta encontrada");
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function renderizarDados(data) {
    // Armazena os dados no localStorage
    localStorage.setItem('dadosBuscados', JSON.stringify(data));

    // Redireciona para a próxima página
    window.location.href = '../views/filtro-busca.html';
}
