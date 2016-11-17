function create15(){
  var field = document.createElement('div');
  fiels.setAttribute('style', fieldStyle);
  field.className = 'container';


  function createBlocks(){
    var gameField = document.createElement('div');
    gameField.setAttribute('id', 'game');
    for (var i=1;i<=15;i++){
      var block = document.createElement('div');
      block.className = 'block';
      block.innerText = i;
      block.setAttribute('id', 'id'+i);
      gameField.appendChild(block);
    };
    var block = document.createElement('div');
    block.className = 'block';
    block.setAttribute('id', 'emptyBlock');
    gameField.appendChild(block);
    document.getElementById('steps').innerText = '0';
  }
  createBlocks();
  var container = document.querySelector('.container')
  container.parentNode.replaceChild(field,container);
};
// document.getElementById('actionStart').addEventListener('click', createBlocks());
