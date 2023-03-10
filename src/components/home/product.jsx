import "../../styles/home/product.css"

const Product = ({data}) => {
	return(
		<div id="car-product">
			<span>{data.name}</span>
			<span>R${data.price}</span>
		</div>
	)
}

export default Product
