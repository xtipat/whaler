import React, { Component } from 'react';
import {storeProducts, detailProduct, user_point} from "./data"
import {firebase,db,auth } from './firebase/firebase';
import AuthUserContext from './session/authUserContext';

const ProductContext = React.createContext();
//Provider: Provide all the informaiton
//value: Can be string or object that can be access later

//Consumer: acess the loaded information

class ProductProvider extends Component {
	state = {
		products: [],
		detailProduct: detailProduct,
		cart: [],
		user_point: 10000,
		modalOpen: false,
		modalOpenCongrat: false,
		modalProduct:detailProduct,

		user_id: ""
	}
	componentDidMount(){
		this.setProducts();
		//we need to change this value base on the use id
			
		firebase.auth().onAuthStateChanged(user => {
  		if (user) {
    		// User is signed in.
    		 this.setState(() => {
    			
    			return {user_id: firebase.auth().currentUser.uid}
    		})
    		this.getUserPoint(firebase.auth().currentUser.uid);


  		} else {
    		// No user is signed in.
  		}
		});

		
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
		//console.log("hello from add to cart: ", id);
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
		const product = this.getItem(id);
		this.setState(() => {
			return {modalProduct: product, modalOpen:true}
		},() => {console.log(this.state)})
	}
	openModalCongrat = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return {modalProduct: product, modalOpenCongrat:true}
		},() => {console.log(this.state)})
	}
	closeModal = (remainPoints,price, title) => {
		db.ref("/users/"+this.state.user_id).update({ point: remainPoints });
		var newKey = firebase.database().ref('/redeem_hist/').push()
		newKey.set({
			point_used: price,
		    rewardName: title,
		    uid: this.state.user_id
		  });
		this.setState(() => {
			
			return {modalOpen: false,user_point: remainPoints }
		})
	}
	closeModalCongrat = (remainPoints,price, title) => {
		console.log("Modal Congrat close")
		console.log(price)
		console.log(title)

		this.setState(() => {
			
			return {modalOpenCongrat: false }
		})
	}
	//this for click confirm in modal: should show the congratulation modal after
	closeModal_cancel = (remainPoints) => {
			this.setState(() => {
			
			return {modalOpen: false,user_point: remainPoints }
		})
	}

	getUserPoint = id => {
		console.log(id)
		let ref = db.ref("users/"+id)
		ref.on('value', snapshot =>{
			console.log(snapshot.val().point)
			const cur_point = snapshot.val().point
			this.setState(() =>{
				return {user_point: cur_point}
			})
		});
	}
	getUserPoint_once = id => {
		let ref = db.ref("users/"+id)
		ref.once('value', snapshot =>{
			console.log(snapshot.val().point)
			const cur_point = snapshot.val().point
			this.setState(() =>{
				return {user_point: cur_point}
			})
		});
	}

	
	render() {
		return (
			<ProductContext.Provider value={{
				...this.state,
				handleDetail: this.handleDetail,
				addToCart: this.addToCart,
				openModal: this.openModal,
				closeModal: this.closeModal,
				closeModal_cancel: this.closeModal_cancel,
				getUserPoint: this.getUserPoint,
				getUserPoint_once: this.getUserPoint_once,

				openModalCongrat: this.openModalCongrat,
				closeModalCongrat: this.closeModalCongrat
			}}>
				{this.props.children}
			</ProductContext.Provider>
				
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
