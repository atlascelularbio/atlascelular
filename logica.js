biblioteca = [
  {"estrutura": "Plasmídeo", "descricao" : "Diz-se de ou molécula extracromossômica de ADN, ger. circular, encontrada em bactérias"},
  {"estrutura": "teste", "descricao" : "d"}
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
  w = document.getElementById('imagem').clientWidth;
  h = document.getElementById('imagem').clientHeight;

  var fill = 'transparent';
  var strokeWidth = 3;
  var stroke = 'none'
  var style = 'style="fill:'+ fill + ';stroke-width:' + strokeWidth + ';stroke:'+ stroke + '"';

  var html = '<svg stroke-width="3" width="' + w + '" height="' + h + '"> ';
  
  // Criando elementos do svg

  for (let index = 0; index < 12; index++) {
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

      html += ' <polygon title = "' + title + '"onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="'
      + Xi +','+ Yi +
      ' '+ X2 +','+Yi+
      ' '+Xf+','+ Yf +
      ' '+Xi+','+Yf +
     // '" style="fill:lime;stroke:purple;stroke-width:1" />  '
     '" ' + style  + '" />  '

    }
    if(document.getElementById(index).shape == 'poly'){
      html += ' <polygon title = "'+ title +'" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="';
      for (let i = 0; i < coords.length; i++) {
        if (i%2 == 0) {
          html += coords[i] + ","
        }else{
          html += coords[i] + " "
        }    
        // html += '"200,10 250,190 160,210"'
      }
      html += '"' +style + ' />        Sorry, your browser does not support inline SVG. '
    }
    if (document.getElementById(index).shape == 'circle'){
      html += '<circle title = "' + title + '" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" cx="' + coords[0] + '" cy="' + coords[1] + '" r="' + coords[2] + '" stroke="' + stroke + '" stroke-width="'+ strokeWidth + '" fill="' + fill +' " />'
    }
  }
  
  html += '</svg>'
  // console.log(html)
  document.getElementById('svg').innerHTML = html;
  
}

function piscar(id){

  elem = document.getElementById(id);
  title = elem.getAttribute('title');
  posicaoBiblioteca = biblioteca.map(function(e) { return e.estrutura; }).indexOf(title);
  console.log(posicaoBiblioteca);
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