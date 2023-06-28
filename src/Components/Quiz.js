import React, { useState,useEffect } from 'react'

import  Data from  './Data.json'

function Quiz() {
    const [data,setData]=useState(Data)
    const [numqns,setNumqns]=useState(0)
    const [qnstype,setQnstype]=useState([])
    const [final,setFinal]=useState("")
 
  
    const fetchdata=()=>{
        fetch('Data.json').then(Response=>{
           return  Response.json()
        }).then(data=>{
     
            setData(data)
            
        })

    }
 

useEffect(() => {
 
fetchdata()
types()
  
}, [])

function checkans(selectedans,item){
  if(selectedans===item.correctAnswer){
    alert("correct")
    return true

  }else{
    alert("wrong")
    return false
  }
}

const onchangehandler=(e)=>{
  console.log(e.target.value)
  setNumqns(e.target.value)
  
}

 const onchangehandlerone=(e)=>{
  console.log(e.target.value)
  setFinal(e.target.value)
  console.log(final)
 }

function types(){


const types=[]
data.map((x)=>{
  return types.push(x.type)
})

console.log(types);
 const fd=  types.filter((item,
  index)=>types.indexOf(item) === index);
  
  setQnstype(fd);
  return fd
}
  return (
    <div>
     
     <input type='number' placeholder='enter number' onChange={onchangehandler} style={{border:"none"}}/>
    {qnstype.map((l)=>{
        return <label>{l}<input type='radio' onChange={onchangehandlerone} value={l} name={"ans"}/></label>
     })}
    
    
       {data.filter((y)=>y.type===final).sort(() => Math.random() - 0.5).slice(0, numqns).map((x)=>{
       
        console.log("x",x);
        return <div key={x.id}>
            <p>{x.question}</p>
            <div>{x.choices.map((item)=>{
              console.log("item",item);
              return  <button style={{borderRadius:"10px",width:"130px",height:"30px",margin:"7px"}}key={item.id} onClick={()=>checkans(item,x)}>{item}</button>
            })}</div>
         </div>
       })}
    </div>
  )
}

export default Quiz