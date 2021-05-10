let mapContent = new Array(121)
let mapElement
let mapId = 'map'

let playerId = 'player'
let playerElement
let playerCellPositions = []
let playerPreviousColor
let playerColor


let colors = ['foret', 'village', 'champs', 'eau', 'monstre']
let montagnes = [14, 30, 60, 90, 106]
let ruines = [17, 24, 32, 90, 98, 105]
let playerRotation = 0
let playerCells = []
let previousCells = []
let cellSize = 40

const overlayMapCells = () => {

    /* Clean all previous cells */
    playerCellPositions.filter(Boolean).forEach(previousCell => {
        mapElement.children[previousCell].classList.remove(playerPreviousColor)
        mapElement.children[previousCell].classList.remove(playerColor)
        mapElement.children[previousCell].classList.remove('overlay')
    })

    playerCellPositions = []    

    playerCells.forEach(playerCell => {    
        playerCellPositions.push(cell = getOverlayedCell(playerCell, mapElement) )
        if (cell) {
            mapElement.children[cell].classList.add(playerColor)
            mapElement.children[cell].classList.add('overlay')
        }
    });

}

const getOverlayedCell = (cell, mapElement) => {
    var playerCell = cell.getBoundingClientRect()
    var mapElementCell = mapElement.getBoundingClientRect()

    var x = Math.trunc((playerCell.left - mapElementCell.left) / cellSize)
    var y = Math.trunc((playerCell.top - mapElementCell.top) / cellSize)
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
    playerElement.style.left = e.pageX + 'px';
    playerElement.style.top = e.pageY + 'px';
}

const onKeyUp = (event) => {
    if (event.code === 'KeyR') {
        rotateElement(playerElement)
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
    playerElement = document.getElementById(playerId)
    mapElement = document.getElementById(mapId)
    playerCells = extractCells(playerElement)
}

const initEvents = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousemove', overlayMapCells)
    document.addEventListener("keyup", onKeyUp)

    playerElement.addEventListener("transitionend", overlayMapCells);
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

const buildMap = () => {
    mapElement = document.getElementById(mapId)

    // Build full mapElement
    for(var i = 0; i < 121; i++){
        var c = document.createElement('div')
        c.classList.add("grid-item")
        mapElement.appendChild(c)
    }

    // build  montagnes
    montagnes.forEach(m => {
        mapElement.children[m].classList.add("montagne")
    })

    // build  ruine
    ruines.forEach(m => {
        mapElement.children[m].classList.add("ruine")
    })
}


document.addEventListener("DOMContentLoaded", () => {
    buildMap()
    initGlobalVariables()
    initEvents()
    setPlayerColor('eau')
});

