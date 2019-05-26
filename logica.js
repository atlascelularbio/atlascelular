var biblioteca = [
    ['Estrutura 1', 'Descrição da estrutura 1'],
    ['Estrutura 2', 'Descrição da estrutura 2'],
    ['Estrutura 3', 'Descrição da estrutura 3'],
    ['Estrutura 4', 'Descrição da estrutura 4'],
    ['Estrutura 5', 'Descrição da estrutura 5'],
]
  
function abrirModal(id) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalConteudo").style.display = "block";
  document.getElementById("tituloModal").innerHTML = biblioteca[id][0];
  document.getElementById("descricaoModal").innerHTML = biblioteca[id][1];
}
  
function fecharModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalConteudo").style.display = "none";
}