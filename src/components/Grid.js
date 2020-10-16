import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'


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
let numRows = 15
let numCols = 15
let numSecs = 100
const Grid = () => {


  const [gridBox, setGridBox] = useState(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
  const [running, setRunning] = useState(false)
  const [generations, setGenerations] = useState(0)


  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGridBox((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0
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
              setGenerations((prevCount) => prevCount + 1)
            }
          }
        }
      })
    })

    setTimeout(runSimulation, numSecs)
  }, [])

  const ten = () => {
    numRows = 10
		numCols = 10
		setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
}
const fifty = () => {
  numRows = 50
  numCols = 50
  setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
}

  const quarter = () => {
    numRows = 25
		numCols = 25
		setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
  }
const seed = () => {
    setGridBox((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            gridCopy[i][k] = Math.floor(Math.random() * 2)
          }
          setGenerations(0);
          setRunning(false)
        }
      })
    })
}
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
		#1- Any live cell with fewer than two live neighbors dies (underpopulation).
		#2- Any live cell with or three live neighnors live on to the next generation.
		#3- Any live cell with more than thee live neighbors dies (overpopulation).
		#4- Any dead cell with exactly three live neighbors becomes  live cell (reproduction).`)
	}



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
