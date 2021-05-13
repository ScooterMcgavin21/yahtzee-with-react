import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
/** STATE:
 *        - dice
 *        - locked             <------------------------------------------
 *        - scores             <---------------------------------------- |
 *        - rollsLeft                                                  | |
 *///                                                                  | |
/** METHODS                                                            | |
 *        -toggleLocked --> pass to Dice comp. --> pass to Die     --> | update STATE (locked)
 *        -doScores     --> pass to ScoreTable --> pass to RuleRow --> update STATE (scores)
 */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }
  // takes random numbers and generates them for unlocked dice, updates state, tracks rollsLeft
  // called by button 
  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1
    }));
  }

  // gets passed down to Dice component under prop handleClick > 2nd pass down to each Die Component 
  toggleLocked(idx) {
    //console.log(idx);
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0) {
      this.setState(st => ({
        locked: [                     // take old version of locked
          ...st.locked.slice(0, idx), // keep everything the same from before that index
          !st.locked[idx],            // at that index, flip it from true to false
          ...st.locked.slice(idx + 1) // keep the rest of the array the same, updating what the index is
        ]
      }));
    }
  }

  // pass down to scoreTable > scoreTable passes down as prop to RuleRow where doScore is finally called 
  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>
          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
