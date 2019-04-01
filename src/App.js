import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '0',
    value: '',
    message: '',
  };

  async componentDidMount() {
    console.log('Web3 Version: ', web3.version);
    await web3.eth.getAccounts().then(console.log);
    // const accounts = await web3.eth.getAccounts();
    // default { from: accounts[0] } of call's parameter
    // const manager = await lottery.methods.manager().call({ from: accounts[0] });
    // const players = await lottery.methods.getAllPlayers().call({ from: accounts[0] });
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getAllPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transactions success...' });

    console.log(accounts);

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    // TODO: show winner's address after modifying solidity
    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    const { manager, players, balance, message } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {manager}.</p>
        <p>
          There are currently {players.length} people entered, competing to win{` `}
          {web3.utils.fromWei(balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{message}</h1>
      </div>
    );
  }
}

export default App;
