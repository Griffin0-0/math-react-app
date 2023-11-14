import '../css/basic.css';
import '../css/calculate.css';

import Graphic from '../Components/Graphic.jsx';
import InputField from '../Components/InputField.jsx';
import Config from '../Components/Config.jsx';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

// Pythagorean side length calculator
// Solve the triangle


function Calculate() {
    const navigate = useNavigate();


    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputHypotenuse, setInputHypotenuse] = useState('');
    const [inputAngle1, setInputAngle1] = useState('');
    const [inputAngle2, setInputAngle2] = useState('');

    const handleInputChange = (inputId, event) => {
        const inputValue = event.target.value;


        switch (inputId) {
            case "value1":
                setInputValue1(inputValue);
                break;
            case "value2":
                setInputValue2(inputValue);
                break;
            case "hypotenuse":
                setInputHypotenuse(inputValue);
                break;
            case "angle1":
                setInputAngle1(inputValue);
                break;
            case "angle2":
                setInputAngle2(inputValue);
                break;
        }
    };



    return (
        <div className="Calculate">

            <button 
                className="backButton"
                onClick={() => 
                    navigate("/")
            }>
            <svg className="backArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            Back
            </button>



            <div className="content-container">
                <section className="content">

                    <div className="main-panel">
                        <div className="graphic-container component">
                            <Graphic 
                                width='400'
                                height='400'

                                side1={inputValue1}
                                side2={inputValue2}
                                hypotenuse={inputHypotenuse}

                                angle1={inputAngle1}
                                angle2={inputAngle2}
                            />
                        </div>
                    

                        <div className="input-container component">
                            <InputField 
                                valueType="value1"
                                handleInputChange={handleInputChange}
                                placeholderText="Side 1"
                            />
                            <InputField 
                                valueType="value2"
                                handleInputChange={handleInputChange}
                                placeholderText="Side 2"
                            />
                            <InputField 
                                valueType="hypotenuse"
                                handleInputChange={handleInputChange}
                                placeholderText="Hypotenuse"
                            />
                            <InputField 
                                valueType="angle1"
                                handleInputChange={handleInputChange}
                                placeholderText="Angle 1"
                            />
                            <InputField 
                                valueType="angle2"
                                handleInputChange={handleInputChange}
                                placeholderText="Angle 2"
                            />
                        </div>
                    </div>

                    <Config />

                </section>
            </div>



        </div>
    );
}

export default Calculate;
