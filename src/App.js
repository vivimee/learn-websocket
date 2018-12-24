import React, { Component } from 'react';
import ChartWin from './components/ChartWindow';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartWindows: [{}]
    }
  }
  componentDidMount() {
    
  }
  addWindow = () => {
    const windows = this.state.chartWindows.concat([]);
    windows.push({});
    this.setState({ chartWindows: windows });
  }
  render() {
    const { chartWindows } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        {/* <div>
          <span className="btn" onClick={this.addWindow}>增加窗口</span>
        </div> */}
        <div className="window-box">{
          chartWindows.map((item, idx) => (<ChartWin key={idx} />))
        }</div>
      </div>
    );
  }
}

export default App;
