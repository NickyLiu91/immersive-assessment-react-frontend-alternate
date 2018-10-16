import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

const apiBaseAddress = "http://localhost:4000/transactions";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: "",
    sortBy: null,
    sortDirection: "asc",
    sortCriteria: {
      asc: [1, -1],
      desc: [-1, 1]
    }
  };

  componentDidMount() {
    fetch(apiBaseAddress)
      .then(r => r.json())
      .then(transactions => this.setState({ transactions }));
  }

  handleSearchTerm = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  applySearchTerm = () => {
    return this.state.transactions.filter(t => {
      return (
        t.description
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    });
  };

  transactionsToDisplay = event => {
    const transactionsToDisplay = this.applySearchTerm();

    if (this.state.sortBy) {
      const softFn = (a, b) => {
        return a[this.state.sortBy] > b[this.state.sortBy]
          ? this.state.sortCriteria[this.state.sortDirection][0]
          : b[this.state.sortBy] > a[this.state.sortBy]
            ? this.state.sortCriteria[this.state.sortDirection][1]
            : 0;
      };
      return transactionsToDisplay.sort(softFn);
    } else {
      return transactionsToDisplay;
    }
  };

  handleSort = propertyName => {
    if (this.state.sortBy === propertyName) {
      const sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
      this.setState({
        sortDirection
      });
    } else {
      this.setState({ sortBy: propertyName, sortDirection: "asc" });
    }
  };

  render() {
    return (
      <div>
        <Search
          handleSearchTerm={this.handleSearchTerm}
          searchTerm={this.state.searchTerm}
        />
        <TransactionsList
          handleSort={this.handleSort}
          transactions={this.transactionsToDisplay()}
        />
      </div>
    );
  }
}

export default AccountContainer;
