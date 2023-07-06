import { useEffect, useState } from "react"
import "./Content.css"
import CarItem from "./CarItem"
import getCarList from "./data/getCarList"
import { useMainStore } from "../App"
import Dropdown from "./DropDown"

const Content = () => {
    const carList = useMainStore(state => state.carList)
    const loading = useMainStore(state => state.carListLoading)
    const error   = useMainStore(state => state.carListError)

    const [sortedCarList, setSortedCarList] = useState([])
    const [manufacturerFilter, setManufacturerFilter] = useState(undefined);
    const [modelFilter, setModelFilter] = useState(undefined);
    const [sortBy, setSortBy] = useState(undefined);
    const [manufacturerItems, setManufacturerItems] = useState([]);
    const [modelItems, setModelItems] = useState([]);

    useEffect(() => {
        getCarList();
    }, []);

    useEffect(() => {
        if (carList && carList.length) {
            const uniqueManufacturers = [...new Set(carList.map(car => car.manufacturer))];
            const updatedManufacturerItems = uniqueManufacturers.map((manufacturer, index) => ({ id: index + 1, text: manufacturer, code: { manufacturer: manufacturer }}));
            setManufacturerItems(updatedManufacturerItems);
        }
    }, [carList]);

    useEffect(() => {
        let updatedCarList = [...carList];

        if (manufacturerFilter) {
            updatedCarList = updatedCarList.filter(car => car.manufacturer === manufacturerFilter.code.manufacturer);
            const uniqueModels = [...new Set(updatedCarList.map(car => car.model))];
            const newModelItems = uniqueModels.map((model, index) => ({ id: index + 1, text: model, code: { model: model }}));
            setModelItems(newModelItems);
        }

        if (modelFilter) {
            updatedCarList = updatedCarList.filter(car => car.model === modelFilter.code.model);
        }

        if (sortBy) {
            updatedCarList.sort((a, b) => sort(a, b, sortBy.code));
        }

        setSortedCarList(updatedCarList);
    }, [carList, manufacturerFilter, modelFilter, sortBy])

    const dropdownItems = [
        { id: 1, text: "Construction Year ASC", code: { key: 'constuctionYear', direction: "ASC" } },
        { id: 2, text: "Construction Year DESC", code: { key: 'constuctionYear', direction: "DESC" } }
    ]
    
    function sort(a, b, code) {
        const key = code.key;
        const direction = code.direction;

        switch (direction) {
            case "ASC":
                return parseInt(a[key]) - parseInt(b[key])
            case "DESC":
                return parseInt(b[key]) - parseInt(a[key])
            default:
                return 0;
        }
    }

    function handleYearSort(item) {
        setSortBy(item);
    }

    function handleManufacturerFilter(item) {
        setManufacturerFilter(item);
    }

    function handleModelFilter(item) {
        setModelFilter(item);
    }

    function clearFilters() {
        setManufacturerFilter(undefined);
        setModelFilter(undefined);
        setSortBy(undefined);
        setModelItems([]);
    }

    if (loading) {
        return <div>Loading</div>
    }

    if (error || !carList) {
        return <div>Error</div>
    }

    return (
        <div className="contentWrapper">
            <div className="content">
                <div className="filters">
                    <span>Filters</span>
                    <Dropdown items={dropdownItems} onItemSelect={handleYearSort} title="Sort by Year"/>
                    <Dropdown items={manufacturerItems} onItemSelect={handleManufacturerFilter} title="Filter by Manufacturer" />
                    <Dropdown items={modelItems} onItemSelect={handleModelFilter} title="Filter by Model"/>
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
                <div>
                    <div className="carList">
                        {
                            sortedCarList?.map((car) => {
                                return <CarItem key={car.vin} car={car} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content
