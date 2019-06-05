biblioteca = [
  {"estrutura": "Plasmídeo", "imagem": "plasmideo.png", "descricao" : "São moléculas circulares duplas de DNA capazes de se reproduzir independentemente do DNA cromossômico. Armazenam pequenas quantidades de material genético."},
  {"estrutura": "Nucleóide", "imagem": "nucleoide.png", "descricao" : "Também chamado de cromatina, é a região da célula onde se localiza o material genético (DNA). Na célula procarionte não é envolvido por membrana"},
  {"estrutura": "Flagelo" , "imagem": "flagelo.png", "descricao" : "Filamento oco que favorece a locomoção celular"},
  {"estrutura": "Cílio" , "imagem": "cilio.jpg", "descricao" : "Estruturas semelhantes ao flagelo, porém numerosas e curtas, que favorecem a locomoção celular"},
  {"estrutura": "Ribossomo" , "imagem": "ribossomo.jpg", "descricao" : "Pequenas unidades livres no citoplasma, responsáveis pela síntese proteica da célula"},
  {"estrutura": "Membrana Plasmática" , "imagem": "membrana.jpg", "descricao" : "Pode ser dividida em cápsula: Estrutura mucosa, composta principalmente por polissacarídeos. Favorece a adesão às superfícies, impede a desidratação e dá proteção à célula... E também em parede celular: Estrutura localizada no exterior da membrana celular. Confere rigidez e determina a forma da célula. Protege e controla as trocas de substâncias com o meio ambiente"},
  {"estrutura": "Granos de alimento" ,"imagem": "alimento.jpg", "descricao" : "Pequenas partículas sólidas que entraram na célula por meio de endocitose, e contém a energia necessária para o funcionamento normal da célula"},

  {"estrutura": "Complexo de golgi", "imagem": "golgi.jpg", "descricao": ""},
  {"estrutura": "Mitocôndria","imagem": "mitocondria.png", "descricao": ""},
  {"estrutura": "Centríolo","imagem": "centriolo.png", "descricao": ""},
  {"estrutura": "Retículo endoplasmático","imagem": "reticulo.jpg", "descricao": ""},
  {"estrutura": "Lisossomos", "imagem": "lisossomo.jpg", "descricao": ""},

  {"estrutura": "Cloroplasto", "imagem": "cloroplasto.png", "descricao": ""},
  {"estrutura": "Parede celular","imagem": "parede.jpg", "descricao": ""},
  {"estrutura": "Núcleo","imagem": "nucleo.jpg", "descricao": ""},
  {"estrutura": "Vacúolo","imagem": "vacuolo.jpg", "descricao": ""},

  {"estrutura": "Citoplasma", "imagem": "citoplasma.jpg", "descricao": ""},
  {"estrutura": "Peroxissomos","imagem": "peroxissomo.jpg", "descricao": ""},
  // {"estrutura": "", "descricao": ""},
]
MensagemExibida = false;

function abrirModal(posicao, id) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalConteudo").style.display = "block";
  document.getElementById("tituloModal").innerHTML = biblioteca[posicao].estrutura;
  document.getElementById("descricaoModal").innerHTML = biblioteca[posicao].descricao;

  var shape = document.getElementById(id).shape;
  var coords = document.getElementById(id).coords;
}
  
function fecharModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalConteudo").style.display = "none";
}

function criarSvg(limiteCriacao){  
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
  var html = '<svg id = "svgImagem" stroke-width="3" width="' + w + '" height="' + h + '"> ';

  
  // Criando elementos do svg

  console.log(limiteCriacao)

  for (let index = 0; index < limiteCriacao; index++) {
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

      html += ' <polygon class = "'+ title+ '" title = "' + title + '"onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="'
      + Xi +','+ Yi +
      ' '+ X2 +','+Yi+
      ' '+Xf+','+ Yf +
      ' '+Xi+','+Yf +
     '" ' + style  + '" />'

    }
    if(document.getElementById(index).shape == 'poly'){
      html += ' <polygon class="' + title + '" title = "'+ title +'" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" points="';
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
      html += '<circle class = "' + title + '" title = "' + title + '" onclick = "piscar(\'' + 'i' + index +'\')" id = "i'+ index +'" cx="' + coords[0] + '" cy="' + coords[1] + '" r="' + coords[2] + '" stroke="' + stroke + '" stroke-width="'+ strokeWidth + '" fill="' + fill +' " />'
    }

  }
  
  html += '</svg>'
  document.getElementById('svg').innerHTML = html;

   // Verificar posição da tela
   var w = window,
   e = document.documentElement,
   g = document.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight|| e.clientHeight|| g.clientHeight;
   if( x < y && x < 700 && y < 800 && MensagemExibida == false){
     alert("Para uma melhor experiência recomenda-se deixar a tela na posição horizontal")
     MensagemExibida = true
   }
   
}

function descricaoFlutuante(descricao){
  alert(descricao)
}

function piscar(id){
  elem = document.getElementById(id);
  titulo = elem.getAttribute('title');
  posicaoBiblioteca = biblioteca.map(function(e) { return e.estrutura; }).indexOf(titulo);
  
  if (posicaoBiblioteca != -1) {
    abrirModal(posicaoBiblioteca , id)    
  }

  try {    
    var elements = document.getElementsByClassName('teste');
    while(elements.length > 0){
      elements[0].classList.remove('teste');
  }

  } catch {}

  elementosSelecionados = document.getElementsByClassName(titulo)
  for (f = 0; f < elementosSelecionados.length; f++) {
    a = elementosSelecionados[f];
    elementosSelecionados[f].classList.add("teste")
  }
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