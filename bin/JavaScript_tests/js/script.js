$("#block1").mousedown(function(){
	
$("#block1").mousemove(
	function(){
		$("#block1").css("top", event.clientY-10)
							.css("left", event.clientX-10);	 
	console.log("X: " + event.clientX);}
);
}
);
$("#block1").mouseup(function(){
			$("#block1").css("background-color", "#ff0");
		}

	);

// console.log(window);