import React, {useState, useEffect} from 'react';
import axios from 'axios';

// This curl 100% Creates a new category
// curl -i -X POST http://localhost:61989/api/category -H "accept: application/json" -H "Content-Type: application/json" -d "{\"Name\":\"Beverages\",\"Description\":\"We Got Drinks\",\"is_active\":true}"


export default function CreateCategory() {
  const [error, setError] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [state, setState] = useState({
    name: '',
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
    axios
      .post('http://localhost:61989/api/category', state)
      .then(res => {
        console.log(state);
        setConfirmed(true)
        setError(false)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
    {error? "Please Fill All Fields":""}
      <form action="" method="get" class="form-example">
      <h4>Category Name</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, name: e.target.value}))}}/>
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
      <button onClick={(e) => {confirmCreate(e)}} >Confirm</button>
      <button>Back</button>
      </form>
      {confirmed? "Category Created":""}
    </>
  )
}
