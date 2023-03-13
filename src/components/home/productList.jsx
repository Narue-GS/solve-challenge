import "../../styles/home/productList.css"

const ProductList = ({products, remove, mode}) => {
	return(
		<div id="car-product-list">
      { products.map((product) => {  
        return(
					<div id="car-product" key={product.id}>
						{mode==="edit"?
						<div id="edit-product" onClick={() => remove(product)}>
							<strong>X</strong>
						</div> 
						: <></>
						}
						<div id="product-detail">
							<span>{product.name}</span>
							<span>R${product.price}</span>
						</div>
    			</div>
				)
      })} 
    </div>
	)
} 

export default ProductList;
