import * as React from 'react';
import {Component, ClassAttributes} from 'react';
import {formattedSeconds} from './util';

interface LapProps extends ClassAttributes<Lap> {}
interface LapState {
  items: number[];
}

class Lap extends Component<LapProps, LapState> {
  constructor(props: LapProps) {
    super(props);
    this.state = {
      items: [],
    };
  }

  handleLapClick(elapsedTime: number) {
    this.setState({
      items: this.state.items.concat(elapsedTime),
    });
  }

  handleResetClick() {
    this.setState({
      items: [],
    });
  }

  handleDeleteClick = (index: number) => {
    const list = this.state.items.filter((item, j) => index !== j);
    this.setState({
      items: list,
    });
  };

  render() {
    return (
      <div className="stopwatch-laps">
        {this.state.items.map((item: number, i: number) => (
          <div className="stopwatch-lap" key={i}>
            <strong>{i + 1}</strong>/ {formattedSeconds(item)}{' '}
            <button onClick={() => this.handleDeleteClick(i)}> X </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Lap;
