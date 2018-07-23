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
  deleteTheDead(userDatas);
  console.log(sortByName(userDatas));

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
