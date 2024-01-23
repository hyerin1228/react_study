import React, { Component } from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';

export default class ExpenseList extends Component {
  render() {
    return (
        //   <React.Fragment>
        <>
          <ul className='list'>
            <ExpenseItem />
          </ul>
          <button className='btn'>
              목록 지우기
          </button>
        </>
    )
  }
}
