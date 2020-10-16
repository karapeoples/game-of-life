# GAME-of-LIFE
CS Build Week Conway's Game of Life in React
(Kara R. Peoples October 2020)

## Rules of Conway's Game of Life

#### Death
* Underpopulation ~ If a Cell has two dead neighbors it dies from neglect. Who said social distancing is a good thing?
* Overpoplutaion ~ If a Cell has more than three live neighbors it dies from crowding. Crowds are Dangerous too!

#### Survivability

* Existence ~ If a Cell has 3 live neighbors it survives until it end up in overpopulation or underpopulation but allows for instances of reproduction. Just like the porridge these conditions are just right!!
* Reproduction ~ Any Dead Cell comes to Life if Existence is Correct and it has Three Live Neighbors. Just like that the relatives dies the next time round....


## Cellular Automata

> Cellular Automaton (plural Cellular Automata) A way to show cell death and life in a 3d manor on a 2d Graph. Also an recursive algorithm that implements these ideas. As seen in my quotes above seeing the rules help us compare real life in any type of population how it would work due to the rules.


## Turing Completeness' of Conway's "Game of Life"

> Turing Completeness involves the planning of the running of an algorithm. It allows us to write code that will compare boxes according to the rules of the Game of Life. Implemented in Javascript in an if else type of statement to compare all boxes to others on a 2d graph.