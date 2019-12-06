$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/home/naman/Desktop/flask-salary-predictor-master",
        dataType: "text",
        data: "popularity.csv",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines)
    // alert(lines);
}
////////////////
var k=0;
		var vrs = 1;
		var r=0;
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
loop();
xhr.addEventListener("load", function () {

    var a = this.responseText;
    a = JSON.parse(a)
		for(var vr = 1+10*k ; vr <= 10+10*k; vr++){
		var w = vr-1;
	var d = document.createElement('div')
	var b = document.getElementsByTagName('div')[0]
	b.append(d);
	var m = document.createElement('img')
	var o = document.createElement('p')

	var n = document.getElementsByTagName('div')[vr]
	n.append(m);
	n.append(o);

	document.getElementsByTagName('div')[vr].setAttribute("class", "xyz");
document.getElementsByTagName('div')[vr].setAttribute("data-toggle", "modal");
document.getElementsByTagName('div')[vr].setAttribute("data-target", "#myModal");
	
	document.getElementsByTagName('div')[vr].setAttribute("onclick","fun('"+a.Search[r].Title+"')");
	
	if(a.Search[r].Poster == "N/A")
		document.getElementsByTagName('img')[w].setAttribute("src", "uouo.jpg");
	else
		document.getElementsByTagName('img')[w].setAttribute("src", a.Search[r].Poster);
	document.getElementsByTagName('img')[w].setAttribute("height", "250px");
	document.getElementsByTagName('img')[w].setAttribute("width", "180px");
	document.getElementsByTagName('p')[w].innerHTML = a.Search[r].Title;
	r++;
	
}r=0;k++;
vrs++;
loop();});
	


var j = 1;
function fun(moviename){

	var url="http://www.omdbapi.com/?"
	j=0;
	/*console.log(j);*/
	url = url.concat('t=',moviename,'&plot=full');
	url = url.replace(/ /g,'+');
	url = url.concat('&apikey=f3d4ecb9')
	console.log(url)
	xr.open("GET", url);
	xr.send();
	}
var xr = new XMLHttpRequest();
xr.withCredentials = false;
xr.addEventListener("load", function () {
var a = this.responseText;
    a = JSON.parse(a)
	/*console.log(a.Title);*/
	document.getElementsByClassName("title")[0].innerHTML = a.Title;

	console.log(a)
	for (var key in a){

		try
		{call(key,a)}
	catch(TypeError){
		/*console.log(a[key]);*/
			document.getElementsByClassName('modal-body')[0].getElementsByTagName('p')[j]
		var n = document.createElement('p');
		var m = document.getElementsByClassName('modal-body')[0];
		var t = document.createElement('hr');
		m.append(n);
		m.append(t);
		call(key,a);
		}
	}
	
});

function call(key,a){
	if(key != 'Poster'){
		/*console.log(key,a[key]);
		console.log(j);*/
	document.getElementsByClassName('modal-body')[0].getElementsByTagName('p')[j].innerHTML=key + ":- " + a[key];
	j++;}
	else{
		var n = document.createElement('img')
	var m = document.getElementsByClassName('modal-header')[0];
	m.append(n);

		document.getElementsByClassName('modal-header')[0].getElementsByTagName('img')[0].setAttribute("id",'imgs');
	if(a.Poster == "N/A")
		document.getElementsByClassName('modal-header')[0].getElementsByTagName('img')[0].setAttribute("src","uouo.jpg"/*a[key]*/);
	else
		document.getElementsByClassName('modal-header')[0].getElementsByTagName('img')[0].setAttribute("src",a[key]);

	}
}


function loop(){
if(vrs < 5){
var url="http://www.omdbapi.com/?"
x='movie'
url = url.concat('s=',x,'&page=',vrs)
url = url.concat('&apikey=f3d4ecb9')
/*console.log(url)*/
xhr.open("GET", url);
xhr.send();

}}



var xmr = new XMLHttpRequest();
xmr.withCredentials = false;
/*pool();*/
xmr.addEventListener("load", function () {

    var a = this.responseText;
    a = JSON.parse(a);
		/*console.log(a)*/
		var w = vr-1;
	var d = document.createElement('div')
	var b = document.getElementsByTagName('div')[0]
	b.append(d);
	var m = document.createElement('img')
	var o = document.createElement('p')

	var n = document.getElementsByTagName('div')[vr]
	n.append(m);
	n.append(o);

	document.getElementsByTagName('div')[vr].setAttribute("class", "xyz");
/*	document.getElementsByTagName('img')[w].setAttribute("src", a.Poster);*/

	if(a.Poster == "N/A")
		document.getElementsByTagName('img')[w].setAttribute("src", "uouo.jpg");
	else
		document.getElementsByTagName('img')[w].setAttribute("src", a.Poster);

	document.getElementsByTagName('img')[w].setAttribute("height", "250px");
	document.getElementsByTagName('img')[w].setAttribute("width", "180px");
	document.getElementsByTagName('p')[w].innerHTML = a.Title;

	document.getElementsByTagName('div')[vr].setAttribute("data-toggle", "modal");
	document.getElementsByTagName('div')[vr].setAttribute("data-target", "#myModal");

	document.getElementsByTagName('div')[vr].setAttribute("onclick","fun('"+a.Title+"')");

	vr++;
	});

window.onmessage = function(e){
    if (e) {vr = 1;
       	var myNode = document.getElementsByClassName("wrr")[0];
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}        
	var url="http://www.omdbapi.com/?"
	for(var v=0;v<e.data.length;v++){
		
		url1 = url.concat('t=',e.data[v],'&plot=full')
		url1 = url1.replace(/ /g,'+');
		url1 = url1.concat('&apikey=f3d4ecb9')
		console.log(url1)
		xmr.open("GET", url1,false);
		xmr.send();}
   }
};


