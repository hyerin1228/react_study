import { Component } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default class App extends Component{
  render() {
    return(
      <main className="main-container">
        <div className="sub-container">
          <h1>장바구니</h1>

          <div style={ {width: '100%', backgroundColor: 'white', padding: '1rem' }}>
            { /* Expense Form */}
            <ExpenseForm />
          </div>

          <div style={ {width: '100%', backgroundColor: 'white', padding: '1rem' }}>
            { /* Expense List */}
            <ExpenseList />
          </div>

          <div style={{ display:'flex', justifyContent: 'start', marginTop: '1rem' }}>
            <p style={{ fontSize: `2rem` }}>
              총합계:
            </p>
          </div>

        </div>
      </main>
    )
  }

}
