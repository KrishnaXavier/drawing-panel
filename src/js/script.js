const config = {
	color: "#af3030",
	traceSize: 3,
	amount: 10,
	spaceRow: 6,
	drawing: false,
	coords: {x: [], y: []}
}

const board = document.getElementById('canvas-board')
const configPanel = document.getElementById("panel-config")

window.config = config
window.addEventListener('DOMContentLoaded', init)

function init(){
	let widthClient = board.width = document.documentElement.clientWidth;	
	let heightClient = board.height = document.documentElement.clientHeight;

	const context = board.getContext("2d"); //da para deixar essa variavel local

	renderCenter();

	context.beginPath();
	context.lineWidth = config.traceSize;
	context.strokeStyle = config.color;	

	board.onmousedown = onMouseDown

	board.onmouseup = onMouseUp

	board.onmousemove = onMouseMove

	function onMouseDown(evt) {
		context.moveTo(evt.clientX, evt.clientY);		
		config.coords.x[config.coords.x.length] = false;
		config.coords.y[config.coords.y.length] = false;
		config.drawing = true;
	}

	function onMouseUp() {
		config.drawing  = false;                
	}

	function onMouseMove(evt) {
		if (config.drawing){			
			c("X coords: " + event.clientX + ", Y coords: " + event.clientY);	
			config.coords.x[config.coords.x.length] = event.clientX;
			config.coords.y[config.coords.y.length] = event.clientY;

			context.lineTo(config.coords.x[config.coords.x.length-1], config.coords.y[config.coords.y.length-1]);
			context.stroke();					

			if(config.coords.x[config.coords.x.length-2] && config.coords.y[config.coords.y.length-2])
				draw()

			context.moveTo(config.coords.x[config.coords.x.length-1], config.coords.y[config.coords.y.length-1]);		
		}
	}

	function draw(){
		context.beginPath();	
		context.lineWidth = config.traceSize;
		context.strokeStyle = config.color;

		const {spaceRow} = config
		
		for(var i=0; i<config.amount; i++){		
			context.moveTo(config.coords.x[config.coords.x.length-2], config.coords.y[config.coords.y.length-2]-(spaceRow*i));			
			context.lineTo(config.coords.x[config.coords.x.length-1], config.coords.y[config.coords.y.length-1]-(spaceRow*i));
			context.stroke();	
			
			context.moveTo(config.coords.x[config.coords.x.length-2], config.coords.y[config.coords.y.length-2]+(spaceRow*i));			
			context.lineTo(config.coords.x[config.coords.x.length-1], config.coords.y[config.coords.y.length-1]+(spaceRow*i));
			context.stroke();			
		}	
	}

	function renderCenter(){
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
}

function showPanelConfig(){
	if(configPanel.style.display == "block")
		configPanel.style.display = "none";
	else
		configPanel.style.display = "block";
}