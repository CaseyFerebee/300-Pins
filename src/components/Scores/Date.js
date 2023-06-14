import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const DateSubmit = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(startDate);
    };

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                />
                <button className="btn btn-primary" type="submit">
                    Show Date
                </button>
            </div>
        </form>
    );
};
