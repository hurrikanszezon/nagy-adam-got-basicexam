function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}


function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  initFunction();
  deleteTheDead(userDatas);
  sortByName(userDatas);
  fillContainer(userDatas);

  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


function deleteTheDead(array) {
  for (var k = 0; k < array.length; k++) {
    if (array[k].dead === 'true') {
      array.splice(k, 1);
      k--;
    }
  }
  return array;
}


function sortByName(array) {
  var b = array.length;
  while (b--) {
    for (var k = 0, j = 1; k < b; k++, j++) {
      if (array[k].hasOwnProperty('name')) {
        if (array[k].name > array[j].name) {
          [array[k], array[j]] = [array[j], array[k]];
        }
      }
    }
  } return array;
}

function fillContainer(array) {
  var container = document.querySelector('.characterDots');
  for (var k = 0; k < array.length; k++) {
    var character = characterDot(array[k]);
    container.appendChild(character);
  }
}


function makeInfo(object) {
  var carrier = document.createElement('div');
  carrier.className = 'carrierDiv';
  var img = document.createElement('img');
  var sigil =  findSigil(object.house);
  img.src = object.picture;
  img.alt = object.name;
  carrier.appendChild(img);
  carrier.innerHTML += `<br>${object.name}`;
  carrier.appendChild(sigil);
  carrier.innerHTML += `<br>${object.bio}`;
  return carrier;
}


function getToCharacterSide() {
  document.querySelector('.charInfo').innerHTML = makeInfo(this.char).innerHTML;
}


function characterDot(char) {
  var charDot = document.createElement('div');
  var charP = document.createElement('p');
  charDot.char = char;
  charDot.className = 'charDot';
  charDot.ondblclick = getToCharacterSide;
  charP.innerHTML = `${char.name}`;
  var imgChild = makeImg(char);
  charDot.appendChild(imgChild);
  charDot.appendChild(charP);
  return charDot;
}

function makeImg(char) {
  var img = document.createElement('img');
  img.src = `${char.portrait}`;
  img.alt = `${char.name}`;
  return img;
}

function makeElement(element, className, destination) {
  var newElement = document.createElement(element);
  newElement.className = className;
  document.querySelector(destination).appendChild(newElement);
}


function getNameFromField() {
  var srcInput = document.querySelector('#search-text').value.toLowerCase();
  return srcInput;
}


function charSearch() {
  var target = document.querySelector('.charInfo');
  var input = getNameFromField();
  var child;
  var found = false;
  var list = document.querySelectorAll('.charDot');
  for ( var k = 0; !found && k < list.length; k++) {
    if ( list[k].char.name.toLowerCase() === input.toLowerCase()) {
      found = true;
      child = makeInfo(list[k].char);
      target.innerHTML = child.innerHTML;
    } else {
      target.innerHTML = 'Character not found!';
    }
  }
}


function findSigil(house) {
  var sigil = document.createElement('img');
  sigil.src = `/assets/houses/${house}.png`;
  sigil.alt = house;
  sigil.className = 'sigil';
  return sigil;
}


function initFunction() {
  document.querySelector('#search-button').onclick = charSearch;
  makeElement('div', 'charInfo', '.characterSide');
  makeElement('div', 'starkLogo', '.characterSide');
}
