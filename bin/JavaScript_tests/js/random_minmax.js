function minMax(a,b){
	if (typeof a === 'number' && typeof b === 'number') {
		var result = Math.floor(Math.random()*(Math.abs(a-b)+1)+Math.min(a,b));
	} else {
		var result = "where are your numbers?!"
	}
	document.getElementById('output').innerHTML = result;
}

function ucFirst(str) {
	var a = "Empty string";
	if (str !== '') {
		a = str[0].toUpperCase() + str.slice(1);
	};
	return a;
};


function checkSpam(str) {
	//if there is no 'viagra' or 'xxx' the expresion ~str.indexOf("*") returns 0, which is equal to false in Boolean
	return Boolean(~str.indexOf("viagra"))||Boolean(~str.indexOf("xxx"));	
};

//the truncate function cuts long strings up to maxlength
function truncate(str,maxlength) {
	var a = str;
	if (a.length>maxlength) {
		a = a.slice(0,maxlength-1)+'\…';
	};
	return a;
};

// parses inputs in currency, e.g. '$120' --> 120
function extractCurrencyValue(str){
	return parseFloat(str.slice(1));
};