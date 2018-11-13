import React from "react";

const Transaction = (props) => {
  // console.log(props.transaction);
  return (
    <tr>
      <td>{props.transaction.posted_at}</td>
      <td>{props.transaction.description}</td>
      <td>{props.transaction.category}</td>
      <td>{props.transaction.amount}</td>
    </tr>
  );
};

export default Transaction;
