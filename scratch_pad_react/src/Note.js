import React from 'react';
import Draggable from 'react-draggable';
import './App.css';

class Note extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
        }
        this.newTextRef = React.createRef()
    }

    componentWillMount = () => {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight -150, 'px')
        }
    }

    randomBetween = ( x, y, s ) => {
        return ( x + Math.ceil(Math.random() * (y - x)) ) + s                    
    }

    Edit = () => {
        this.setState({edit: true});
    }
    Save = () => {
        this.props.onChange(this.newTextRef.current.value, this.props.id)
        this.setState({edit: false});
        // alert('This is save as: ' + this.newTextRef.current.value)
    }
    Delete = (id) => {
        this.props.onRemove(this.props.id)
        // alert("Deleted");
    }

    renderForm(){
        return(
            <div className="note" style={this.style}>
                <textarea ref={this.newTextRef}></textarea>
                <br/>
                <button onClick={this.Save}>Save</button>
            </div>
        )
    }

    renderDisplay(){
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.Edit}> Edit </button>
                    <button onClick={this.Delete}> X </button>
                </span>
            </div>
        )
    }
    render(){
        return(
            <Draggable> 
                {
                (this.state.edit) ? this.renderForm() : this.renderDisplay()
                }
            </Draggable>
        )
        // if(this.state.edit) return this.renderForm();
        // else return this.renderDisplay();
    }
}

// ReactDOM.render(<Note>Hello Notes</Note>, document.getElementById('react-container'))

export default Note;