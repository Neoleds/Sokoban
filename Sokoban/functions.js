const container = document.getElementById("container");
document.body.addEventListener('keydown', keyPress);

var player = {
	x: -1, 
	y: -1
};

function initializeMap()
{
	console.log(tileMap01);
	for(let row = 0; row < tileMap01.width; row++){
		for(let col = 0; col < tileMap01.height; col++){
			var element = document.createElement("div");
			element.classList.add("block");
            var mapGridCharacter = tileMap01.mapGrid[row][col][0];
			if(mapGridCharacter !== ' ')
			{
				console.log(mapGridCharacter);

				element.classList.add(mapGridCharacter);
				if (mapGridCharacter === 'P') {
					player.x = row;
					player.y = col;
				}
			}
			element.id = "x" + row + "y" + col;
			container.appendChild(element);
		}
	}
}

function keyPress(e)
{
	if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    console.log(e.key);
	switch(e.key){
		case 'ArrowUp':
			movePlayer(-1, 0);
		break;
		
		case 'ArrowDown':
			movePlayer(1, 0);

		break;
		
		case 'ArrowLeft':
			movePlayer(0, -1);

		break;
		
		case 'ArrowRight':
			movePlayer(0, 1);

		break;
		
		default:
			
		break;
	}
}

function movePlayer(x, y) {
	var newPlayerY = player.y + y;
	var newPlayerX = player.x + x;
    
    if (newPlayerX >= 16 || newPlayerY >= 19 || newPlayerX <= -1 || newPlayerY <= -1) {
        
        return;

    }
		
	var currentPositionElement = document.getElementById("x" + player.x + "y" + player.y);
	var newPlayerElementPosition = document.getElementById("x" + newPlayerX + "y" + newPlayerY);
	var destinationElementClasses = newPlayerElementPosition.className.split(' ');
	// ["block", "W"]
    if (destinationElementClasses.includes("W")) {
		return;

	} else if (destinationElementClasses.includes("B")) {

		var blackBlockX = newPlayerX+x;
		var blackBlockY = newPlayerY+y;

		var twoPositionsAhead = document.getElementById("x" + blackBlockX + "y" + blackBlockY);

		var twoPositionsAheadClasses = twoPositionsAhead.className.split(' ');
		
		
		if (twoPositionsAheadClasses.includes("W") || twoPositionsAheadClasses.includes("B")){
			return;

		}else{
	
			twoPositionsAhead.classList.add("B")
			newPlayerElementPosition.classList.remove("B");
		}

	}
	
	var goal = document.getElementsByClassName("block G B");

	if (goal.length === 6){
		setTimeout(function() { alert("Du vann!"); }, 100);
	}
	
	currentPositionElement.classList.remove("P");
	newPlayerElementPosition.classList.add("P");
	
	player.x = newPlayerX;
	player.y = newPlayerY;

	
}

initializeMap();