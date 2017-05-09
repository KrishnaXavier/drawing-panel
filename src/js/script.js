window.onload = function(){		
	init();

}

function init(){
	board = document.getElementById("canvas-mandala");	
	let widthClient = document.body.clientWidth;
	let heightClient = window.innerHeight-10;
	if(widthClient>heightClient)
		board.width = board.height = heightClient;							
	else
		board.width = board.height = widthClient;					
	
	context = board.getContext("2d");
	renderCentro();

	color = "#af3030";
	traceSize = 1;
	amount = 1;
	deg = 5;

	context.beginPath();
	context.lineWidth = traceSize;
	context.strokeStyle = color;	

	draw = false;

	coords = {"x":[], "y":[]};

	board.onmousedown = function (evt) {
		context.moveTo(evt.clientX, evt.clientY);		
		coords.x[coords.x.length] = false;
		coords.y[coords.y.length] = false;
		draw = true;
	}

	board.onmouseup = function(){
		draw  = false;                
	}

	board.onmousemove = function(evt){
		if (draw){			
			c("X coords: " + event.clientX + ", Y coords: " + event.clientY);	
			coords.x[coords.x.length] = event.clientX;
			coords.y[coords.y.length] = event.clientY;

			context.lineTo(coords.x[coords.x.length-1], coords.y[coords.y.length-1]);
			context.stroke();					

			if(coords.x[coords.x.length-2] && coords.y[coords.y.length-2])
				render();										

			context.moveTo(coords.x[coords.x.length-1], coords.y[coords.y.length-1]);		
		}
	}
}

function render(){
	context.beginPath();	
	context.lineWidth = traceSize;
	context.strokeStyle = color;
	
	for(var i=0; i<amount; i++){		
		context.moveTo(coords.x[coords.x.length-2], coords.y[coords.y.length-2]-(deg*i));			
		context.lineTo(coords.x[coords.x.length-1], coords.y[coords.y.length-1]-(deg*i));
		context.stroke();	
		
		context.moveTo(coords.x[coords.x.length-2], coords.y[coords.y.length-2]+(deg*i));			
		context.lineTo(coords.x[coords.x.length-1], coords.y[coords.y.length-1]+(deg*i));
		context.stroke();
		
		
	}	
}

function renderCentro(){
	let a = board.width/2;
	let b = board.height/2;

	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#444';
	
	let m = 5;

	context.moveTo(a-m, b);
	context.lineTo(a+m, b);
	context.stroke();	

	context.moveTo(a, b-m);
	context.lineTo(a, b+m);
	context.stroke();	
}

function c(t){console.log(t);}
