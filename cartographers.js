let player
let map

let playerRotation = 0
let playerCells = []
let previousCells = []
let cellSize = 40



const overlayMapCells = () => {
    new_previous_cells = []

    /* Clean all previous cells */
    previousCells.forEach(previousCell => {
        map.children[previousCell].style.backgroundColor = 'transparent'
    })

    playerCells.forEach(playerCell => {
        playerCell.style.backgroundColor = 'transparent'
        cell = getOverlayedCell(playerCell, map) 
        if (cell) {
            map.children[cell].style.backgroundColor = 'red'
            playerCell.style.backgroundColor = 'yellow'
            new_previous_cells.push(cell)
        }
    });

    previousCells = new_previous_cells

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
    overlayMapCells();
}

const onKeyUp = (event) => {
    if (event.code === 'KeyR') {
        rotateElement(player)
    }
}

const rotateElement = (element) => {
    playerRotation += 90
    element.style.transform  = 'translate(-50%, -50%) rotate('+playerRotation+'deg)'
}

document.addEventListener("DOMContentLoaded", () => {
    player = document.getElementById('player')
    map = document.getElementById('map')    
    playerCells = extractCells(player)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener("keyup", onKeyUp)
    player.addEventListener("transitionend", overlayMapCells);

  });

