import React, { memo, useContext, useState } from 'react'
import {Datacontext} from './App'
const Amount = () => {
    const {list,inc,dec}=useContext(Datacontext);
    console.log(list,inc,dec);
    const [amount,setamount]=useState([1,1,1]);
  return (
    <>
    1
    </>
  )
}

export default memo(Amount);