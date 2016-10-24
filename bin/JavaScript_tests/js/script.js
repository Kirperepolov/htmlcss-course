$("#block1").mousedown(function(){
	
	$("#block1").mousemove(
		function(){
			$("#block1").css("top", event.clientY-20)
			.css("left", event.clientX-20);	 
	//console.log("X: " + event.clientX);
}
);
}
).mouseup(function(){
	console.log($("#block1").css("top"), $("#block1").css("top"));
}

);

// console.log(window);
var inputNumber = +prompt("your number", "");
function getDecimal(numParam) {
	numParam = (numParam < 0) ? -1*numParam : numParam;
	return +(numParam - +numParam.toFixed(0)).toFixed(10);
};
$("#block1").text(getDecimal(inputNumber));