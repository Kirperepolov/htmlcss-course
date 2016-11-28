/**
0. Создать функицю, которая принимает строку селектор и возвращает:
- undefined - если ничего не найдено
- найденную ноду - если она одна
- массив нод - если их несколько
- если в функцию передать ноду, функция возвращает ее тип (Node, Text, Comment etc)
*/
var nodeTypes = {
  1:	'ELEMENT_NODE',
  2:	'ATTRIBUTE_NODE',
  3:	'TEXT_NODE',
  4:	'CDATA_SECTION_NODE',
  5:	'ENTITY_REFERENCE_NODE',
  6:	'ENTITY_NODE',
  7:	'PROCESSING_INSTRUCTION_NODE',
  8:	'COMMENT_NODE',
  9:	'DOCUMENT_NODE',
  10: 'DOCUMENT_TYPE_NODE',
  11: 'DOCUMENT_FRAGMENT_NODE',
  12: 'NOTATION_NODE',
};



function queryNodes(string){
  if (string.nodeType) {
    return nodeTypes[string.nodeType];
  }
  else {
    var result = document.querySelectorAll(string);
    if (result.length===0) {
      return undefined
    } else if (result.length===1) {
      return result[0];
    } else {
      return result;
    };
  };
};
/**
1. Создать функцию, которая принимает строку селектор и возвращает:
- undefined - если ничего не найдено
- найденную ноду - если она одна
- первую найденную ноду - если их несколько
*/
function querySingleNode(string){
  if (string.nodeType) {
    throw new Error('Your input is already a ' +nodeTypes[string.nodeType]);
  }
  else {
    var result = document.querySelector(string);
    return result ? result : undefined;
  };
};

/*
2. Создать функцию аналог функции DOM insertBefore, но вставляет не до, а после указанного элемента.
*/
function inserAfter(newElement, referenceElement){
  referenceElement.parentNode.insertBefore(newElement,referenceElement.nextSibling);
};
// div.parentNode.insertBefore(div2, div.nextSibling);
/*
3. Создать функцию, которая выдает значение атрибута или ставит его значение.

Чтение.
Что имеется в виду - Допустим есть элемент:
<titanic style="floor:none"></titanic>
Если передать в функцию 'style' - она должна выдать "floor:none"
<ninja color="black" visibility="hidden"></ninja>
Если передать в функцию 'color' - она должна выдать "black"

Установка.
Что имеется в виду - Допустим есть элемент:
<lego></lego>
Если передать в функцию два параметра - атрибут и значение, то нода должна выглядеть
<lego style="display:block"></lego>

Если значение этого атрибута уже задано, устанавливается новое значение.
Было:
<chucknorris speed="5"></chucknorris>
После вызова функции с передачей атрибута и значения (speed Infinity):
<chucknorris speed="Infinity"></chucknorris>
*/
function attributeFunc(elem,attrName,attrVal){
  if (attrVal) {
    elem.setAttribute(attrName,attrVal);
  } else {
    return elem.getAttribute(attrName);
  };
}
/*
4. С помощью JS создайте шахматное поле:
- контейнер поля
- 64 ребёнка (ячейки) элементы (проще позиционировать с помощью floor)
- ячейки раскрашены белым и черным
- нужные атрибуты и стили задавайте с помощью JS
*/

/**
 * createChess - creates a 8x8 chess field without any logic
 * No parameters needed
 *
 * @return {undefined} nothing
 */
function createChess(){
  var fieldStyle = 'border:1px solid #000;box-sizing:content-box;width: 400px;height:400px;margin:170px auto;padding:0;display:block';
  var blackBlock = 'width:50px;height:50px;background-color:#000;margin:0;float:left;';
  var whiteBlock = 'width:50px;height:50px;background-color:#fff;margin:0;float:left;';
  var field = document.createElement('div');
  field.setAttribute('style', fieldStyle);
  field.className = 'container';
  for (var raw=0;raw<8;raw++){
    for (var col=0;col<8;col++){
      var block = document.createElement('div');
      if ((col+raw)%2) {
        block.setAttribute('style', blackBlock);
      } else {
        block.setAttribute('style', whiteBlock);
      };
      field.appendChild(block);
    };
  }
  var container = document.querySelector('.container');
  container.parentNode.replaceChild(field,container);
};

/**
5. Реализовать игру Пятнашки. (Пример - http://scanvord.net/pyatnashki/)
- контейнер поля <div class=“battle-field”></div>
- c помощью JS создать ячейки 1..15
- назначить необходимые обработчики событий
*/
// this allows to retrieve previously played game
document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.gamefield) {
    // Retrieve the gamefield from the localStorage if possible
    document.querySelector('.container').innerHTML = localStorage.gamefield;
    // restoring the main event listeners as
    // they are not stored in the localStorage
    document.getElementById('game').
      addEventListener('click',blockGame);
    document.getElementById('actionStart').
      addEventListener('click',startBlockGame);
  } else {
    create15();
  };
  localStorage.clear();
});

/**
 * beforeunload - an event which is trigered before the window or tab is closed
 */
window.addEventListener("beforeunload", function() {
  // get the gamefield
  var container = document.querySelector('.container');
  // Store the gamefield to the localStorage
  localStorage.gamefield= container.innerHTML;
});


/**
 * create15 - creates an active gamefield for the 15blocks game
 *
 * @return {undefined} nothing
 */
function create15(){
  var field = document.createElement('div');
  field.className = 'container';

  var startButton = document.createElement('input');
  startButton.setAttribute("type", "button");
  startButton.id = 'actionStart';
  startButton.setAttribute("value", "Start!");
  startButton.addEventListener('click', startBlockGame);


  var gameField = document.createElement('div');
  gameField.className = 'battle-field';
  gameField.id= 'game';

  var statistics = document.createElement('div');
  statistics.className = 'statistics';

  var scoreBlock = document.createElement('div');
  scoreBlock.textContent = 'Steps done:';

  var stepsBlock = document.createElement('div');
  stepsBlock.id = 'steps';
  statistics.appendChild(scoreBlock);
  statistics.appendChild(stepsBlock);
  field.appendChild(startButton);
  field.appendChild(gameField);
  field.appendChild(statistics);
  function createBlocks(){
    for (var i=1;i<=15;i++){
      var block = document.createElement('div');
      block.className = 'block';
      block.innerText = i;
      block.id = 'id'+i;
      gameField.appendChild(block);
      /*
      * it is possible to add listener to the whole gameField and
      * use event.target instead of this in function blockGame(),
      * but it makes the code more complex
      */
      // block.addEventListener('click',blockGame);

    };
    var block = document.createElement('div');
    block.className = 'block';
    block.id= 'emptyBlock';
    gameField.appendChild(block);
    gameField.addEventListener('click',blockGame);
    stepsBlock.textContent = '0';
  }
  createBlocks();
  var container = document.querySelector('.container');
  container.parentNode.replaceChild(field,container);
};



/**
 * blockGame - this function is invoked when a step in the 15blocks game
 * must be done. I checks whether there is a neighboring empty block
 * right next to the clicked one and if so - moves the clicked block
 * to the empty space.
 * Uses "this" to define the clicked block
 * Increments steps number by 1 on every successful block movement
 *  *
 * @return {undefined} nothing
 */
function blockGame(){

  var index = 0;
  var emptyBlock = document.getElementById("emptyBlock");
  var steps = +document.getElementById('steps').textContent;
  var gameField = document.getElementById('game');

  var nodeIterator = document.createNodeIterator(
    gameField,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
      return (node.nodeType === 1) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  );
  while (event.target !== nodeIterator.nextNode()) {index++};

  /**
   * changeBlocks - a function to change two blocks with each other
   *
   * @return {undefined} nothing
   */
  function changeBlocks(){
    gameField.replaceChild(event.target,emptyBlock);
    gameField.insertBefore(emptyBlock,gameField.children[index-1]);
  };

  if (event.target.nextElementSibling === emptyBlock) {
    gameField.insertBefore(emptyBlock,event.target);
    steps++;
  } else if (event.target.previousElementSibling === emptyBlock) {
    gameField.insertBefore(event.target,emptyBlock);
    steps++;
  } else if (index<=12) {
    var i=0;
    while (i<4) {nodeIterator.nextNode(); i++};
    if (nodeIterator.referenceNode === emptyBlock) {
      changeBlocks.call(event.target);
      steps++;
    } else {
      i=8;
      while (i>=0) {nodeIterator.previousNode(); i--};
      if (nodeIterator.referenceNode === emptyBlock) {
        changeBlocks.call(event.target);
        steps++;
      };
    };
  } else {
    i=4;
    while (i>=0) {nodeIterator.previousNode(); i--};
    if (nodeIterator.referenceNode === emptyBlock) {
      changeBlocks.call(event.target);
      steps++;
    };
  };
  document.getElementById('steps').textContent = steps;
  checkWin();
};

/**
 * startBlockGame - makes 100 random moves in 15blocks game
 * to mix the game field;
 * Sets "Count Steps" to zero
 * No parameters needed
 *
 * @return {undefined}  nothing
 */
function startBlockGame() {
  for (var i=0;i<100;i++){
    mixBlocks();
  };
  document.getElementById('steps').textContent=0;
};



/**
 * mixBlocks - is invoked to move a random block
 *
 *  no parameters needed
 * @return {undefined}  nothing
 */
function mixBlocks(){
  // for (var i=0;i<100;i++) {
  //   var randomBlockIndex = Math.floor(Math.random()*16);
  //   blockGame.call(document.getElementById('id'+randomBlockIndex));
  // };
  var emptyBlock = document.getElementById("emptyBlock");
  var gameField = document.getElementById('game');
  var nodeIterator = document.createNodeIterator(
    gameField,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
      return (node.nodeType === 1) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  );
  //locating the empty block within the gamefield by means of nodeIterator
  var index = 0;
  while (nodeIterator.nextNode() !== emptyBlock) {index++};

  /**
   * neibRigth - changes the possition of the emptyBlock with its right sibling
   */
  function neibRigth(){
    gameField.insertBefore(emptyBlock.nextElementSibling,emptyBlock);
  };
  /**
   * neibBottom - changes the possition of the emptyBlock with its
   * bottom sibling
   */
  function neibBottom(){
    var i=0;
    while (i<4) {nodeIterator.nextNode(); i++};
    gameField.replaceChild(nodeIterator.referenceNode,emptyBlock);
    gameField.insertBefore(emptyBlock,gameField.children[index+i-1]);
  };
  /**
   * neibLeft - changes the possition of the emptyBlock with its
   * left sibling
   */
  function neibLeft() {
    gameField.insertBefore(emptyBlock,emptyBlock.previousElementSibling);
  };
  /**
   * neibTop - changes the possition of the emptyBlock with its
   * top sibling
   */
  function neibTop() {
    var i=0;
    while (i<4) {nodeIterator.previousNode(); i++};
    gameField.replaceChild(nodeIterator.referenceNode,emptyBlock);
    gameField.insertBefore(emptyBlock,gameField.children[index-i-1]);
  };

  if (index<=1){
      //if the empty block is on the first possition only 2 moves r available.
      // they're choosen randomly
    switch (Math.floor(Math.random()*2)){
      case (0):
      neibRigth();
      break;

      case (1):
      neibBottom();
      break;
    };
  } else if (index<5){
    //if the emptyBlock is within the 1st line 3 directions for move
    // are possible
    switch (Math.floor(Math.random()*3)){
      case (0):
      neibRigth();
      break;

      case (1):
      neibBottom();
      break;

      case (2):
      neibLeft();
      break;
    };
  } else if (index<13) {
    //for the most of possitions all 4 directions r available
    switch (Math.floor(Math.random()*4)){
      case (0):
      neibRigth();
      break;

      case (1):
      neibBottom();
      break;

      case (2):
      neibLeft();
      break;

      case (3):
      neibTop();
      break;
    };
  } else if (index<16){
    //if the emptyBlock is within the last line 3 directions for move
    // are possible
    switch (Math.floor(Math.random()*3)){
      case (0):
      neibRigth();
      break;

      case (1):
      neibLeft();
      break;

      case (2):
      neibTop();
      break;
    };
  } else {
    //if the empty block is on the last possition only 2 moves r available.
    // they're choosen randomly
    switch (Math.floor(Math.random()*2)){
      case (0):
      neibTop();
      break;

      case (1):
      neibLeft();
      break;
    };
  };
};

/**
 * checkWin - the function checks whether the player has won the game;
 *
 */
function checkWin(){
  var score = +document.getElementById('steps').textContent;
  var gamefield = document.getElementById('game');
  //by this cycle I check if the blocks are in the propper order,
  // and if so var i get the value 15
  for (var i=0;i<gamefield.children.length;i++){
    if (gamefield.children[i].id !== 'id'+(1+i)) {
      break;
    };
  };
  if (i===15){
    alert('you won the game!');
    
    if (!gamefield.minScore || gamefield.minScore>score){
      gamefield.minScore=score;
      alert('you set a record and played the game in ' + score + ' steps!');
    };
  };
};
