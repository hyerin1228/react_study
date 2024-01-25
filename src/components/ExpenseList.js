import React from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';


const ExpenseList = ({initialExpenses, handleDelete}) => {
  return (
    //   <React.Fragment>
    <>
    <ul className='list'>
      {initialExpenses.map(expense => {
        return(
          <ExpenseItem key={expense.id} expense={expense} 
            handleDelete = {handleDelete}/>
        )
      })}
    </ul>
    <button className='btn'>
        목록 지우기
    </button>
  </>
  )
}

export default ExpenseList;

