const Product = ({data}) => {
	return(
		<div>
			<span>{data.name}</span>
			<span>R${data.price}</span>
		</div>
	)
}

export default Product
