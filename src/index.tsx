import React from 'react';
import ReactDOM from 'react-dom';
import {Component, ClassAttributes} from 'react';
import Lap from './Lap';
import {formattedSeconds} from './util';

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {
  incrementer: any;
  private lap: React.RefObject<Lap>;

  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: null,
    };
    this.lap = React.createRef();
  }

  handleStartClick = () => {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      });
    }, 1000);
  };

  handleStopClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  };

  handleResetClick = () => {
    clearInterval(this.incrementer);
    this.lap.current!.handleResetClick();
    this.setState({
      secondsElapsed: 0,
    });
  };

  handleLapClick = () => {
    this.lap.current!.handleLapClick(this.state.secondsElapsed);
  };

  render() {
    const {secondsElapsed, lastClearedIncrementer} = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}

        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type="button" onClick={this.handleLapClick}>
            lap
          </button>
        ) : null}

        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type="button" onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}

        <div className="stopwatch-laps">
          <Lap ref={this.lap} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Stopwatch initialSeconds={0} />,
  document.getElementById('content')
);
