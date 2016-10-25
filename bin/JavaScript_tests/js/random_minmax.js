
document.getElementById("random").addEventListener("click", function(){
	var num1 = +document.getElementById('input1').value;
	var num2 = +document.getElementById('input2').value;
	minMax(num1,num2);
});

function minMax(a,b){
	if (typeof a === 'number' && typeof b === 'number') {
		var result = Math.floor(Math.random()*(Math.abs(a-b)+1)+Math.min(a,b));
	} else {
		var result = "where are your numbers?!"
	}
	document.getElementById('output').innerHTML = result;
}