import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

const apiBaseAddress = "http://localhost:4000/transactions";

class AccountContainer extends Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    fetch(apiBaseAddress)
      .then(r => r.json())
      .then(transactions => this.setState({ transactions }));
  }

  handleChange(event) {
    // your code here
  }

  render() {
    return (
      <div>
        <Search />
        <TransactionsList transactions={this.state.transactions} />
      </div>
    );
  }
}

export default AccountContainer;
