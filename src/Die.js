import React, { Component } from "react";
import "./Die.css";
/** Props:
 *        - toggleLocked()
 *        - index (idx)
 *        - locked
 *        - value (val)
 */
// finally using handleClick as callback for onClick.
// this.props.handleClick comes from > Dice component > this.props.handleClick comes from Game Compoent as a refrence from toggleLock
class Die extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  // calling the method that was passed down from the Game > down to Dice > down to each Die
  // pass in the index of each die component to update the state in the game component
  handleClick() {
    this.props.handleClick(this.props.idx); // toggleLocked
  }
  render() {
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick={this.handleClick}
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
