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
  render() {
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick={this.props.handleClick}
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
