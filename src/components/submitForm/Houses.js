import { useEffect, useState } from "react"
import { getAllHouses } from "../dataManager/HouseManager"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';


export const Houses = ({down, setGameObj, selectedHouse, setSelectedHouse}) => {
    const [houses, setHouses] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleClick=(e)=>{
        setSelectedHouse(e.target.innerText)
        setGameObj((state) => {
            return { ...state, houseId: parseInt(e.target.id)}
        })
    }
    const getAllTheHouses = () => {

        getAllHouses()
            .then(response => {
                return setHouses(response)
            })
    }
    useEffect(() => {
        getAllTheHouses()
    },
        []
    )

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={down} onChange={handleClick}>
                <DropdownToggle caret={true}>{selectedHouse ? selectedHouse : <>House</>}</DropdownToggle>
                <DropdownMenu>
                {houses.map((house) =>  <DropdownItem  key={house.id} id={house.id}>{house.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </>
    )

}

