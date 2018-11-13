import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

const apiBaseAddress = "https://boiling-brook-94902.herokuapp.com/transactions";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: '',
    sortDescription: false,
    sortCategory: false
  };

  fetchInfo = () => {
    fetch(apiBaseAddress)
      .then(r => r.json())
      .then(transactionsArray => this.setState({
        transactions: transactionsArray
      }));
  }

  componentDidMount() {
    this.fetchInfo()
  }

  handleChange(event) {
    // your code here
  }

  filterDescriptionAndCategory = () => {
    if (this.state.searchTerm === '') {
      this.fetchInfo()
    } else {
      fetch(apiBaseAddress)
        .then(r => r.json())
        .then(transactionsArray => this.setState({
          transactions: transactionsArray.filter(
            transactionObj => transactionObj.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || transactionObj.category.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          )
        }))
    }
  }

  sortByCategory = () => {
    this.setState({
      sortCategory: !this.state.sortCategory
    })
    if (this.state.sortCategory === false) {
      this.setState({
        transactions: this.state.transactions.sort(function(a, b) {
          if (a.category > b.category)
          {
            return 1
          } else {
            return -1
          }
        })
      })
    } else {
      this.setState({
        transactions: this.state.transactions.sort(function(a, b) {
          if (a.category > b.category)
          {
            return -1
          } else {
            return 1
          }
        })
      })
    }

  }

  sortByDescription = () => {
    this.setState({
      sortDescription: !this.state.sortDescription
    })
    if (this.state.sortDescription === false) {
      this.setState({
        transactions: this.state.transactions.sort(function(a, b) {
          if (a.description > b.description)
          {
            return 1
          } else {
            return -1
          }
        })
      })
    } else {
      this.setState({
        transactions: this.state.transactions.sort(function(a, b) {
          if (a.description > b.description)
          {
            return -1
          } else {
            return 1
          }
        })
      })
    }

  }

  getSearchTerm = (event) => {
    this.setState({
      searchTerm: event
    })
    this.filterDescriptionAndCategory()
  }

  render() {
    return (
      <div>
        <Search getSearchTerm={this.getSearchTerm}/>
        <TransactionsList transactions={this.state.transactions}
        sortByCategory={this.sortByCategory}
        sortByDescription={this.sortByDescription}
        />
      </div>
    );
  }
}

export default AccountContainer;
