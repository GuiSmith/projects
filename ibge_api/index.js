fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
.then(data => data.json())
    .then(states => {
    //Exibica��o de dados com repeti��o e sem filtros (estados gerais)
  states.forEach(function(state){
    showOption(state.nome, state.sigla,"state-input");
  });
  const currentState = document.getElementById("state-input");
  currentState.addEventListener("click",function(){
    const cities = document.querySelectorAll("#city-input > *");
    cities.forEach(function(city){
      city.remove();
    });
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${currentState.value}/municipios`)
    .then(data => data.json())
        .then(cities => {
        //Exibi��o de dados com repeti��o e com filtro (munic�pios de um estado)
      cities.forEach(function(city){
        showOption(city.nome,city.nome,"city-input");
      });
    });
  });
});

//Dica de Estado
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/35")
    .then(data => data.json())
    .then(state => {
        //Exibi��o de dados sem repeti��o e com filtro (estado de S�o Paulo)
        document.querySelector('#state-tip').textContent = state.nome;
});

//Dica de cidade
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios/3534401")
    .then(data => data.json())
    .then(city => {
        //Exibi��o de dados sem repeti��o e com filtro (cidade de Osasco)
        document.querySelector('#city-tip').textContent = city.nome;
    });


function showOption(text, value, parentId){
  const parent = document.getElementById(parentId);
  const element = document.createElement("option");
  element.textContent = text;
  element.value = value;
  parent.appendChild(element);
}