
import { useEffect, useState } from "react"
import "./Content.css"
import getCarList from "./data/getCarList"


const CarItem = ({car})=>{
    const {image, manufacturer, model, vin, constructionYear, price} = car
    const [savedCar, setSavedCar] = useState(null);


    const handleCarClick = () => {
        setSelectedCar(car);
      };
      

    return  <div className="carItem">
        <div className="imageContainer">
            <img src={image}/>
        </div>
        <div className = "carItemcontent">
            <h2>{car.manufacturer} {model}</h2>
            <p>{vin}</p>
            <p>{constructionYear}</p>
        </div>

        <div className = "carItemRightSide">
            <h2>{price}</h2>
        </div>
    </div>
}

export default CarItem
