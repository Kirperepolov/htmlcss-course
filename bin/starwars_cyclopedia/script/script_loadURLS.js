var pathList = {
  "people": "http://swapi.co/api/people/",
  "planets": "http://swapi.co/api/planets/",
  "vehicles": "http://swapi.co/api/vehicles/",
  "species": "http://swapi.co/api/species/",
  "starships": "http://swapi.co/api/starships/",
  "films": "http://swapi.co/api/films/"
};


//
// function getAllUrls(pathList){
//   var urlList=new Object();
//   for (var key in pathList){
//     urlList[key] = [];
//     loadURLs(pathList[key],key,urlList);
//   };
//   return urlList;
// };

function mainPage(pathList){
  setLoader();
  var mainContainer = document.getElementById('main-data');
  mainContainer.innerHTML = null;
  var infoBlock = document.createElement('div');
  infoBlock.className='infoBlock';
  mainContainer.appendChild(infoBlock);
  var urlList=new Object();
  for (var key in pathList){
    urlList[key] = [];
    loadURLs(pathList[key],key,urlList);
  };
  return urlList;
};

function loadURLs(url,key,urlList){

  fetch(url)
  .then(function(response) {return response.json()})
  .then(function(obj){
    for (var i=0;i<obj.results.length;i++){
      urlList[key].push(
        {'url':obj.results[i]['url'],
        'name':(obj.results[i]['name']||obj.results[i]['title'])}
      )
    };
    if (obj.next){
      loadURLs(obj.next,key,urlList)
    } else {return urlList;};

  })
  .then(function(urlList){
    if (!urlList) {return};
    var infoBlock = document.querySelector('.infoBlock');
    var children = infoBlock.querySelectorAll('div');
    var childredIds = [];
    for (var i=0;i<children.length;i++){
      childredIds.push(children[i].id)
    };
      if (!~childredIds.indexOf(key)) {
        loadCategory(urlList,key);
      };
      removeLoader();
      return urlList;
  })
  .catch(function(error){
    console.log(error.message);
  });
};
document.addEventListener("DOMContentLoaded", function(event) {
    var urlList = mainPage(pathList);
    console.log("DOM fully loaded and parsed");
    window.urlList=urlList;
  });



function loadCategory(urlCategory,key){
  if (!urlCategory) {return};
  if(!key){
    for (var key in urlCategory) {
      loadCategory(urlCategory,key);
    };
  } else {
    var infoBlock = document.querySelector('.infoBlock');
    var block = document.createElement('div');
    block.id = key;
    block.className='col-sm-4';
    var title = document.createElement('h3');
    title.textContent = key.toUpperCase();
    title.className= 'pointer';
    title.addEventListener('click',toggleList);
    var list =  document.createElement('ul');
    list.className='hidden';
    for (var i in urlCategory[key]) {
      var listItem =  document.createElement('li');
      listItem.textContent = urlCategory[key][i]['name'];
      listItem.url = urlCategory[key][i]['url'];
      listItem.addEventListener('click',function(){
        loadData(this.url);
      });
      list.appendChild(listItem);
    };
    block.appendChild(title);
    block.appendChild(list);
    infoBlock.appendChild(block);
  };
  function toggleList(){
    var list = this.parentNode.querySelector('ul');
    if (list.className === 'hidden'){
      list.className = null;
    } else {list.className = 'hidden'};
  };
};


function setLoader(){
  var loader = document.createElement('div');
  loader.id='loader';
  var x = Math.floor(document.body.clientWidth/2)-100;
  var y = Math.floor(document.body.clientHeight/2);
  var styleValue = 'position:absolute;width:200px;height:200px;top:'+y+'px;left:'+x+'px;background-image:url(images/ring-alt.gif);background-repeat:no-repeat;z-index:2;';
  loader.setAttribute('style',styleValue);
  document.body.insertBefore(loader,document.body.children[0]);
};

function removeLoader(){
  var loader = document.getElementById('loader')
  if (loader) {loader.remove();}
};
