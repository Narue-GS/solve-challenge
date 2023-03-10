import "../../styles/home/car.css"
import {useState} from "react";
import ProductList from "./productList.jsx"
import CheckModal from "./checkModal.jsx"

const Car = ({calc}) => {
	const [productList, setProductList] = useState([{name:"test", price: 999.99}])
	const [newProduct, setNewProduct] = useState({name:"", price:""})
	const [showModal, setShowModal] = useState(false);
	const [total, setTotal] = useState(calc(productList).totalValue)
	const [notes, setNotes] = useState(calc(productList).notes.map((note)=>{
		return note
	}))

	const intAndFloat = new RegExp("[0-9]|[.]");	
	const noRepeatedDots = new RegExp("[.]{2}")

	const hendleName = (e) => {
		setNewProduct(current => {
			return{
				...current,
				name: e.target.value
			}
		},
		)
	}

	const hendlePrice = (e) => {
		const newPrice = e.target.value
		const letter = newPrice.split("").splice(-1)

		if(intAndFloat.test(letter) || newPrice === ""){
			let count = 0
			newPrice.split("").map((i) => i == "."? count++ : count = count)
			if (!noRepeatedDots.test(newPrice) && count<2) setNewProduct(current => {
      	return{
        	...current,
        	price: newPrice
      	}   
    	},)	
		}
	}

	const addProduct = () => {
		let checkedProduct = {name: newProduct.name,price: parseFloat(newProduct.price).toFixed(2)}
		if(checkedProduct.name === "" || checkedProduct.value === ""){
			alert("por favor, preencha todos os campos")
		} else {
				if(productList.length < 10){
					const update = [...productList, checkedProduct]
					setProductList(update)
				} else alert("máximo de 10 produtos")
			}
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
			<div id="product-register-content">
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
					<button onClick={addProduct}>Adicionar</button>
				</div>
				<ProductList products={productList} />
				<div id="product-register-menu">
          <button onClick={updateModal}>Concluir</button>
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
