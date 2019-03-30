import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '0',
  };

  async componentDidMount() {
    console.log(web3.version);
    web3.eth.getAccounts().then(console.log);

    // default { from: accounts[0] } of call's parameter
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getAllPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  render() {
    const { manager, players, balance } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {manager}.</p>
        <p>
          There are currently {players.length} people entered, competing to win
          {web3.utils.fromWei(balance, 'ether')} ether!
        </p>
      </div>
    );
  }
}

export default App;
