import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function EditProduct(props) {
  const {item, category, categories} = props;
  const [error, setError] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const [state, setState] = useState({
    name: '',
    cat_id: item.categoryId,
    cost: 0,
    description: '',
    isActive: false,
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      name: item.name,
      cat_id: item.categoryId,
      cost: item.cost,
      description: item.description,
      isActive: item.is_active,
    }))
  }, [])

  const confirmation = (e) => {
    e.preventDefault()
    // Checking for all state to be filled out
    console.log(state);
    for(const check in state){
      if(!state[check] && check !== 'isActive'){
        setError(true)
        setConfirmed(false)
        return;
      }
      // Set error state to false?
    }
    const bodyChange = [{"op":"replace","path":"name","value":state.name},
                        {"op":"replace","path":"cost","value":state.cost},
                        {"op":"replace","path":"categoryId","value":state.cat_id},
                        {"op":"replace","path":"description","value":state.description},
                        {"op":"replace","path":"is_active","value":state.isActive}]

    axios
      .patch(`http://localhost:61989/api/product/${item.id}`, bodyChange)
      .then(res => {
        setConfirmed(true)
        setError(false)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const categoryList = () => {
    const catList = [];
    categories.map(cat => {
      if (cat.name !== category[1]){
        catList.push(<option value={cat.id}>{cat.name}</option>)
      }
    })
    return catList
  }

  return (
    <>
      {error? "Please Fill All Fields":""}
      <form action="" method="get" class="form-example">
      <h4>Name</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, name: e.target.value}))}} value={state.name}></input>
      <br/>
      <h4>Category</h4>
      <select onChange={(e)=>{setState((prev) => ({...prev, cat_id: e.target.value}))}}>
      <option value={category[0]}>{category[1]}</option>
      {categoryList()}
      </select>
      <br/>
      <h4>Cost</h4>
      <input onChange={(e)=>{setState((prev) => ({...prev, cost: e.target.value}))}} value={state.cost}></input>
      <br/>
      <h4>Description</h4>
      <textarea onChange={(e)=>{setState((prev) => ({...prev, description: e.target.value}))}} value={state.description}></textarea>
      <br/>
      <h4>Is Active?</h4>
      
        <select onChange={(e)=>{setState((prev) => ({...prev, isActive: e.target.value}))}}>
          <option>Please Select</option>
          <option value="False">False</option>
          <option value="True">True</option>
        </select>

      <br/>
      <button onClick={(e) => {confirmation(e)}}>Confirm</button>
      <button>Back</button>
      </form>
      {confirmed? "Changes Made!":""}
    </>
  )
}
