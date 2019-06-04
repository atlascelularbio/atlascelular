biblioteca = [
  {"estrutura": "Plasmídeo", "descricao" : "São moléculas circulares duplas de DNA capazes de se reproduzir independentemente do DNA cromossômico. Armazenam pequenas quantidades de material genético."},
  {"estrutura": "Nucleóide", "descricao" : "Também chamado de cromatina, é a região da célula onde se localiza o material genético (DNA). Na célula procarionte não é envolvido por membrana"},
  {"estrutura": "Flagelo" , "descricao" : "Filamento oco que favorece a locomoção celular"},
  {"estrutura": "Cílio" , "descricao" : "Estruturas semelhantes ao flagelo, porém numerosas e curtas, que favorecem a locomoção celular"},
  {"estrutura": "Ribossomos" , "descricao" : "Pequenas unidades livres no citoplasma, responsáveis pela síntese proteica da célula"},
  {"estrutura": "Membrana Plasmática" , "descricao" : "Pode ser dividida em cápsula: Estrutura mucosa, composta principalmente por polissacarídeos. Favorece a adesão às superfícies, impede a desidratação e dá proteção à célula... E também em parede celular: Estrutura localizada no exterior da membrana celular. Confere rigidez e determina a forma da célula. Protege e controla as trocas de substâncias com o meio ambiente"},
  {"estrutura": "Granos de alimento" , "descricao" : "Pequenas partículas sólidas que entraram na célula por meio de endocitose, e contém a energia necessária para o funcionamento normal da célula"}
]
  
function abrirModal(posicao, id) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalConteudo").style.display = "block";
  document.getElementById("tituloModal").innerHTML = biblioteca[posicao].estrutura;
  document.getElementById("descricaoModal").innerHTML = biblioteca[posicao].descricao;

  var shape = document.getElementById(id).shape;
  var coords = document.getElementById(id).coords;
  criarSvg(shape, coords);
}
  
function fecharModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalConteudo").style.display = "none";
}

function criarSvg(){
  // Tamanho da imagem, que pode ser modificado, o zoom que ela recebe
  var sc = window.getComputedStyle(document.getElementById('imagem') , null)
  sc = (sc.getPropertyValue('-webkit-transform'))
  sc = sc.split ('(') [1];
  sc = sc.split (')')[0];

  escalaAtual = Math.sqrt((sc.split(",")[0] * sc.split(",")[0] + sc.split(",")[1] * sc.split(",")[1]))

  w = document.getElementById('imagem').clientWidth;
  h = document.getElementById('imagem').clientHeight;

  var fill = 'transparent';
  var strokeWidth = 3;
  var stroke = 'none'
  var style = 'style="fill:'+ fill + ';stroke-width:' + strokeWidth + ';stroke:'+ stroke + '"';
  var viewbox = '"0 0 ' + w + ' ' + h + '"';

  // var html = '<svg id = "svgImagem" stroke-width="3" viewbox = ' + viewbox + '> ';
  var html = '<svg stroke-width="3" width="' + w + '" height="' + h + '"> ';

  
  // Criando elementos do svg

  for (let index = 0; index < 31; index++) {
    elemento = document.getElementById(index);
    coords = elemento.coords.split(",");
    title = elemento.title;
    if(document.getElementById(index).shape == 'rect'){
      var w = Math.abs(parseFloat(coords[2]) - parseFloat(coords[0]));
      var h = Math.abs(parseFloat(coords[3]) - parseFloat(coords[1]));

      Xi = parseInt(coords[0]);
      Yi = parseInt(coords[1]);

      Xf = parseInt(coords[2]);
      Yf = parseInt(coords[3]);

      X2 = parseInt(Xi) + w;
      Y2 = parseInt(Yi) - h;

      // Criar poligono

      html += ' <polygon  title = "' + title + '"onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="'
      + Xi +','+ Yi +
      ' '+ X2 +','+Yi+
      ' '+Xf+','+ Yf +
      ' '+Xi+','+Yf +
     '" ' + style  + '" />'

    }
    if(document.getElementById(index).shape == 'poly'){
      html += ' <polygon title = "'+ title +'" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="';
      for (let i = 0; i < coords.length; i++) {
        if (i%2 == 0) {
          html += coords[i] + ","
        }else{
          html += coords[i] + " "
        }    
      }
      html += '"' +style + ' />        Sorry, your browser does not support inline SVG. '
    }
    if (document.getElementById(index).shape == 'circle'){
      html += '<circle title = "' + title + '" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" cx="' + coords[0] + '" cy="' + coords[1] + '" r="' + coords[2] + '" stroke="' + stroke + '" stroke-width="'+ strokeWidth + '" fill="' + fill +' " />'
    }

  }
  
  html += '</svg>'
  document.getElementById('svg').innerHTML = html;
   
}

function descricaoFlutuante(descricao){
  alert(descricao)
}

function piscar(id){
  elem = document.getElementById(id);
  title = elem.getAttribute('title');
  posicaoBiblioteca = biblioteca.map(function(e) { return e.estrutura; }).indexOf(title);

  if (posicaoBiblioteca != -1) {
    abrirModal(posicaoBiblioteca , id)    
  }

  try {
    document
      .getElementById(document.getElementsByClassName("teste")[0].id)
      .classList.remove("teste");
  } catch {}
  document.getElementById(id).classList.add("teste");
}

function zoom(v){
 if(v == "+"){
   escalaAtual += 0.1;
    document.getElementById("imagem").style.transform = "scale(" + escalaAtual  + ")";
    document.getElementById("svg").style.transform = "scale(" + escalaAtual  + ")";   
  }else{
    if(escalaAtual > 0.2){
      escalaAtual -= 0.1;
     }else{
       if(escalaAtual > 0.5){
        escalaAtual -= 0.5;
       }
     }
  document.getElementById("imagem").style.transform = "scale(" + escalaAtual  + ")"  ;
  document.getElementById("svg").style.transform = "scale(" + escalaAtual  + ")"  ;
 }
}