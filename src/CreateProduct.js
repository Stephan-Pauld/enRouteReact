import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function CreateProduct(props) {
  const [error, setError] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [state, setState] = useState({
    name: '',
    category: '',
    cost: 0,
    description: '',
    isActive: false,
  })

  const confirmCreate = (e) => {
    e.preventDefault();

    for(const check in state){
      if(!state[check] && check !== 'isActive'){
        setError(true)
        setConfirmed(false)
        return;
      }
    }
    const product = { 
        "Name":"hamster",
        "CategoryId":1,
        "Cost":69,
        "Description":"Mostly Water",
        "is_active":true
    }
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    console.log(state);
    axios
      .post('http://localhost:61989/api/product', product )
      .then(res => {
        setConfirmed(true)
        setError(false)
      })
      .catch(err => {
        console.log(err);
      })
      
    // createCategory(false)
  }
  // curl -i -X POST http://localhost:61989/api/product -H "accept: application/json" -H "Content-Type: application/json" -d "{\"Name\":\"celery\",\"CategoryId\":1,\"Cost\":69,\"Description\":\"Mostly Water\",\"is_active\":true}"


  return (
    <>
    {error? "Please Fill All Fields":""}
      <form action="" method="get" class="form-example">
      <h4>Name</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, name: e.target.value}))}}></input>
      <br/>
      <h4>Category</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, category: e.target.value}))}}></input>
      <br/>
      <h4>Cost</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, cost: e.target.value}))}}></input>
      <br/>
      <h4>Description</h4>
      <textarea onChange={(e)=>{setState((prev) => ({...prev, description: e.target.value}))}}></textarea>
      <br/>
      <h4>Is Active?</h4>
      
        <select onChange={(e)=>{setState((prev) => ({...prev, isActive: e.target.value}))}}>
          <option>Please Select</option>
          <option value="False">False</option>
          <option value="True">True</option>
        </select>

      <br/>
      <button onClick={(e) => {confirmCreate(e)}}>Confirm</button>
      <button>Back</button>
      </form>
      {confirmed? "Product Created":""}
    </>
  )
}
