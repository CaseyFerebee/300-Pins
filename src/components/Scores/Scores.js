import { Input } from "reactstrap"


export const ScoresInput = ({setGameObj}) => {

    const handleInputChange = (event) => {
        const newScore = parseInt(event.target.value)
//setUserScore(newScore);
        setGameObj(state => {
            return { ...state, score: newScore}
        })

    };

    return (
        <div>
            <Input
                className="w-50"
                type="number"
                min={0}
                max={300}
                step={1}
                onChange={handleInputChange}
            />
        </div>
    )
}