import React, { useState, useCallback, useRef } from 'react'
//!Introduction to a Package that use a Function produce to act as a double buffer by allowing you to return unmutable state and do mutations to a copy of state rather than actual state.
import produce from 'immer'

//$Check Neighbors by location of square
const operations = [
	[0, 1],
	[1, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
]
//$Starting Variables for Resting Grid Size and Speed
let numRows = 15
let numCols = 15
let numSecs = 100

//%Component Start
const Grid = () => {
	//#State to Make all Cells at Resting Dead 0=Cell Dead change to 1=Cell Alive Also an Array Data Structure
	const [gridBox, setGridBox] = useState(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
	//#State to Toggle Recursive Algorithm On and Off
	const [running, setRunning] = useState(false)
	//#State to Keep Track of Generations Produced
  const [generations, setGenerations] = useState(0)

//%Helper Functions
	//#useRef hook allows us to reference recursive state
  const runningRef = useRef(running)
	runningRef.current = running
	//#GRID SIZE HELPERS Variable Reassignment
	const ten = () => {
		numRows = 10
		numCols = 10
		setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
		}
		const quarter = () => {
		numRows = 25
		numCols = 25
		setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
	}
	const fifty = () => {
		numRows = 50
		numCols = 50
		setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
	}

	//#Random Dead and Alive Cells
	const seed = () => {
		setGridBox((g) => {
			return produce(g, (gridCopy) => {
				for (let i = 0; i < numRows; i++) {
					for (let k = 0; k < numCols; k++) {
						gridCopy[i][k] = Math.floor(Math.random() * 2)
					}
					setGenerations(0)
					setRunning(false)
				}
			})
		})
	}
	//#Speed Variable Reassignment Functions and Algorithm Toggled to start main function
	const fast = () => {
		numSecs = 25
		setRunning(!running)
		if (!running) {
			runningRef.current = true
			runSimulation()
		}
	}
	const slow = () => {
		numSecs = 1000
		setRunning(!running)
		if (!running) {
			runningRef.current = true
			runSimulation()
		}
	}
	//#Pop Ups for the Rules and Information
	const about = () => {
		alert(`Who is John Conway?
		John Horton Conway(12/26/1937 - 04/11/2020) an English mathematician.
		He was was active in a multitude of different theories, such as, finite groups, knot theory, number theory,
		combinatorial game theory and coding theory.
		However, he was mostly known for his invention of the cellular automaton known as "The Game of Life"`)
	}

	const aboutGame = () => {
		alert(`What is "The Game of Life?"
		The game of life is a cellular automaton ( A collection of "colored" cells on a grid of specified shape that
		evolves through a number of discrete time steps according to a set of rules based on the states of
		neighboring cells.)
	How can Conway's "Game of Life" be useful in real life?
		It can help visualize how human or animal groups themselves rotate through environments or migrate through them in
		search of more resources.`)
	}

	const rules = () => {
		alert(`The rules of "The Game of Life":
			#1- Any live cell with fewer than two live neighbors dies (under-population).
			#2- Any live cell with three live neighbors live on to the next generation.
			#3- Any live cell with more than three live neighbors dies (overpopulation).
			#4- Any dead cell with exactly three live neighbors becomes a live cell (reproduction).`)
	}

//%Main Game Function
	//#UseCallBack Hook Allowing this Algorithm to Run as a Callback Method and not be Overpowered by Data
	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return
		}
		//@ Game Logic and Rules Applied with an O (n) runtime because Grid Copy is either returning 1 or 0 against an array the operation/runtime would run n times against each cell for each generation making O(2n) simplifying to O(n)
		setGridBox((g) => {
			return produce(g,(gridCopy) => {
				for (let i = 0; i < numRows; i++) {
					for (let k = 0; k < numCols; k++) {
						let neighbors = 0
		//#For Each Coordinate in Operations Check Neighbors against Game Rule Logic and Switch Between Life and Death
						// eslint-disable-next-line
						operations.forEach(([x, y]) => {
							const newI = i + x
							const newK = k + y
							if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
								neighbors += g[newI][newK]
							}
						})
						if (neighbors < 2 || neighbors > 3) {
							gridCopy[i][k] = 0
						} else if (g[i][k] === 0 && neighbors === 3) {
							gridCopy[i][k] = 1
								if (g[i][k] === 0 && neighbors === 3) {
									setGenerations((prevCount) => prevCount + 1)
								}
								else {
									setGenerations((prevCount) => prevCount)
								}
						}
					}

					}
		})
	})

	//#Recursive Implementation
	setTimeout(runSimulation, numSecs)
  }, [])


  return (
			<section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div className='App-header'>
					<h4> Generations: {generations}</h4>
				</div>
      <div className='App-header'>
				<button onClick={rules}>Rules</button>
				<button onClick={aboutGame}>About Game</button>
				<button onClick={about}>About Conway</button>

			</div>
				<div className='App-header'>
					<button
						onClick={() => {
							setRunning(!running)
							if (!running) {
								runningRef.current = true
								runSimulation()
							} else if (running) {
								setGenerations(0)
								setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
							}
						}}>
						{running ? 'Stop' : 'Start'}
					</button>
					<button onClick={fast}>Fast</button>
					<button onClick={slow}>Slow</button>
					<button
						onClick={() => {
							setGenerations(0)
							setRunning(false)
							setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
						}}>
						Clear
					</button>
					<button onClick={seed}>Seed</button>
				</div>
				<div className='App-header'>
					<button onClick={ten}>10x10 Grid</button>
					<button onClick={quarter}>25x25 Grid</button>
					<button onClick={fifty}>50x50 Grid</button>
				</div>
				<div style={{ boxShadow: '12px 12px 14px black', display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
					{gridBox.map((mapRows, i) =>
						mapRows.map((col, k) =>
							running ? (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										/*Inline Styling to Show Cell Death and Life on Each Version of State */
										background: gridBox[i][k] ? 'steelblue' : 'white',
                    border: '1px solid navy',
									}}
								/>
							) : (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										background: gridBox[i][k] ? 'steelblue' : 'white',
										border: '1px solid navy',
									}}
									onClick={() => {
										const newGrid = produce(gridBox, (gridBoxCopy) => {
											gridBoxCopy[i][k] = gridBoxCopy[i][k] ? 0 : 1
										})
										setGridBox(newGrid)
									}}
								/>
							),
						),
					)}
				</div>
			</section>
		)
}

export default Grid
