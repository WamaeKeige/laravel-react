import React, {Component} from 'react';

const Product = ({product})=>{
    if(!product){
        return(<div> No product clicked or doesnot exist </div>);
    }
    return(
<div>
<h2> {product.title} </h2>
     <p> {product.description} </p>
     <h3> Status:{ product.availability?"Available":"Out od stock"} </h3>
     <h3> Price:  { product.price} </h3>
       </div>
    );
}

export default Product;
