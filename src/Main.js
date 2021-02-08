import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import CreateCategory from './CreateCategory';
import ManageCategories from './ManageCategories';
import { useHistory } from 'react-router-dom';

export default function Main() {

  const [state, setState] = useState({
    products: [],
    categories: [],
    editProduct: [],
    editCategory: '',
    create: '',
    productSearchInput: '',
    showProduct: {},
    catSearchInput: '',
    showCategories: [],
    deleted: false,
  })

useEffect(() => {
  console.log("REFRESH");
  Promise.all([
    axios.get('http://localhost:61989/api/product'),
    axios.get('http://localhost:61989/api/category')
  ])
    .then(res => {
      setState((prev) => ({
        ...prev,
        products: res[0].data,
        categories: res[1].data
      }))
      
    })
    .catch(err => {
      console.log(err);
    })

}, [])
  const setSelectedId = (id) => {

    state.products.map(product => {
      if (product.id === id) {
        state.categories.map(cat => {
          if (product.categoryId === cat.id){
            setState((prev) => ({
              ...prev,
              editProduct: product,
              editCategory: [cat.id,cat.name]
            }))
          }
        })
      }
    })
  }
  const createCategory = (created) => {
    setState((prev) => ({
      ...prev,
      create: created,
    }))
  }

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:61989/api/product/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const searchProduct = (e) => {
    e.preventDefault()
    state.products.map(product => {
      if (product.name.toLowerCase() === state.productSearchInput.toLowerCase()){
          setState((prev) => ({
            ...prev,
            showProduct: [product]
          }))
          console.log(state.showProduct);
      }
    })
  }
  const searchCategory = (e) => {
    e.preventDefault()
    const catSearch = []
    state.categories.map(cat => {
      if(cat.name.toLowerCase() === state.catSearchInput.toLowerCase()){
        state.products.map(product => {
          if (product.categoryId === cat.id){
            catSearch.push(product)
          }
        })
      }
      setState((prev) => ({
        ...prev,
        showCategories: catSearch
      }))
    })
  }
  const displayData = () => {
    const products = Object.keys(state.showProduct).length > 0 ? state.showProduct : state.products
    const shown = state.showCategories.length > 0 ?  state.showCategories : products

  // Just simply mapping through shown.. 
  // Its either ALL products or what we search for specifically
  return shown.map(product => {
    return (
      <>
    <tr>
      <td className="table-data">
      {product.name}
      </td>
      <td className="table-data">
      {state.categories.map(cat => {
        if(cat.id === product.categoryId){
          return cat.name
        }
      })}
      </td>
      <td className="table-data">
      ${product.cost}
      </td>
      <td className="table-data">
      {product.description}
      </td>
      <td className="table-data">

      {product.is_active ? 'In Stock': 'Out Of Stock'}
      </td>
      <button onClick={() => {setSelectedId(product.id)}}>Edit</button>
      <button onClick={() => {deleteProduct(product.id)}}>Delete</button>
    </tr>
    
    </>
    )
  })
  }
  
  if (state.editProduct.length !== 0) {
    return (
      <div>
        <EditProduct
        item={state.editProduct}
        category={state.editCategory}
        categories={state.categories}
        />
      </div>
    )
  }

  if (state.create === 'product') {
    return (
      <div>
        <CreateProduct
        />
      </div>
    )
  } else if(state.create === 'category') {
    return (
      <div>
        <CreateCategory
        />
      </div>
    )
  } else if(state.create === 'manageCategories') {
    return (
      <div>
        <ManageCategories
        categories={state.categories}
        />
      </div>
    )
  }

    return(
      <div>
      <div className="button-div">
      <button onClick={() => {createCategory('product')}}>Create New Product</button>
      <div>
      <button onClick={() => {createCategory('category')}}>Create New Category</button>
      <button onClick={() => {createCategory('manageCategories')}}>Manage Categories</button>
      </div>
      </div>
      <div className="button-div">
      <form>
      <input onChange={(e)=>{setState((prev) => ({...prev, productSearchInput: e.target.value}))}}/>
      <button onClick={e => {searchProduct(e)}}>Search Product</button>
      </form>
      <form>
      <button>Show All Products</button>
      </form>
      <form>
      <button onClick={e => {searchCategory(e)}}>Search Category</button>
      <input onChange={(e)=>{setState((prev) => ({...prev, catSearchInput: e.target.value}))}}/>
      </form>
      </div>
      <table className="blueTable">
        <th className="table-header">Product</th>
        <th className="table-header">Category</th>
        <th className="table-header">Cost</th>
        <th className="table-header">Description</th>
        <th className="table-header">Availability</th>
        {displayData()}
      </table>
    </div>
    )
}
