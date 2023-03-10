import "../styles/home/home.css"
import Header from "../components/home/header.jsx"
import Car from "../components/home/car.jsx"


const Home = () => {
	const calcNotes = (value, notes) => {
  	let notesCount = []
  	notes.map((note, i) => {
			note = parseInt(value/notes[i])
      value = value%notes[i]
    	notesCount.push(note)
		})

  	return notesCount
	}
	const calc = (products) =>{
		let total = 0
		products.map((product) => total += parseFloat(product.price))
		const notesCount = calcNotes(total, [100, 50, 20, 10, 5, 2, 1])
		return {totalValue: total, notes: notesCount}
	}
    return(
        <div id="home">
            <Header />
						<Car calc={calc}/>
        </div>
    )
}
export default Home
