/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "./Content.css"
import CarItem from "./CarItem"
import getCarList from "./data/getCarList"
import { useMainStore } from "../App"

const Content = () => {

    const carList = useMainStore(state => state.carList)
    const loading = useMainStore(state => state.carListLoading)
    const error = useMainStore(state => state.carListError)
    //const {carList, loading, error} = useCarList()
    const [sortedCarList, setSortedCarList] = useState([])
    const [filteredCarList, setFilteredCarList]= useState([])


    useEffect(() => {
        getCarList();
      }, []);

    useEffect(() => {
      if(carList){
        setSortedCarList(carList);
        setFilteredCarList(carList);
        
      }
    }, [carList])

    const dropdownItems = [
        {id: 1, text: "Constuction Year ASC", code: "ASC"},
        {id: 2, text: "Constuction Year DESC", code: "DESC"}
    ]

    
    const modelItems = [
        {id: 1, text: "BMW", code: "bmw"},
        {id: 2, text: "Ford", code: "ford"}
    ]

    function sort(a, b, direction){
        switch (direction) {
            case "ASC":
                return parseInt(a.constuctionYear) - parseInt(b.constuctionYear)
            case "DESC":
                return parseInt(b.constuctionYear) - parseInt(a.constuctionYear)
            default:
                break;
        }
    }




      

    function handleYearSort(item){
        const temp = carList.sort((a,b) => sort(a,b, item.code))
        setSortedCarList([...temp])
        
    }


    function handleModelSort(item)
    {
        const tempModel = carList.sortModel((a,b) => sortModel(a,b, item.code))
        setFilteredCarList([...tempModel]);
    }


    if(loading){
        return <div>Loading</div>
    }

    if(error || !carList){
        return <div>Error</div>
    }

    return (
        <div className="contentWrapper">
            <div className="content">
                <div className="filters">
                    Filters
                   
                    <Dropdown items={dropdownItems} onItemSelect={handleYearSort}/>
                    {/* <Dropdown items={modelItems} onItemSelect={handleModelSort}/> */}
                </div>
                <div>
                    <div className="carList">
                        {sortedCarList?.map((car) => {
                            return <CarItem key={car.vin} car={car}/>
                        })}
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


const Dropdown = ({items, onItemSelect}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)
    

    function handleItemSelect(item) {
        onItemSelect?.(item)
        setSelectedItem(item)
        setIsOpen(prev => !prev)
    }

    return <div className="dropdown">
        <div onClick={() => setIsOpen(prev => !prev)}>
            {
            selectedItem ?
            <button>{selectedItem.text}</button> :
            <button>Sort</button>
            }
        </div>
        
        { isOpen && <div className="dropdown_menu">
            {items.map((item) => {
                return <li key={item.id}>
                    <button onClick={() => handleItemSelect(item)}>{item.text}</button>
                </li>
            })}
        </div>}
    </div>
}


export default Content