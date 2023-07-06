// Dropdown.js
import { useState } from "react"

const Dropdown = ({ items, onItemSelect, title }) => {
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
                selectedItem ? (
                    <button>{selectedItem.text}</button>
                ) : (
                    <button>{title}</button>
                )
            }
        </div>
        {
            isOpen && (
                <div className="dropdown_menu">
                    {items.map((item) => {
                        return <li key={item.id}>
                            <button onClick={() => handleItemSelect(item)}>{item.text}</button>
                        </li>
                    })}
                </div>
            )
        }
    </div>
}

export default Dropdown
