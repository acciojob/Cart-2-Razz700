{/* <p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>
import React, { createContext, useState } from 'react'
import '../styles/App.css'
import { useReducer } from 'react'
import { Reducer,initialState } from './Reducer'
const App = () => {
  const [state,dispatch]=useReducer(Reducer,initialState);
  const array=[
    {
      id: 1,
      title: "Samsung Galaxy S7",
      price: 599.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",
      amount: 1,
    },
    {
      id: 2,
      title: "google pixel ",
      price: 499.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",
      amount: 1,
    },
    {
      id: 3,
      title: "Xiaomi Redmi Note 2",
      price: 699.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368224/phone-3_h2s6fo.png",
      amount: 1,
    },
  ];
  console.log(array);
  const [list,setlist]=useState(array);
  const [count,setcount]=useState([1,1,1]);
  const Datacontext=createContext();
  const handleremoveitem=(item)=>{
    console.log(item);
    setlist((list)=>{
      const arr=list.filter((elem)=>elem.title!=item.title);
      return arr;
    });
  }
 const total=()=>{
  let a=0;
  amount.forEach((item)=>{
    a+=item;
  });
  return a;
 }
  const [amount,setamount]=useState(()=>{
    const arr=[];
    list.forEach((item)=>{
     arr.push(item.price);
    });
    return arr;
  });
  return (
   <Datacontext.Provider value={array}>
    <div id='main'>
    <nav className='navbar'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>(<span id='nav-cart-item-count'>{list.length}</span>Items)<h1>useReducer</h1>
    </nav>
    {list.length>0 && <div id='cart-items-list'>
    {list.map((item,i)=>{
      return <div className='item' key={'a'+i}>
        <img src={item.img}/>
            <h4>{item.title}</h4>
            <p id={'cart-item-price-'+item.id}>Price:{item.price}</p>
             <button id={'decrement-btn-'+item.id} onClick={()=>{setcount(count=>{const arr=[...count];
              arr[i]==1?arr[i]=1:arr[i]--;
              return arr;
             });
             if (count[i]!=1) {
              setamount(amount=>{
                amount[i]-=parseInt(item.price);
                return amount;
               });
             }
            //  else{
            //   setamount(amount=>{
            //     const arr=[...amount];
            //     delete arr[i];
            //     const arr1=[];
            //     arr.forEach((item)=>{
            //       if(item)arr1.push(item);
            //     });
            //     return arr1;
            //   })
            //  }
            }}>-</button><span id={'cart-amount-'+item.id}>{count[i]}</span><button id={'increment-btn-'+item.id} onClick={()=>{
              setcount(count=>{
                const arr=[...count];
                arr[i]++;
                return arr;
              });
              setamount(amount=>{
                amount[i]+=parseInt(item.price);
                return amount;
              });
             }}>+</button>
             <p>Amount:{amount[i].toFixed(2)}</p>
             <button onClick={()=>{
               handleremoveitem(item);
                setamount(amount=>{
                  const arr=[...amount];
                  delete arr[i];
                  const arr1=[];
                  arr.forEach((item)=>{
                    if(item)arr1.push(item);
                  });
                  return arr1;
                })
             }} id={'cart-item-remove-'+item.id}>Remove</button>
      </div>
    })}
    <p id='cart-total-amount'>{total().toFixed(2)}</p>
    <button onClick={()=>setlist([])} id='clear-all-cart'>Clear All</button>
    </div>}
    {list.length==0 && <p>Cart is currently empty</p>}
    </div>
    
   </Datacontext.Provider>
  )
}

export default App */}
import React, { createContext, useState, useReducer } from 'react';
import '../styles/App.css';
import { Reducer, initialState } from './Reducer';

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const array = [
    {
      id: 1,
      title: "Samsung Galaxy S7",
      price: 599.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",
      amount: 1,
    },
    {
      id: 2,
      title: "google pixel ",
      price: 499.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",
      amount: 1,
    },
    {
      id: 3,
      title: "Xiaomi Redmi Note 2",
      price: 699.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368224/phone-3_h2s6fo.png",
      amount: 1,
    },
  ];
  const [list, setList] = useState(array);
  const [count, setCount] = useState([1, 1, 1]);
  const Datacontext = createContext();

  const handleRemoveItem = (item) => {
    setList((list) => list.filter((elem) => elem.title !== item.title));
    setCount((count) => count.filter((_, index) => list[index].id !== item.id));
  };

  const total = () => {
    return list.reduce((acc, item, index) => acc + item.price * count[index], 0);
  };

  const increment = (index) => {
    setCount((count) => {
      const newCount = [...count];
      newCount[index]++;
      return newCount;
    });
  };

  const decrement = (index) => {
    setCount((count) => {
      const newCount = [...count];
      newCount[index] = newCount[index] > 1 ? newCount[index] - 1 : 1;
      return newCount;
    });
  };

  return (
    <Datacontext.Provider value={array}>
      <div id="main">
        <nav className="navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          (<span id="nav-cart-item-count">{list.length}</span> Items)
          <h1>useReducer</h1>
        </nav>
        {list.length > 0 ? (
          <div id="cart-items-list">
            {list.map((item, i) => (
              <div className="item" key={item.id}>
                <img src={item.img} alt={item.title} />
                <h4>{item.title}</h4>
                <p id={'cart-item-price-' + item.id}>Price: {item.price}</p>
                <button
                  id={'decrement-btn-' + item.id}
                  onClick={() => decrement(i)}
                >
                  -
                </button>
                <span id={'cart-amount-' + item.id}>{count[i]}</span>
                <button
                  id={'increment-btn-' + item.id}
                  onClick={() => increment(i)}
                >
                  +
                </button>
                <p>Amount: {(item.price * count[i]).toFixed(2)}</p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  id={'cart-item-remove-' + item.id}
                >
                  Remove
                </button>
              </div>
            ))}
            <p id="cart-total-amount">{total().toFixed(2)}</p>
            <button onClick={() => setList([])} id="clear-all-cart">
              Clear All
            </button>
          </div>
        ) : (
          <p>Cart is currently empty</p>
        )}
      </div>
    </Datacontext.Provider>
  );
};

export default App;
