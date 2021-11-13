import React from 'react'
import { useState } from 'react'
import { Form } from "react-bootstrap";

function InitialSetup(props) {
    const [location, setLocation] = useState('')
    const [hiking, setHiking] = useState(false)
    const [offroading, setOffroading] = useState(false)
    const [fishing, setFishing] = useState(false)
    const [bouldering, setBouldering] = useState(false)
    const [camping, setCamping] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {

        let accountAttributes = {
            'user_state': location,
            'username': localStorage.getItem('email'),
            'hiking': hiking,
            'fishing': fishing,
            'offroad': offroading,
            'camping': camping,
            'bouldering': bouldering
        }

        fetch('/setAttributes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountAttributes)
        }).then(response => response.json())
            .then((data) => {
                // Based on response, checks to see whether the user provided valid user id or not
                console.log(data)
                if (data.login === "valid") {
                    props.setHasData(sessionStorage.getItem('hasData'), true)
                } else {
                    setError(true)
                }
            })
        e.preventDefault()
    }

    return (
        <div >
            <h1> Account Creation </h1>
            <h2> Where are you from? </h2>

            <Form.Group class="form-select" aria-label="Default select example">
                <Form.Control
                    as="select"
                    value={location}
                    onChange={e => {
                        setLocation(e.target.value);
                    }}
                >
                    <option selected>Choose your State (Abbreviated)</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticuit</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washigton</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconinsin</option>
                    <option value="WY">Wyoming</option>
                </Form.Control>
            </Form.Group>

            <h2> What are your favorite activities? </h2>
            <form onSubmit={handleSubmit}>
                <Form.Group class="form-check">
                    <input class="form-check-input" type="checkbox" value={hiking} id="checkHiking" onChange={(e) => {
                        setHiking(true);
                        // console.log("hiking = " + hiking)
                    }}></input>
                    <label class="form-check-label" for="checkHiking">
                        Hiking
                    </label>
                </Form.Group>
                <Form.Group class="form-check">
                    <input class="form-check-input" type="checkbox" value={offroading} id="checkOffroading" onChange={(e) => {
                        setOffroading(true);
                        // console.log("offroading = " + offroading)
                    }}></input>
                    <label class="form-check-label" for="checkOffroading">
                        Offroading
                    </label>
                </Form.Group>
                <Form.Group class="form-check">
                    <input class="form-check-input" type="checkbox" value={fishing} id="checkFishing" onChange={(e) => {
                        setFishing(true);
                        // console.log("fishing = " + fishing)
                    }}></input>
                    <label class="form-check-label" for="checkFishing">
                        Fishing
                    </label>
                </Form.Group>
                <Form.Group class="form-check">
                    <input class="form-check-input" type="checkbox" value={bouldering} id="checkBouldering" onChange={(e) => {
                        setBouldering(true);
                        // console.log("bouldering = " + bouldering)
                    }}></input>
                    <label class="form-check-label" for="checkBouldering">
                        Bouldering
                    </label>
                </Form.Group>
                <Form.Group class="form-check">
                    <input class="form-check-input" type="checkbox" value={camping} id="checkCamping" onChange={(e) => {
                        setCamping(true);
                    }}></input>
                    <label class="form-check-label" for="checkCamping">
                        Camping
                    </label>
                </Form.Group>

                <input class="btn btn-primary" type="submit" value="Submit"></input>
            </form>

            <div className="suggest">
                {error === true ?
                    <p style={{ color: "red" }}>Something went wrong... really really wrong...</p>
                    :
                    <p></p>
                }
            </div>

        </div >
    )
}

export default InitialSetup