import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const DateSubmit = ({setGameObj, setStartDate, startDate , selectedDate, }) => {
    const handleChange = (date) => {
        setStartDate(date);
    };
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        setGameObj((state) => {
            return { ...state, date: selectedDate}
        });
    
    };

    useEffect(() => {
        setGameObj((state) => {
            return { ...state, date: selectedDate }
        });
    }, [startDate, setGameObj, ]);

    return (
        <form onSubmit={onFormSubmit} >
            <div className="form-group">
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                />
            
            </div>
        </form>
    );
};
