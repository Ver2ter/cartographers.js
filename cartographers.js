let player
let map

let playerCells = []
let previousCells = []
let cellSize = 40



const isOverlay = (playerCells, map) => {
    /*
    if (previousCells) {
        map.children[previousCells].style.backgroundColor = 'transparent'
    }
    previousCells = cellNum
    else {
        if (previousCells >= 0) {
            map.children[previousCells].style.backgroundColor = 'transparent'
            cell.style.backgroundColor = 'transparent'
        } 
    }
*/
    playerCells.forEach(playerCell => {
        cell = getOverlayedCell(playerCell, map) 
        if (cell) {
            map.children[cell].style.backgroundColor = 'red'
            playerCell.style.backgroundColor = 'yellow'
        }

    });
    
}

const getOverlayedCell = (cell, map) => {
    var playerCell = cell.getBoundingClientRect()
    var mapCell = map.getBoundingClientRect()

    var x = Math.trunc((playerCell.left - mapCell.left) / cellSize)
    var y = Math.trunc((playerCell.top - mapCell.top) / cellSize)
    var cellNum = y * 11 + x
    
    if ( x >= 0 && x <= 10 && y >= 0 && y <= 10 && cellNum >= 0) {
        return cellNum
    } else {
        return null
    }
}

const extractCells = (containerElt) => {
    var subDiv = containerElt.getElementsByTagName('div')
    cells = []
    for(var i = 0; i < subDiv.length; i++) {
        cells.push(subDiv[i]);
    }

    return cells
}


const onMouseMove = (e) =>{
    player.style.left = e.pageX + 'px';
    player.style.top = e.pageY + 'px';

    isOverlay(playerCells, document.getElementById('map'));        
}


document.addEventListener("DOMContentLoaded", () => {
    player = document.getElementById('player')
    map = document.getElementById('map')    
    
    playerCells = extractCells(player)
    mapCells = extractCells(map)
    document.addEventListener('mousemove', onMouseMove)
  });
