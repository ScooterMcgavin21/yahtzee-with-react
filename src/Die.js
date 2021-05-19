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
  static defaultProps = {
    diceWord: ['one', 'two', 'three', 'four', 'five', 'six'],
    val: 5
  };
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
    const { diceWord, locked, val, disabled, rolling } = this.props;
    let classes = `Die fas fa-dice-${diceWord[val - 1]} fa-5x `;
    if (locked) classes += 'Die-locked';
    if (rolling) classes += 'Die-rolling';
    return (
      <i
        className={classes}
        onClick={this.handleClick}
        disabled={disabled}
      >
      </i>
    );
  }
}

export default Die;
