import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';

export default class Main extends Component {
    constructor(){
        super();
        this.state={
            products:[],
            currentProduct:null
        }
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }
    componentDidMount(){
        fetch('/api/products').then(response=>{
            return response.json();
        }).
        then(products=>{
            this.setState({products});
        });
    }
    renderProducts(){
        return this.state.products.map(product=>{
            return(
                <li onClick={()=>this.handleClick(product)} key={product.id}>
                {product.title} - {product.description}
                </li>
            );
        })
    }
    handleClick(product){
        this.setState({currentProduct:product});
    }
    handleAddProduct(product){
        product.price=Number(product.price);
        fetch('api/products/',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(product)
        }).
        then(response=>{return response.json();
        })
        .then( data => {
             this.setState((prevState)=> ({
                 products: prevState.products.concat(data),
                 currentProduct : data
             }))
         })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">Our products</div>
                            <div className="panel-body">
                              <ul className="col-md-6">
                                  {this.renderProducts()}
                              </ul>
                              <div className="col-md-6">
                              <Product product={this.state.currentProduct} />
                              <AddProduct onAdd={this.handleAddProduct} />
                              </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
