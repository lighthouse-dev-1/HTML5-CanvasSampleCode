var mousePressed = false;
var lastX, lastY;
var ctx;
		
$(function() {
	$( "#text" ).draggable();
	$( "#memo" ).resizable({
			handles: "se",
			minWidth: 100,
			minHeight: 100,
	});
});	 


function InitThis() 
{
	ctx = $('#myCanvas')[0].getContext("2d");
	$('#myCanvas').mousedown(function (e) {
			mousePressed = true;
			Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
	});

	$('#myCanvas').mousemove(function (e) {
			if (mousePressed) {
				Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
			}
	});

	$('#myCanvas').mouseup(function (e) {
			if (mousePressed) {
				mousePressed = false;
				cPush();
			}
	});
	
	$('#myCanvas').mouseleave(function (e) {		
			if (mousePressed) {
				mousePressed = false;
				cPush();
			}
	});
	
	$('#myCanvas').mouseleave(function (e) {		
			if (mousePressed) {
				mousePressed = false;
				cPush();
			}
	});
		
	Sizeset();
	cPush();
}

function Draw(x, y, isDown) 
{
	if (isDown) {
		ctx.beginPath();
		ctx.strokeStyle 	= $('#selColor').val();
		ctx.lineWidth 		= $('#selWidth').val();
		ctx.lineJoin 			= "round";
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
	}
	
	lastX = x; 
	lastY = y;
}

var cPushArray  = new Array();
var cStep 		= -1;

function cPush() 
{
	cStep++;
	if (cStep < cPushArray.length) { 
		cPushArray.length = cStep; 
	}
	cPushArray.push(document.getElementById('myCanvas').toDataURL());
}

function cUndo() 
{
	if(cStep > 0) {
		cStep--;
		var canvasPic 		= new Image();
		canvasPic.src 		= cPushArray[cStep];
		canvasPic.onload	= function () { ctx.drawImage(canvasPic, 0, 0); }
		
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}

function cRedo() 
{
	if (cStep < cPushArray.length-1) {
		cStep++;
		var canvasPic		= new Image();
		canvasPic.src 		= cPushArray[cStep];
		canvasPic.onload	= function () { ctx.drawImage(canvasPic, 0, 0); }
	}
}

function clearArea() 
{
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	cPush();
}

$(window).load(function () {InitThis()});

var itCount		=	0;
var itHeight	=  0; 

function input_text()
{
	if(itCount == 1) {
		return;
	}
		
	var memo 		= document.getElementById("memo");
	var width 		= document.getElementById("myCanvas").offsetWidth;
	var height 		= document.getElementById("myCanvas").offsetHeight;
	var fw 			= window.outerWidth ;
	var mvHeight 	= document.getElementById("MyVideo").offsetHeight;
	var sLeft		= ( fw - width ) / 2;
	var sTop		= ( mvHeight - height ) / 2 + itHeight;
	
	$('#text').show();

	memo.addEventListener("blur", function( event ) {
		remove_text( itHeight );
	}, true);

	itCount = 1;
}


function remove_text( )
{
	var memo 	= document.getElementById("memo");
	var data 	= document.getElementById("memo").value.replace( /\n/gi, '<br>')+"<br>";
	var results = data.match(/<br>/g); 
	
	ctx 			 = document.getElementById('myCanvas').getContext("2d");			 
	ctx.textBaseline = "top"		
	ctx.fillStyle	 = "white";
	ctx.font		 = "25px  'meiryo'"

	var data_array	 = data.split('<br>');
	
	for( var i = 0; i <  results.length; i++ )
	{
		ctx.fillText( data_array[i] , 0 , itHeight);
		
		itHeight += 30;
	}
	
	$('#text').hide();
	$('#memo').val("");
	
	itCount = 0;
}	

function Sizeset()
{
	var fw			= window.outerWidth ;
	var fh			= window.outerHeight ;
	
	var MyCanvas	= document.getElementById('myCanvas');
	var MyVideo		= document.getElementById('MyVideo');
	
	var vWidth		= MyVideo.offsetWidth;
	var vHeight		= MyVideo.offsetHeight;
	
	MyCanvas.width	= vWidth;
	MyCanvas.height = vHeight - 120;
	
	var mlVideo		= ( fw - vWidth )   / 2 ;

	$('#text').css('margin-left', ( fw - vWidth ) / 2);
}