import "../../styles/home/car.css"
import {v4 as uuidv4} from 'uuid';
import {useState} from "react";
import ProductList from "./productList.jsx"
import CheckModal from "./checkModal.jsx"

const Car = ({calc}) => {
	const [productList, setProductList] = useState([])
	const [newProduct, setNewProduct] = useState({id: uuidv4(), name:"", price:""})
	const [showModal, setShowModal] = useState(false);
	const [total, setTotal] = useState(calc(productList).totalValue)
	let notes = calc(productList).notes.map((note)=>{
		return note
	})

	const intAndFloat = new RegExp("[0-9]|[.]");	
	const noRepeatedDots = new RegExp("[.]{2}")

	const hendleName = (e) => {
		setNewProduct(current => {
			return{
				...current,
				name: e.target.value
			}
		},)
	}

	const hendlePrice = (e) => {
		const newPrice = e.target.value
		const letter = newPrice.split("").splice(-1)

		if(intAndFloat.test(letter) || newPrice === ""){
			let count = 0
			newPrice.split("").map((i) => i === "."? count++ : null)
			if (!noRepeatedDots.test(newPrice) && count<2) setNewProduct(current => {
      	return{
        	...current,
        	price: newPrice
      	}   
    	},)	
		}
	}

	const addProduct = () => {
		let checkedProduct = {id:newProduct.id, name: newProduct.name,price: parseFloat(newProduct.price).toFixed(2)}
		if(checkedProduct.name === "" || checkedProduct.price === "NaN"){
			alert("por favor, preencha todos os campos")
		} else {
				if(productList.length < 10){
					const update = [...productList, checkedProduct]
					setProductList(update)
				} else alert("máximo de 10 produtos")
			}
		setNewProduct(current => {
			return{
				...current,
				id: uuidv4()
			}
		},)
	}

	const removeProduct = (product) => {
		let update = productList.map((i) => {return i})
		update.splice(update.indexOf(product), 1)
		setProductList(update)
	}

	const cleanList = () => {
		setProductList([])
	}

	const updateModal = () => {
		if(showModal){
			setShowModal(false)
		}
		else {
			setTotal(calc(productList).totalValue)
			setShowModal(true)
		}
	}
	
	return(
		<section className="container">
			<div id="car-content">
				<h1>Seu carrinho</h1>
				<span>Adicione um novo produto!(max.10)</span>
				<hr/>
				<div id="product-register">
					<input placeholder="Nome" onChange={hendleName} type="text"/>
					<input
						placeholder="Preço"
						value={newProduct.price}
						onChange={hendlePrice} 
						type="text"
					/>
					<button onClick={addProduct} className="form-button" id="add-product">Adicionar</button>
				</div>
				<ProductList products={productList} remove={removeProduct} mode={"edit"}/>
				<div id="product-register-menu">
          <button onClick={updateModal} className="form-button">Concluir</button>
 	      </div>
			</div>
			{showModal?
				<CheckModal total={total} clean={cleanList} close={updateModal} products={productList} notes={notes}/>
				: <></>
			}
		</section>
	)
}

export default Car;
