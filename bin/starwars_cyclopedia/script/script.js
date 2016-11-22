// var charHeader = document.createElement('h2');
// var charPic = document.createElement('div');
// var charSuplData = document.createElement('div');
// var charFilms = document.createElement('div');
// var charInfo = document.createElement('div');
// var lineBrake = document.createElement('br');
// charHeader.id='charHeader';
// charPic.id='charPic';
// charSuplData.id='charSuplData';
// charFilms.id='charFilms';
// charInfo.id='charInfo';


var API = 'http://swapi.co/api/';
var planet = 'planets/1/';
var person = 'people/1/';
var movie = 'films/4/';
var path = API+movie;

// Запрос на начальную информацию
loadData(path);

/**
 * definition for the most separate functions;
 */
function loadData(path){
  fetch(path)
  .then(function(response) {return response.json()})
  .then(function(json){
    createMainContainer(json);
    getCharPhoto(json)
    getCharInfo(json);
    getSuplData(json);
  });
}


function createMainContainer(obj){
  var container = document.getElementsByClassName('container')[0];
  container.innerHTML = null;
  var charHeader = document.createElement('h2');
  charHeader.id='charHeader';
  charHeader.className='text-center';
  var title;
  if (~obj['url'].indexOf('planet')) {
    title = 'Planet '+ obj['name'];
  } else if (~obj['url'].indexOf('starships')){
    title = 'Starship '+ obj['name'];
  } else if (obj.episode_id) {
    title = 'Episode ' + obj.episode_id + ': '+ obj.title;
  };
  charHeader.textContent = title ? title : obj['name'];
  var infoBlock = document.createElement('div');
  infoBlock.className='infoBlock';
  container.appendChild(charHeader);
  container.appendChild(infoBlock);
};

function getCharInfo(obj){
  var infoBlock = document.querySelector('.infoBlock');
  var charInfo = document.createElement('div');
  charInfo.id='charInfo';
  charInfo.className='col-sm-4';
    for (key in obj) {
    if (typeof obj[key] !== 'object' &&
    key !== 'created' &&
    key !== 'edited' &&
    key !== 'url' &&
    key !== 'homeworld' &&
    key !== 'episode_id' &&
    key !== 'title') {
      var infoLine = document.createElement('p');
      var stingName = key.charAt(0).toUpperCase() + key.slice(1);
      infoLine.textContent = stingName.replace("_", " ") +'\: '+ obj[key];
      charInfo.appendChild(infoLine);
    };
  };
  infoBlock.appendChild(charInfo);
};

function getCharPhoto(obj) {
  var infoBlock = document.querySelector('.infoBlock');
  var charPicBlock = document.createElement('div');
  charPicBlock.className='col-sm-4';
  charPicBlock.id= 'charPicBlock';
  var charPic = document.createElement('img');
  charPic.id='charPic';
  charPic.className='text-center';
  charPic.setAttribute('src','images/SW_logo_300.jpg');
  var navButtons = document.createElement('div');
  navButtons.className='text-center navButtons';
  var navButtonBack = document.createElement('div');
  navButtonBack.id='navButtonBack';
  navButtonBack.textContent = 'Prev';
  var navButtonForw = document.createElement('div');
  navButtonForw.id='navButtonForw';
  navButtonForw.textContent = 'Next';
  var arrURL = obj['url'].split('/');
  var linkBack = arrURL[0];
  var linkForward = arrURL[0];

  for (var i=1;i<arrURL.length;i++){
    if (i === 5){arrURL[i] = +arrURL[i]-1};
    linkBack += '\/' + arrURL[i];
  };
  for (var i=1;i<arrURL.length;i++){
    if (i === 5){arrURL[i] +=2};
    linkForward += '\/' + arrURL[i];
  };
  fetch(linkBack)
  .then(function(response){
    if(response.ok){
      return response.json()
      .then(function(obj){
        navButtonBack.addEventListener('click',function(){loadData(obj.url)});
        navButtons.appendChild(navButtonBack);
        navButtonBack.setAttribute('title',obj.name||obj.title);
      });
    } else {navButtonBack.className='hidden';};
  })

  .catch(function(error){
    console.log("You've reached the end of the list");
  });
  fetch(linkForward)
  .then(function(response){
    if(response.ok){
      return response.json()
      .then(function(obj){
        navButtonForw.addEventListener('click',function(){loadData(obj.url)});
        navButtonForw.setAttribute('title',obj.name||obj.title);
        navButtons.appendChild(navButtonForw);
      });
    } else {navButtonForw.className='hidden';};
  })

  .catch(function(error){
    console.log("You've reached the end of the list");
  });

  // var infoLine = document.createElement('p');
  // infoLine.textContent = key.replace("_", " ") +'\: '+ obj[key];
  // charInfo.appendChild(infoLine);
  charPicBlock.appendChild(charPic);
  charPicBlock.appendChild(navButtons);
  infoBlock.appendChild(charPicBlock);
};

function getSuplData(obj){
  var infoBlock = document.querySelector('.infoBlock');
  var linksArray=[];
  var articleTitle;
  for (var key in obj) {
    if (obj[key]==='homeworld') {
      linksArray.push(obj.homeworld);
      articleTitle = key.charAt(0).toUpperCase() + key.slice(1);;
      loadSupplementaryData(linksArray,articleTitle,infoBlock);
    } else if (Array.isArray(obj[key]) &&
                obj[key].length !== 0) {
      linksArray = obj[key];
      articleTitle = key;
      loadSupplementaryData(linksArray,articleTitle,infoBlock);
    };
  };
};

/* i've decided to define a separate function for downloading "links" and
* to use it for any appropriate case
*/
function loadSupplementaryData(arr,title,division){
  var charSuplData = document.createElement('div');
  var infoTitle = document.createElement('h3');
  infoTitle.textContent=title;
  var list = document.createElement('ul');
  charSuplData.appendChild(infoTitle);
  charSuplData.appendChild(list);
  charSuplData.className='col-sm-4';
  division.appendChild(charSuplData);
  for (var key in arr) {
    fetch(arr[key])
    .then(resp=>resp.json())
    .then(function(obj){
      var infoLink = document.createElement('li');
      var path = obj['url'];
      infoLink.addEventListener('click',function(){
        loadData(path);
      });
      if (obj.episode_id) {
        var listItemTitle = 'Episode ' + obj.episode_id + ': '
      };
      var listItemValue = obj.name?obj.name:obj.title;
      infoLink.textContent = listItemTitle ? listItemTitle + listItemValue :listItemValue;
      list.appendChild(infoLink);
    })
  };
}
