import { useEffect, useState } from "react"
import { getAllHouses } from "../dataManager/HouseManager"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';


export const Houses = ({ down, setGameObj, selectedHouse, setSelectedHouse, name }) => {

    const [houses, setHouses] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleClick = (house) => {
        setSelectedHouse(house)
        setGameObj((state) => {
            return { ...state, houseId: house.id }
        })
    }

    useEffect(() => {
        getAllHouses().then((response) => {
            setHouses(response);
        });
    }, []);

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={down}  >
                <DropdownToggle caret={true}>{selectedHouse ? selectedHouse.name : "House"}</DropdownToggle>
                <DropdownMenu   >
                    {houses.map((house) => <DropdownItem  key={house.id} onClick={() => handleClick(house)} >{house.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </>
    )

}

