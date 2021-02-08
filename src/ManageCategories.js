import React, { useState } from 'react';
import axios from 'axios';
import EditCategory from './EditCategory'

export default function ManageCategories(props) {

  const { categories } =  props;
  const [state, setState] = useState({
    editCategory: {},
  })


 const editCategory = (id) => {
   categories.map(cat => {
    if (cat.id === id) {
      console.log(cat);
      setState((prev) => ({
        ...prev,
        editCategory: cat,
      }))
    }
   })
 }

 const deleteProduct = (id) => {
  axios
    .delete(`http://localhost:61989/api/category/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
}

  const displayData = () => {
  return categories.map(cat => {
    return (
    <>
    <tr>
      <td className="table-data">
      {cat.name}
      </td>
      <td className="table-data">
      {cat.description}
      </td>
      <td className="table-data">
      {cat.is_active ? 'Available': 'Back-Ordered'}
      </td>
      <button onClick={() => {editCategory(cat.id)}}>Edit</button>
      <button onClick={() => {deleteProduct(cat.id)}}>Delete</button>
    </tr>
    </>
    )
  })
  }

  if (Object.keys(state.editCategory).length > 0) {
    return(
      <>
        <EditCategory
        category={state.editCategory}
        />
      </>
    )
  }

  return(
    <>
    <div className="button-div">
    <form>
    <button>All Products</button>
    </form>
    </div>
    <table className="blueTable">
      <th className="table-header">Name</th>
      <th className="table-header">Description</th>
      <th className="table-header">Availability</th>
      {displayData()}
    </table>
  </>
  )
}
