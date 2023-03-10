import "../../styles/home/productList.css"

const ProductList = ({products}) => {
	return(
		<div id="car-product-list">
      { products.map((product) => {  
        return(
					<div id="car-product">
      			<span>{product.name}</span>
      			<span>R${product.price}</span>
    			</div>
				)
      })} 
    </div>
	)
} 

export default ProductList;
