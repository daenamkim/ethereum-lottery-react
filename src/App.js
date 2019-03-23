import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: '',
    };
  }

  async componentDidMount() {
    console.log(web3.version);
    web3.eth.getAccounts().then(console.log);

    // default { from: accounts[0] } of call's parameter
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  render() {
    const { manager } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {manager}</p>
      </div>
    );
  }
}

export default App;
