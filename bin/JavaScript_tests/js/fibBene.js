document.getElementById("fibonachi").addEventListener("click", function(){
	var num1 = +document.getElementById('input1').value;
	//var num2 = +document.getElementById('input2').value;
	fibBinet(num1);
	fib(num1);
});

function fibBinet(a){
	if (typeof a === 'number') {
		var result = Math.round(Math.pow(((1+Math.sqrt(5))/2),a)/Math.sqrt(5));
	} else {
		var result = "where is your number?!"
	}
	document.getElementById('output').innerHTML = '<p>Bene: ' +  result + '</p>';
}
function fib(n) {
  var a = 1,
    b = 0,
    x;
  for (i = 0; i < n; i++) {
    x = a + b;
    a = b
    b = x;
  }
  document.getElementById('output').innerHTML += '<p>Fib: ' +  b + '</p>';;
}