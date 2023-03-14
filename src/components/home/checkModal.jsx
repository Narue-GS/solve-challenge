import "../../styles/home/checkModal.css"
import ProductList from "./productList.jsx"

const CheckModal = ({total, close, products, notes, clean}) => {
	const typeOfNotes = [100, 50, 20, 10, 5, 2, 1]
	return(
		<div className="container modal-container">
			<div className="box-shadow" onClick={close}></div>
			<div id="car-modal">
				<h1>Total</h1>
				<div>
					<span>total: R${total}</span>
					<ProductList products={products} />
					<div id="notes-box">
						<p>Serão necessárias(no mínimo):</p>
						{notes.map((i, next) => {
							if(i>0) return <p id="note" key={next}>{i} notas de {typeOfNotes[next]}</p>
							else return <></>
						})}
					</div>
				</div>
				<div id="car-modal-menu">
					<button onClick={() => {
						alert("compra registrada com sucesso")
						close()
						clean()
					}} className="form-button"
					>confirmar</button>
					<button onClick={() => {
            close()
					}} className="form-button">cancelar</button>
				</div>
			</div>
		</div>
	)
}

export default CheckModal
