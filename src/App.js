import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert'


const App = () => {

  const initialExpenses = (localStorage.getItem("expenses") !== null) ? 
        JSON.parse(localStorage.getItem("expenses")) : [{ id: 1, charge: '콜라', amount: 2000},{ id: 2, charge: '빵', amount: 1000},{ id: 3, charge: '맥북', amount: 3000}];

  const [expenses, setExpenses] = useState(initialExpenses);

  // console.log(expenses)

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState('');

  const [edit, setEdit] = useState(false);
  
  const [alert, setAlert] = useState( { show:false } );
  

  /*
    { type: "danger", text: "아이템이 삭제되었습니다." }
    { type: "seccess", text: "아이템이 삭제되었습니다." }
  */

  const handleCharge = (e) => {
    setCharge(e.target.value);
  }
  
  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  }
  /*
  const handleEdit = (pickedItem) => {
    console.log(pickedItem);
    // 인덱스로 찾으면 편할 것 같은데 이유가 있을까?
    // 이 아이템의 참조는 현재 ExpenseItem 에서 지정되었다.
    
    // 수정버튼을 누르면 내가 누른 아이템의 이름과 값이 ExpenseForm 에 표시되어서 수정이 가능해야 한다.
    setCharge(pickedItem.charge);
    setAmount(pickedItem.amount);
  }
  */


  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }


  

  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpense)
    localStorage.setItem("expenses", JSON.stringify(newExpense));
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  }

  const clearItems = () => {
    setExpenses([]);
    localStorage.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if(edit){
        const newExpenses = expenses.map(item => {
          return item.id === id? {...item, charge, amount } : item;
        })

        console.log(expenses)
        console.log(newExpenses);
        setExpenses(newExpenses);
        localStorage.setItem("expenses", JSON.stringify(newExpenses)); // 로컬스토리지
        setEdit(false);
        handleAlert( {type: "success", text: "아이템이 수정되었습니다."} );
      }else{
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        // expenses.push(newExpense); => 불변성 지키지 X
        const newExpenses = [...expenses, newExpense]; //=> 불변성 지키는 0
        setExpenses(newExpenses);

        localStorage.setItem("expenses", JSON.stringify(newExpenses)); // 로컬스토리지
        
        setCharge("");
        setAmount(0);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }
    } else {
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며 amount 값은 0 보다 커야 합니다." });
    }
  };
  
  const handleAlert = ({type, text}) => {
    setAlert( {show: true, type, text} );
    
    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }

  return(
    <main className='main-container'>
      <div className='sub-container'>
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>장바구니</h1>

        <div style={ {width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          { /* Expense Form */}
          <ExpenseForm charge={charge} handleSubmit={handleSubmit} handleCharge={handleCharge} amount={amount} handleAmount={handleAmount} edit={edit} />
        </div>

        <div style={ {width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          { /* Expense List */}
          <ExpenseList expenses={expenses} clearItems={clearItems} initialExpenses={expenses} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>

        <div style={{ display:'flex', justifyContent: 'start', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem' }}>
            총합계: { expenses.reduce((acc,curr) => { return (acc += curr.amount);}, 0)}
          </p>
        </div>

      </div>
    </main>
  )
}

export default App;