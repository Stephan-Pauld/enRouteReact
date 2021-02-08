import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function EditCategory(props) {
  const { category } = props;
  console.log(category);
  const [error, setError] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const [state, setState] = useState({
    id: 0,
    name: '',
    description: '',
    isActive: false,
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      name: category.name,
      id: category.id,
      description: category.description,
      isActive: category.is_active,
    }))
  }, [])


  const confirmation = (e) => {
    e.preventDefault()
    console.log(state);
    for(const check in state){
      if(!state[check] && check !== 'isActive'){
        setError(true)
        setConfirmed(false)
        return;
      }
    }
    const bodyChange = [{"op":"replace","path":"name","value":state.name},
                        {"op":"replace","path":"description","value":state.description},
                        {"op":"replace","path":"is_active","value":state.isActive}]

    axios
      .patch(`http://localhost:61989/api/category/${state.id}`, bodyChange)
      .then(res => {
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
      <input onChange={(e)=>{setState((prev) => ({...prev, name: e.target.value}))}} value={state.name} />
      <br/>
      <h4>Description</h4>
      <textarea onChange={(e)=>{setState((prev) => ({...prev, description: e.target.value}))}} value={state.description}></textarea>
      <br/>
      <h4>Is Active?</h4>
        <select onChange={(e)=>{setState((prev) => ({...prev, isActive: e.target.value}))}} >
          <option>Please Select</option>
          <option value="False">False</option>
          <option value="True">True</option>
        </select>
      <br/>
      <button onClick={(e) => {confirmation(e)}} >Confirm</button>
      <button>Back</button>
      </form>
      {confirmed? "Category Created":""}
    </>
  )
}
