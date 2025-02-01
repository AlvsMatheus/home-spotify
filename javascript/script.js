/*
o getElement vai "selecionar" a tag que eu quero e transformar em uma variável para eu conseguir modificar ele
*/
const searchInput = document.getElementById('search-input')
const resultsArtist = document.getElementById('result-artist')
const resultPlaylist = document.getElementById('result-playlists')

/*
Quero pedir a Api quando eu realizar o searchTerm 
API: é um conceito que se refere ao mecanismo de comunicação entre sistemas, permitindo que um software requisite e receba dados de outro.
*/

// fetch é uma regra API usada para requisitar o Api
//.then response.json: significa que ele convertará a resposta em json
function requestApi(searchTerm) {
    const url = `http://localhost:300/artists?name_like=${searchTerm}`
    fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults (result));
}

//função para mostrar o card
function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

//foreach: cada elemento é um item
    result.forEach(element => {
//vai pegar o texto da artists.json e colocar no site, também as imagens
//name foi o nome que usamos nos arquivos do json
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });
    resultsArtist.classList.remove('hidden');
}

//addeventlistener "monitora" uma tag esperando uma ação dela

document.addEventListener('input', function(){
//a variável searchTerm recebe o valor da SearchInput em letras minusc.
    const searchTerm = searchInput.value.toLowerCase()

/*
se o searchTerm estiver vazio, o resultPlaylist recebe a classe hidden e o resultsArtist vai tirar a class hidden
(coloquei o estilo "display:none" na class hidden lá no css)
return: para o código terminar após isso
*/
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultsArtist.classList.remove('hidden');
        return;
    }
//o request Api vai pedir o searchTerm
    requestApi(searchTerm);
})
