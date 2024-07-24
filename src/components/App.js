<p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>
import React, { createContext, memo, useEffect, useRef, useState } from 'react'
import '../styles/App.css'
import { useReducer } from 'react'
import { Reducer,initialState } from './Reducer'
export const Datacontext=createContext();
const App = () => {
  const [state,dispatch]=useReducer(Reducer,initialState);
  // const array=[
  //   {
  //     id: 1,
  //     title: "Samsung Galaxy S7",
  //     price: 599.99,
  //     img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",
  //     amount: 1,
  //   },
  //   {
  //     id: 2,
  //     title: "google pixel ",
  //     price: 499.99,
  //     img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",
  //     amount: 1,
  //   },
  //   {
  //     id: 3,
  //     title: "Xiaomi Redmi Note 2",
  //     price: 699.99,
  //     img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368224/phone-3_h2s6fo.png",
  //     amount: 1,
  //   }
  // ];
  const [list,setlist]=useState(state.arraydata);
  const handleremoveitem=(item)=>{
    setlist((list)=>list.filter((elem)=>elem.title!=item.title));
  }
 const total=()=>{
  let a=0;
  const arr=[...list];
  arr.forEach(item=>{
    a+=item.amount*item.price;
  });
  return a;
 }
  const increment=(i)=>{
    setlist(list=>{
      const arr=[...list];
      arr[i].amount++;
      return arr;
    });
  }
  const decrement=(i)=>{
    setlist(list=>{
      const arr=[...list];
      arr[i].amount==1?delete arr[i]:arr[i].amount--;
      const arr1=arr.filter(item=>item);
      return arr1;
    });
  }
  
  return (
   <Datacontext.Provider value={{list,increment,decrement}}>
    <div id='main'>
    <nav className='navbar'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>(<span id='nav-cart-item-count'>{list.length}</span>Items)<h1>useReducer</h1>
    </nav>
    {list.length>0 && <div id='cart-items-list'>
    {list.map((item,i)=>{
      return<div className='item' key={'a'+i}>
        {i!=3 && <div><img src={item.img}/>
            <h4>{item.title}</h4>
            <p id={'cart-item-price-'+item.id}>Price:{item.price}</p>
            <button id={'decrement-btn-'+item.id} onClick={()=>{decrement(i)}}>-</button>
           <span id={'cart-amount-'+item.id}>
             {item.amount}
            </span>
            {/* <p>Amount:{(item.price*item.amount).toFixed(2)}</p> */}
           <button id={'increment-btn-'+item.id} onClick={()=>{increment(i)}}>+</button>
          <button onClick={()=>{handleremoveitem(item)}} id={'cart-item-remove-'+item.id}>Remove</button></div>}
      </div>
    })}
    <p id='cart-total-amount'>$ {total().toFixed(2)}</p>
   <button onClick={()=>setlist([])} id='clear-all-cart'>Clear All</button>
    </div>}
    {list.length==0 && <p>Cart is currently empty</p>}
    </div>
    
   </Datacontext.Provider>
  )
}

export default memo(App)
