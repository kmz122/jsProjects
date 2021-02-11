import React from 'react';
import './App.css';
import Note from './Note';

class Board extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          notes: []
      };
  }

  nextId = () => {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

  add = (text) => {
      let notes = [
          ...this.state.notes, 
          {
              id: this.nextId(),
              note: text
          }
      ]
      this.setState({notes})
  }

  update = (newTextRef, id) => {
      let notes = this.state.notes.map(
          note => (note.id !== id) ? 
              note:
              {
                  ...note,
                  note: newTextRef
              }
      )
      this.setState({notes})
  }

  remove = (id) => {
      let notes = this.state.notes.filter(
          note => note.id !== id
      )
      this.setState({notes})
  }

  eachNote = (note) => {
      return(
          <Note key={note.id}
                  id={note.id}
                  onChange={this.update}
                  onRemove={this.remove}>{note.note}</Note> // "note" is arry so we need to use "note.note" to get data
      )
  }

  render(){
      return(
          <div className="board">
              {this.state.notes.map(this.eachNote)}
              <button onClick={()=>this.add()}>+</button>
          </div>
      )
  }
}

// ReactDOM.render(<Board />, document.getElementById(('react-container')));

export default Board;
