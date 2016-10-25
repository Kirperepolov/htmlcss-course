var myLocation = 'Kyiv';
function getLocation () {
	function child1(){
		function child2(){
			console.log(myLocation);			//myLocation : undefined
			var myLocation = 'New York';
			console.log(myLocation);			//myLocation : "New York"
		};
		child2();
	};
	child1();
};
getLocation();