// the start preload
  var API = 'https://swapi.co/api/';
  // var planet = 'planets/1/';
  var person = 'people/1/';
  // var movie = 'films/4/';
  var path = API+person;
  // loadData(path);
document.querySelector('h1').addEventListener('click',function(){
  mainPage(pathList);
});

/**
 * the function loadData() loads the full content about a character/object and invokes
 * supplementary functions to fullfill additional blocks
 */
function loadData(path){
  setLoader();
  fetch(path)
  .then(function(response) {return response.json()})
  .then(function(json){
    createMainContainer(json);
    getCharPhoto(json)
    getCharInfo(json);
    getSuplData(json);
    removeLoader();
  })
  .catch(function(error){
    console.log(error.message);
  });
}

/**
 * the function createMainContainer() creates the main content block
 * which is fullfilled by additional blocks. Also it sets the title
 * of the content
 */
function createMainContainer(obj){
  var container = document.getElementById('main-data');
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

/**
 * the function getCharInfo() parses the main content about a character/object
 */
function getCharInfo(obj){
  var infoBlock = document.querySelector('.infoBlock');
  var charInfo = document.createElement('div');
  charInfo.id='charInfo';
  charInfo.className='col-sm-4';
    for (key in obj) {
      //next content fields should be ignored in the main content blocks
    if (typeof obj[key] !== 'object' &&
    key !== 'created' &&
    key !== 'edited' &&
    key !== 'url' &&
    key !== 'homeworld' &&
    key !== 'episode_id' &&
    key !== 'title') {
      var infoLine = document.createElement('p');
      var stingName = key.charAt(0).toUpperCase() + key.slice(1);
      infoLine.textContent = stingName.replace(/_/g, " ") +'\: '+ obj[key];
      charInfo.appendChild(infoLine);
    };
  };
  infoBlock.appendChild(charInfo);
};

/**
 * the function getCharPhoto() is supposed to insert a character's/objects's
 * picture and inserts navigation buttons
 */
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
  var urlIndex;
  for (var index in urlList[arrURL[4]]) {
    if (obj['url'] === urlList[arrURL[4]][index]['url']){
      urlIndex = index;
      break;
    };
  };
  urlIndex = +urlIndex;
  getNextButton(arrURL);
  getPrevButton(arrURL);
  // not to try to get non-existing data perform minimal check of the url
  // if (arrURL[5]>1){
  //   getPrevButton(arrURL)
  // } else {
  //   navButtonBack.className='hidden';
  // };

  //the function to create the "Next" button
  function getNextButton(arrURL){

    if (!urlList[arrURL[4]][urlIndex+1]) {
      navButtonForw.className='hidden';
      return "this is the End";
    };
    var linkForward = urlList[arrURL[4]][urlIndex+1]['url'];
    fetch(linkForward)
    .then(function(response){
      if(response.ok){
        return response.json();
      } else {navButtonForw.className='hidden';};
    })
    .then(function(obj){
      navButtonForw.addEventListener('click',function(){loadData(obj.url)});
      navButtonForw.setAttribute('title',obj.name||obj.title);
    })
    .catch(function(error){
      console.log(error.message);
    });
  };

  //the function to create the "Previous" button
  function getPrevButton(){
    if (!urlList[arrURL[4]][urlIndex-1]) {
      navButtonBack.className='hidden';
      return "this is the End";
    };

    var linkBack = urlList[arrURL[4]][urlIndex-1]['url'];
    fetch(linkBack)
    .then(function(response){
      if(response.ok){
        return response.json();
      } else {navButtonBack.className='hidden';};
    })
    .then(function(obj){
      navButtonBack.addEventListener('click',function(){loadData(obj.url)});
      navButtonBack.setAttribute('title',obj.name||obj.title);
    })
    .catch(function(error){
      console.log(error.message);
    });
  };

  navButtons.appendChild(navButtonBack);
  navButtons.appendChild(navButtonForw);
  charPicBlock.appendChild(charPic);
  charPicBlock.appendChild(navButtons);
  infoBlock.appendChild(charPicBlock);
};

/**
 * the function getSuplData() loads all the supplementary data about
 * characters and objects and puts the content to separate blocks
 */
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
    .catch(function(error){
      console.log(error.message);
    })
  };
};
