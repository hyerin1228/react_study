import React from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';
import {MdDelete} from 'react-icons/md'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ExpenseList = ({ expenses, setExpenses, initialExpenses, handleDelete, handleEdit, clearItems}) => {
  
  const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;
  const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    padding: grid * 2,
    marginBottom: grid,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      expenses,
      result.source.index,
      result.destination.index
    );

    // console.log(newItems);
    // console.log(expenses);
    setExpenses(newItems);
    localStorage.setItem("expenses", JSON.stringify(newItems));
    
  };


  return (
    //   <React.Fragment>
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <ul className='list' ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {initialExpenses.map((expense,index) => { 
                return(
                  <Draggable key={expense.id} draggableId={expense.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        style={getItemStyle(
                          provided.draggableStyle,
                          snapshot.isDragging
                        )}
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        >
                        <ExpenseItem
                          key={expense.id} expense={expense} 
                          handleDelete = {handleDelete}
                          handleEdit = {handleEdit}
                        />
                      </li>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>

    { expenses.length > 0 ?
      <button className='btn' onClick={clearItems}>
          목록 지우기
          <MdDelete  className='btn-icon'/>
      </button>
      : null}
  </>
  )
}

export default ExpenseList;

