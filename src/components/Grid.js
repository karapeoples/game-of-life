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

  return (
			<section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div className='App-header'>
					<h4> Generations: {generations}</h4>
				</div>

				<div className='App-header'>
					<button
						onClick={() => {
							setRunning(!running)
							if (!running) {
								runningRef.current = true
								runSimulation()
              }
              else if (running){
                setGenerations(0)
                setGridBox(Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0)))
              }
						}}>
						{running ? 'Stop' : 'Start'}
        </button>
         <button onClick ={fast}>Fast</button>
         <button onClick ={slow}>Slow</button>
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
				<div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
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
