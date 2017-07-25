import React, { Component } from 'react';
import './App.css';

const ARRAY_SIZE = 20;
const get = (table, y, x) => (table[y] || [])[x];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      grid: Array(ARRAY_SIZE).fill().map(() => new Array(ARRAY_SIZE).fill(false)),
      timer: {}
    }
  }

  onCheck = (x, y) => event => {
    const {grid} = this.state;
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[y][x] = !grid[y][x];
    this.setState({grid: newGrid});
  }

  updateCell = (grid, x, y) => {
    // const {grid} = this.state;
    const cell = grid[y][x];
    const neighbors = [
      get(grid, y-1, x-1), get(grid, y-1, x), get(grid, y-1, x+1),
      get(grid, y, x-1), get(grid, y, x+1),
      get(grid, y+1, x-1), get(grid, y+1, x), get(grid, y+1, x+1)
    ].filter(x => x).length;
    if (cell) {
      if (neighbors < 2) {
        return false;
      } else if (neighbors > 3) {
        return false;
      } else if (neighbors === 2 || neighbors === 3) {
        return true;
      }
    } else {
      if (neighbors === 3) {
        return true;
      }
    }
  }

  step = event => {
    const {grid} = this.state;
    const newGrid = JSON.parse(JSON.stringify(grid));
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        newGrid[y][x] = this.updateCell(grid, x, y);
      });
    });
    this.setState({grid: newGrid});
  }

  play = () => {
    const aTimer = setInterval(this.step, 100);
    this.setState({timer: aTimer})
  }

  pause = () => {
    const timer = this.state.timer
    clearInterval(timer)
  }

   reset = () => {
     const blank = Array(ARRAY_SIZE).fill().map(() => new Array(ARRAY_SIZE).fill(false));
     this.setState({grid: blank});
   }

  render() {
    const {grid} = this.state;
    return (
      <div>
        <h1>Game Of Life</h1>
        <div className="grid">
          {grid.map((row, y) =>
            <div key={y} className="row">
              {row.map((cell, x) =>
                <div key={x} className={`cell ${cell}`} onClick={this.onCheck(x, y)} ></div>
              )}
            </div>
          )}
        </div>
        <button onClick={this.play} >{'▶︎'}</button>
        <button onClick={this.pause}>{'◼︎'}</button>
        <button onClick={this.reset}>RESET</button>
      </div>
    );
  }
}

export default App;
