import { useState } from "react"
import { DateSubmit } from "./Date"
import { Houses } from "./Houses"
import { ScoresInput } from "./Scores"

export const SubmitForm = () => {

const [gameObj,setGameObj] = useState({
    id: null,
    userId: null,
    houseId: null,
    score: null,
    date: null
})

console.log(gameObj)

    return (

        < >
        
            <ScoresInput setGameObj={setGameObj}/>
            
            <Houses setGameObj={setGameObj}/>
            
            <DateSubmit setGameObj={setGameObj}/>

        
        </ >

    )

}




