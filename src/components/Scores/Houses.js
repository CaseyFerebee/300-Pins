import { useEffect, useState } from "react"
import { getAllHouses } from "../dataManager/HouseManager"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

export const Houses = ({ down, ...args }) => {
    const [houses, setHouses] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedHouse,setSelectedHouse]= useState();

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleClick=(e)=>{
        console.log(e);
        setSelectedHouse(e.target.innerText)
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
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={down} onClick={handleClick}>
                <DropdownToggle caret>{selectedHouse ? selectedHouse : <>House</>}</DropdownToggle>
                <DropdownMenu {...args}  >
                {houses.map((house) =>  <DropdownItem  key={house.id}>{house.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </>
    )

}

Houses.propTypes = {
    direction: PropTypes.string,
};
