let player
let playerPreviousColor
let playerColor
let map


let colors = ['foret', 'village', 'champs', 'eau', 'monstre']
let playerRotation = 0
let playerCells = []
let previousCells = []
let cellSize = 40

const overlayMapCells = () => {
    new_previous_cells = []

    /* Clean all previous cells */
    previousCells.forEach(previousCell => {
        map.children[previousCell].classList.remove(playerPreviousColor)
        map.children[previousCell].classList.remove(playerColor)
        map.children[previousCell].classList.remove('overlay')
    })

    playerCells.forEach(playerCell => {
        cell = getOverlayedCell(playerCell, map) 
        if (cell) {
            map.children[cell].classList.add(playerColor)
            map.children[cell].classList.add('overlay')
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
}

const onKeyUp = (event) => {
    if (event.code === 'KeyR') {
        rotateElement(player)
    }

    if (event.code === 'KeyC') {
        
        let index = colors.indexOf(playerColor)
        
        if (index ==  colors.length - 1) {
            index = 0
        } else {
            index += 1
        }
        
        setPlayerColor(colors[index])
    }    
}

const rotateElement = (element) => {
    playerRotation += 90
    element.style.transform  = 'translate(-50%, -50%) rotate('+playerRotation+'deg)'
}

const initGlobalVariables = () => {
    player = document.getElementById('player')
    map = document.getElementById('map')    
    playerCells = extractCells(player)
}

const initEvents = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousemove', overlayMapCells)
    document.addEventListener("keyup", onKeyUp)

    player.addEventListener("transitionend", overlayMapCells);
}


const setPlayerColor = (color) => {

    /* remove all existing colors */
    if (playerPreviousColor) {
        playerCells.forEach(cell => {
            cell.classList.remove(playerPreviousColor)
        })
    }

    

    playerPreviousColor = playerColor
    playerColor = color

    playerCells.forEach(cell => {
        cell.classList.remove(playerPreviousColor)
        cell.classList.add(color)
    })
}
document.addEventListener("DOMContentLoaded", () => {
    initGlobalVariables()
    initEvents()
    setPlayerColor('eau')
});

