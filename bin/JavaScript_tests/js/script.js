$("#block1").on("mousedown",drugAndDrop);
function drugAndDrop(){
	
	$("#block1").mousemove(
		function(){
			$("#block1").css("top", event.clientY-20)
			.css("left", event.clientX-20);	 
	//console.log("X: " + event.clientX);
});
};
$("#block1").off("mouseup", drugAndDrop);

// console.log(window);
/* function for getting the decimal part of a number
	*
	*		var inputNumber = +prompt("your number", "");
	*		function getDecimal(numParam) {
	*			numParam = (numParam < 0) ? -1*numParam : numParam;
	*			return +(numParam - +numParam.toFixed(0)).toFixed(10);
	*		};
	*		$("#block1").text(getDecimal(inputNumber));
	*/

	document.getElementById("random").addEventListener("click", function(){
		var num1 = +document.getElementById('input1').value;
		var num2 = +document.getElementById('input2').value;
		minMax(num1,num2);
	});

	document.getElementById("upFirstLetter").addEventListener("click", function(){
		var str = document.getElementById('input1').value;
		document.getElementById('output').innerHTML = ucFirst(str);
	});
