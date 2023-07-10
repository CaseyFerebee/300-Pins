import { Input } from "reactstrap";

export const ScoresInput = ({ score, setScore }) => {
    const handleInputChange = (event) => {
        const newScore = parseInt(event.target.value, 10);
        if (!isNaN(newScore) && newScore >= 0 && newScore <= 300) {
            setScore(newScore);
        }
    };

    return (
        <div>
            <Input
                required
                className="w-25"
                type="number"
                min={0}
                max={300}
                step={1}
                value={score || ""}
                onChange={handleInputChange}
            />
        </div>
    );
};