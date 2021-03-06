import '../css/style.css'
import config from './config'

const board = document.getElementById('canvas-board')
const configPanel = document.getElementById("panel-config")
const menu = document.querySelector('.menu')
const configurables = Array.from(document.querySelectorAll('.configurable'))

window.addEventListener('DOMContentLoaded', init)
menu.addEventListener('click', showPanelConfig)
configurables.map(configurable => configurable.addEventListener('change', configurationChange))

function init(){
	board.width = document.documentElement.clientWidth;	
	board.height = document.documentElement.clientHeight;

	const context = board.getContext("2d"); //da para deixar essa variavel local

	renderCenter();

	context.beginPath();
	context.lineWidth = config.traceSize;
	context.strokeStyle = config.color;	

	board.onmousedown = onMouseDown

	board.onmouseup = onMouseUp

	board.onmousemove = onMouseMove

	function onMouseDown(evt) {
		const {coords: {x, y}} = config
		context.moveTo(evt.clientX, evt.clientY);		
		x[x.length] = false;
		y[y.length] = false;
		config.drawing = true;
	}

	function onMouseUp() {
		config.drawing  = false;                
	}

	function onMouseMove(evt) {
		const {drawing, coords: {x, y}} = config

		if (drawing){			
			//for dev: c("X coords: " + event.clientX + ", Y coords: " + event.clientY);	
			x[x.length] = event.clientX;
			y[y.length] = event.clientY;

			context.lineTo(x[x.length-1], y[y.length-1]);
			context.stroke();					

			if(x[x.length-2] && y[y.length-2])
				draw()

			context.moveTo(x[x.length-1], y[y.length-1]);		
		}
	}

	function draw(){
		context.beginPath();	
		context.lineWidth = config.traceSize;
		context.strokeStyle = config.color;

		const {coords: {x, y}, spaceRow} = config
		
		for(var i=0; i<config.amount; i++){		
			context.moveTo(x[x.length-2], y[y.length-2]-(spaceRow*i));			
			context.lineTo(x[x.length-1], y[y.length-1]-(spaceRow*i));
			context.stroke();	
			
			context.moveTo(x[x.length-2], y[y.length-2]+(spaceRow*i));			
			context.lineTo(x[x.length-1], y[y.length-1]+(spaceRow*i));
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

function configurationChange({target: {attributes, value}}) {
	const key = attributes.getNamedItem('data-key').value

	if (!key || !Object.keys(config).includes(key))
		return

	config[key] = value
}

function showPanelConfig(){
	configPanel.style.display = configPanel.style.display === "block"
		? 'none'
		: 'block'
}