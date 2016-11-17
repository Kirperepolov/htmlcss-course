
var button = document.getElementById('toggleButton');
button.addEventListener('click',function(){
  // console.log(this);
  if (this.getAttribute('comment') === "15") {
    createChess();
    this.setAttribute('value', 'переключить на 15шки');
    this.setAttribute('comment', 'chess');
  } else {
    create15();
    this.setAttribute('value', 'переключить на шахматы');
    this.setAttribute('comment', '15');
  };
});
