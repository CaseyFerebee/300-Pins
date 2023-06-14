import { Input } from "reactstrap"


export const ScoresInput = () => {
    return (
        <div>
            <Input
                className="w-50"
                type="number"
                min={0}
                max={300}
                step={1}
            />
        </div>
    )
}