import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
    const [bowler, setBowler] = useState({
        email: "",
        name: ""
    });
    let navigate = useNavigate();

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bowler),
        })
            .then((res) => res.json())
            .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem(
                        "bowler_user",
                        JSON.stringify({
                            id: createdUser.id,
                        
                        })
                    );

                    navigate("/");
                }
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        return fetch(`http://localhost:8088/users?email=${bowler.email}`)
            .then((res) => res.json())
            .then((response) => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists");
                } else {
                    // Good email, create user.
                    registerNewUser();
                }
            });
    };

    const updateBowler = (evt) => {
        const copy = { ...bowler };
        copy[evt.target.id] = evt.target.value;
        setBowler(copy);
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please Register for 300-Pins
                </h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input
                        onChange={updateBowler}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input
                        onChange={updateBowler}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                {/* <fieldset>
                    <input
                        onChange={(evt) => {
                            const copy = { ...bowler };
                            copy.isStaff = evt.target.checked;
                            setCustomer(copy);
                        }}
                        type="checkbox"
                        id="isStaff"
                    />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset> */}
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
};
