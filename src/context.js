import React, { Component } from 'react';
import {storeProducts, detailProduct, user_point} from "./data"

const ProductContext = React.createContext();
//Provider: Provide all the informaiton
//value: Can be string or object that can be access later

//Consumer: acess the loaded information

class ProductProvider extends Component {
	state = {
		products: [],
		detailProduct: detailProduct,
		cart: [],
		user_point: user_point,
		modalOpen: false,
		modalProduct:detailProduct
	}
	componentDidMount(){
		this.setProducts();
	}
	//we need to initialize the product as empty string first because we want to copy not reference the real data
	setProducts = () =>{
		let tempProducts = [];
		storeProducts.forEach(item =>{
			const singleItem = {...item};
			tempProducts = [...tempProducts,singleItem];

		} );
		this.setState(() => {
			return {products: tempProducts}
		})
	};

	//use the id to find the item and find will return only the element that match
	getItem = (id) =>{
		const product = this.state.products.find(item => item.id === id);
		return product
	}
	//we would change the detailProduct according to the product that we want to show the detail
	handleDetail = (id) =>{
		const product = this.getItem(id);
		console.log("the previos detail product: ", this.detailProduct)
		this.setState(() =>{
			return {detailProduct: product}
		})
	}
	//we don't want to mutate the state first, then we use index
	//we get the item change value and return in setState.
	addToCart = (id) =>{
		console.log("hello from add to cart: ", id);
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id))
		const product = tempProducts[index]
		product.inCart = true;
		product.count = 1;
		const price = product.price;
		product.total = price;

		this.setState(() =>{
			return {products: tempProducts, 
					cart: [...this.state.cart, product]}
			},() => {console.log(this.state)})
	}
	openModal = id => {
		console.log("openModal")
		const product = this.getItem(id);
		this.setState(() => {
			return {modalProduct: product, modalOpen:true}
		},() => {console.log(this.state)})
	}
	closeModal = price => {
		this.setState(() => {
			
			
			return {modalOpen: false,user_point: price }
		})
	}
	
	render() {
		return (
			<ProductContext.Provider value={{
				...this.state,
				handleDetail: this.handleDetail,
				addToCart: this.addToCart,
				openModal: this.openModal,
				closeModal: this.closeModal
			}}>
				{this.props.children}
			</ProductContext.Provider>
				
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};