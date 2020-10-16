import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'

const operations = [
  [0, 1],
  [1, 1],
  [0,-1],
  [1,-1],
  [-1,1],
  [-1,-1],
  [1,0],
  [-1,0],
]
const Button = ({numRows, numCols, gridBox, setGridBox}) => {
   const [running, setRunning] = useState(false)

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
								}
							}
						}
					})
				})

				setTimeout(runSimulation, 100)
			}, [])

  return (
    <div className='App-header'>
      <button onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>{running ? 'Stop': 'Start'}</button>
    </div>
  )
}

export default Button
