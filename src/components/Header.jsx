import "./Header.css"
import { useMainStore } from "../App"
import AddModal from "./AddModal"

const Header = () => {

    //const {toggleShowModal} = useMainContext()
    const toggleShowModal = useMainStore(state => state.toggleShowModal)


    function handleAddListing(){
        console.log("Triggered modal toggle")
        toggleShowModal(<AddModal/>)
    }


    return (
        <div className= "header">
            <div className = "headerContent">
                <h1>CarPark</h1>
                <button onClick={handleAddListing}>Add listing</button>
            </div>

        </div>
    )
}

export default Header