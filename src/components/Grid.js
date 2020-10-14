import React, {useState} from 'react'
import produce from 'immer'


const Grid = () => {
  const numRows = 25
  const numCols = 25

  const [gridBox, setGridBox] = useState(() => {
  const rows = [];
    for (let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), ()=> 0))
    }
    return rows
})

  return (
    <section style={{ display: 'flex', justifyContent: 'center'}}>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
      { gridBox.map((mapRows, i) => mapRows.map((col, k) => (
        <div key={`${i}-${k}`} style={{
          width: 20,
          height: 20,
          background: gridBox[i][k] ? "steelblue" : 'white',
          border: '1px solid navy',
        }}
          onClick={() => {
            const newGrid = produce(gridBox, gridBoxCopy => {
              gridBoxCopy[i][k]=1
            })
            setGridBox(newGrid)
          }}></div>
      )))

      }

      </div>
    </section>
  )
}

export default Grid
