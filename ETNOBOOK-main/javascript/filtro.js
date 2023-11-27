document.addEventListener('DOMContentLoaded', function () {
    // Recupera os dados do localStorage
    const dados = JSON.parse(localStorage.getItem('dadosBuscados'));

    // Chama a função renderItems passando os dados
    renderItems(dados);
});

function renderizarDadosNaProximaPagina(dados) {
    // Faça o que for necessário para exibir os dados na sua próxima página
    console.log("Renderizando dados na próxima página:", dados);
}


async function fetchData(dados) {
    // Use os dados recebidos ou, se não houver, obtenha novos dados
    const queryKeyword = dados ? dados.nome : document.getElementById('searchInput').value.trim().toLowerCase();

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
            console.log(data);
            // Exibe a resposta do servidor em formato JSON

            // Chama a função para renderizar os itens passando os dados
            renderItems(data);
        } else {
            const errorMsg = await response.text();
            alert(errorMsg); // Exibe a mensagem de erro do servidor para falha
            console.log("Nenhuma planta encontrada");
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function renderItems(data) {
    const itemList = document.getElementById('itemList');

    // Limpa a lista antes de renderizar os novos itens
    itemList.innerHTML = '';

    // Verifica se a consulta é nula antes de renderizar os itens
    if (data && data.length > 0) {
        data.forEach(item => {
            // Crie divs para cada item e adicione à lista
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const nomeCientifico = document.createElement('div');
            nomeCientifico.classList.add('nome-cien');
            nomeCientifico.textContent = `Nome científico: ${item.nomecientifico}`;
            itemDiv.appendChild(nomeCientifico);

            const nomePopular = document.createElement('div');
            nomePopular.classList.add('nome-pop');
            nomePopular.textContent = `Nome popular: ${item.nome}`;
            itemDiv.appendChild(nomePopular);

            const problemas = document.createElement('div');
            problemas.classList.add('problemas');
            problemas.textContent = `Descrição: ${item.descricao}`;
            itemDiv.appendChild(problemas);

            const img = document.createElement('img');
            img.className = 'img_planta_busca';
            img.src = item.imagem;
            itemDiv.appendChild(img);

            itemList.appendChild(itemDiv);
        });
    }
}

// Chama a função para renderizar os itens iniciais
renderItems();
