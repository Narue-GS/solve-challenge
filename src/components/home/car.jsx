import "../../styles/home/car.css"
import {useState} from "react";
import InputMask from 'react-input-mask';
import Product from "./product.jsx"

const Car = ({calc}) => {
	const [productList, setProductList] = useState([{name:"test", price: 999.99}])
	const [newProduct, setNewProduct] = useState({name:"", price:""})
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
				<div>
					{ productList.map((product) => {
						return <Product data={product}/>
					})}
				</div>
				<div id="product-register-menu">
          <button onClick={() => console.log(calc(productList))}>Concluir</button>
 	      </div>
			</div>
		</section>
	)
}

export default Car;
