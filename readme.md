# Note
Superposer les éléments avec z-index
https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#superposer_les_%C3%A9l%C3%A9ments_avec_z-index

https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements

var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom)