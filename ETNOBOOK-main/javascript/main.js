const apiUrl = 'https://etnobook-api.onrender.com/plantas';

function obterDadosDaAPI() {
    console.log("teste");
    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            throw error;
        });
}

function redirecionarParaPaginaDetalhada(planta) {
    // Cria elementos HTML para exibir detalhes da planta

    const detalhesContainer = document.createElement('div');
    detalhesContainer.className = 'detalhes-container';

    const nomePopular = document.createElement('h1');
    nomePopular.className = 'nome-popular';
    nomePopular.textContent = `Nome: ${planta.nome}`;

    const nomeCientifico = document.createElement('h2');
    nomeCientifico.className = 'nome_cientifico';
    nomeCientifico.textContent = `Nome Científico: ${planta.nomecientifico}`;

    const descricao = document.createElement('p');
    descricao.className = 'descricao';
    descricao.textContent = `Descrição: ${planta.descricao}`;

    const img = document.createElement('img');
    img.className = 'img_planta';
    img.src = planta.imagem; // Assumindo que planta.nomeImagem é a URL da imagem

    // Adiciona o texto "Artigos:" antes da lista de artigos
    const textoArtigos = document.createElement('p');
    textoArtigos.textContent = 'Artigos:';
    detalhesContainer.appendChild(textoArtigos);

    // Cria um elemento de âncora para o primeiro artigo
    const primeiroLinkArtigos = document.createElement('a');
    primeiroLinkArtigos.textContent = `Artigo 1`;
    primeiroLinkArtigos.setAttribute('href', planta.artigo[0]);
    primeiroLinkArtigos.setAttribute('target', '_blank'); // Abre em uma nova aba/janela

    // Adiciona o primeiro link à mesma linha que a palavra "Artigos"
    textoArtigos.appendChild(primeiroLinkArtigos);

    // Itera sobre os artigos, começando do segundo artigo
    for (let i = 1; i < planta.artigo.length; i++) {
        const linkArtigos = document.createElement('a');
        linkArtigos.textContent = `Artigo ${i + 1}`;
        linkArtigos.setAttribute('href', planta.artigo[i]);
        linkArtigos.setAttribute('target', '_blank'); // Abre em uma nova aba/janela

        // Cria um elemento de bloco (parágrafo) para envolver cada link de artigo
        const paragrafo = document.createElement('p');
        paragrafo.appendChild(linkArtigos);

        // Adiciona o elemento de bloco ao detalhesContainer
        detalhesContainer.appendChild(paragrafo);
    }

    // Adiciona os elementos ao container
    detalhesContainer.appendChild(nomePopular);
    detalhesContainer.appendChild(nomeCientifico);
    detalhesContainer.appendChild(descricao);
    detalhesContainer.appendChild(img)

    // Adiciona o container à página
    document.body.innerHTML = '';
    document.body.appendChild(detalhesContainer);
}

document.addEventListener('DOMContentLoaded', function () {
    obterDadosDaAPI()
        .then(function (plantas) {
            const elementosSwiper = criarElementosSwiper(plantas);
            const swiperWrapper = document.querySelector('.swiper-wrapper');

            elementosSwiper.forEach(function (elemento, index) {
                swiperWrapper.appendChild(elemento);

                // Adiciona evento de clique a cada div com a classe 'swiper-slide'
                elemento.addEventListener('click', function () {
                    // Lógica de redirecionamento aqui
                    console.log(`Clicou na planta: ${plantas[index].nomecientifico}`);
                    redirecionarParaPaginaDetalhada(plantas[index]);
                });
            });

            // Inicializa o Swiper após adicionar os elementos
            const swiper = new Swiper("#swiper-main", {
                slidesPerView: 2,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })
        .catch(function (error) {
            console.error('Erro ao processar dados:', error);
        });
});

function criarElementosSwiper(plantas) {
    const elementosSwiper = [];

    plantas.forEach(function (planta) {
        const divPlanta = document.createElement('div');
        divPlanta.className = 'swiper-slide';
        divPlanta.setAttribute('data-id', planta.nomecientifico);

        const nome_cientifico = document.createElement('p');
        nome_cientifico.className = 'nome_cientifico';
        nome_cientifico.textContent = planta.nomecientifico;

        const descricao_planta = document.createElement('p');
        descricao_planta.className = 'descricao_planta';
        descricao_planta.textContent = planta.descricao;

        const nome_popular = document.createElement('h1');
        nome_popular.className = 'nome_popular';
        nome_popular.textContent = planta.nome;

        const img = document.createElement('img');
        img.className = 'img_planta';
        img.src = planta.imagem // Assumindo que planta.imagem é a URL da imagem
        console.log(planta.imagem);

        divPlanta.appendChild(nome_popular);
        divPlanta.appendChild(nome_cientifico);
        divPlanta.appendChild(img);
        elementosSwiper.push(divPlanta);
    });

    return elementosSwiper;
}
