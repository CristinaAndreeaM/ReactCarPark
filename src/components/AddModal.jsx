import { useState, useEffect } from "react"
import "./Modal.css"
import CarItem from "./CarItem";
import Content from "./Content";


const AddModal = () => {

    const [newCar, setNewCar] = useState({});
    const [isCarSaved, setIsCarSaved] = useState(false);
    const [carList, setCarList] = useState([]);


    useEffect(() => {
      const storedCarData = localStorage.getItem("carData");
      if (storedCarData) {
        const parsedCarData = JSON.parse(storedCarData);
        setNewCar(parsedCarData);
        setIsCarSaved(true);
      }
    }, []);

    const handleSave = () => {
      localStorage.setItem("carData", JSON.stringify(newCar));
      setIsCarSaved(true);
    };
    
    function handleChange(e){
        setNewCar({...newCar, [e.target.name]: e.target.value})
    }

    
    return (
        <div>
            <h1>Add new car</h1>
            <p>VIN</p><input onChange={handleChange} name="vin"/>
            <p>Manufacturer</p><input onChange={handleChange} name="manufacturer"/>
            <p>Model</p><input onChange={handleChange} name="model"/>
            <p>Year</p><input onChange={handleChange} name="constuctionYear"/>
            <p>Mileage</p><input onChange={handleChange} name="mileage"/>
            <p>Engine Size</p><input onChange={handleChange} name="engineSize"/>
            <p>Power</p><input onChange={handleChange} name="power"/>
            <p>Gearbox</p><input onChange={handleChange} name="gearbox"/>
            <p>Fuel Type</p><input onChange={handleChange} name="fuelType"/>
            <p>Price</p><input onChange={handleChange} name="price"/>
            <p>Description</p><input onChange={handleChange} name="description"/>
            <p>Equipment</p><input onChange={handleChange} name="equipment"/>
            <button className="save-button" onClick={handleSave}>Save</button>
            {isCarSaved && (
        <div>
          <h2>Saved Car</h2>
          <CarItem car={newCar} />
        </div>
      )}

      <h2>Car List</h2>
    
      {carList.map((car, index) => (
        <CarItem key={index} car={car} />
      ))}



        </div>
    )
}

export default AddModal