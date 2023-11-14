import '../css/basic.css';
import { useRef, useEffect } from 'react';


function normalizeLengths(side1, side2, canvas) {

    let normX = canvas / side2;
    let normY = canvas / side1;
    let ratio = Math.min(normX, normY);

    return [(ratio * side1), (ratio * side2)];
}

function convertRtd(angle) {
    return parseFloat(angle * 180 / Math.PI);
}

function convertDtr(angle) {
    return parseFloat(angle * Math.PI / 180);
}

// Calculate the missing value using pythagorean's theorem
function pythagoreanTheorem(side1, side2, hyp) {
    let newSide1 = side1;
    let newSide2 = side2;
    let newHyp = hyp;


    // Unknown Hypotenuse
    if (side1 !== 0 && side2 !== 0) {
        newHyp = Math.sqrt(side1**2 + side2**2);
    }
    // Unknown side 1
    if (side2 !== 0 && hyp !== 0) {
        newSide1 = Math.sqrt(hyp**2 - side2**2);
    }
    // Unknown side 2
    if (side1 !== 0 && hyp !== 0) {
        newSide2 = Math.sqrt(hyp**2 - side1**2);
    }

    return [newSide1, newSide2, newHyp];
}

// Handle trigonometric calculations
function trigonometry(side1, side2, hyp, angle1, angle2) {
    let values = [side1, side2, hyp, angle1, angle2];



    if (side1 === 0) {
        if (hyp !== 0 && angle1 !== 0) {
            values[0] = hyp * Math.cos(convertDtr(angle1));
        }
        if (hyp !== 0 && angle2 !== 0) {
            values[0] = hyp * Math.sin(convertDtr(angle2));
        }
        if (side2 !== 0 && angle1 !== 0) {
            values[0] = side2 / Math.tan(convertDtr(angle1));
        }
        if (side2 !== 0 && angle2 !== 0) {
            values[0] = side2 * Math.tan(convertDtr(angle2));
        }
    }

    if (side2 === 0) {
        if (hyp !== 0 && angle1 !== 0) {
            values[1] = hyp * Math.sin(convertDtr(angle1));
        }
        if (hyp !== 0 && angle2 !== 0) {
            values[1] = hyp * Math.cos(convertDtr(angle2));
        }
        if (side1 !== 0 && angle1 !== 0) {
            values[1] = side1 * Math.tan(convertDtr(angle1));
        }
        if (side1 !== 0 && angle2 !== 0) {
            values[1] = side1 / Math.tan(convertDtr(angle2));
        }
    }

    if (hyp === 0) {
        if (side1 !== 0 && angle1 !== 0) {
            values[2] = side1 / Math.cos(convertDtr(angle1));
        }
        if (side1 !== 0 && angle2 !== 0) {
            values[2] = side1 / Math.sin(convertDtr(angle2));
        }
        if (side2 !== 0 && angle1 !== 0) {
            values[2] = side2 / Math.sin(convertDtr(angle1));
        }
        if (side2 !== 0 && angle2 !== 0) {
            values[2] = side2 / Math.cos(convertDtr(angle2));
        }
    }

    if (angle1 === 0) {
        if (angle2 !== 0) {
            values[3] = 90 - angle2;
        }
        if (side1 !== 0 && side2 !== 0) {
            values[3] = convertRtd(Math.atan(side2 / side1));
        }
        if (side1 !== 0 && hyp !== 0) {
            values[3] = convertRtd(Math.acos(side1 / hyp));
        }
        if (side2 !== 0 && hyp !== 0) {
            values[3] = convertRtd(Math.asin(side2 / hyp));
        }
    }

    if (angle2 === 0) {
        if (angle1 !== 0) {
            values[4] = 90 - angle1;
        }
        if (side1 !== 0 && side2 !== 0) {
            values[4] = convertRtd(Math.atan(side1 / side2));
        }
        if (side2 !== 0 && hyp !== 0) {
            values[4] = convertRtd(Math.acos(side2 / hyp));
        }
        if (side1 !== 0 && hyp !== 0) {
            values[4] = convertRtd(Math.asin(side1 / hyp));
        }
    }

    return values;
}

// Handle triangle solving
function calcData(side1, side2, hyp, angle1, angle2) {


    let newSide1 = side1 !== '' ? parseFloat(fastRnd(side1)) : 0.0;
    let newSide2 = side2 !== '' ? parseFloat(fastRnd(side2)) : 0.0;
    let newHyp = hyp !== '' ? parseFloat(fastRnd(hyp)) : 0.0;
    let newAngle1 = angle1 !== '' ? parseFloat(fastRnd(angle1)) : 0.0;
    let newAngle2 = angle2 !== '' ? parseFloat(fastRnd(angle2)) : 0.0;


    let e = pythagoreanTheorem(newSide1, newSide2, newHyp);
    newSide1 = e[0];
    newSide2 = e[1];
    newHyp = e[2];

    let j = trigonometry(newSide1, newSide2, newHyp, newAngle1, newAngle2);
    newSide1 = j[0];
    newSide2 = j[1];
    newHyp = j[2];
    newAngle1 = j[3];
    newAngle2 = j[4];
    
    return [fastRnd(newSide1), fastRnd(newSide2), fastRnd(newHyp), fastRnd(newAngle1), fastRnd(newAngle2)]; // side1, side2, hyp, angle1, angle2
}



let graphicStatus = "absent"; // absent, error, display

function preVerification(side1, side2, hyp, angle1, angle2) {
    let validInputs = 0;
    let statusMessage = [[], [], [], [], []];

    // side1
    if (side1 !== '') {
        validInputs++

        if (!(side1 > 0)) {
            statusMessage[0].push("Side 1 must be above 0");
        }
        if (isNaN(side1)) {
            statusMessage[0].push("Side 1 must be a numerical value");
        }
    }

    // side2
    if (side2 !== '') {
        validInputs++

        if (!(side2 > 0)) {
            statusMessage[1].push("Side 2 must be above 0");
        }
        if (isNaN(side2)) {
            statusMessage[1].push("Side 2 must be a numerical value");
        }
    }

    // hypotenuse
    if (hyp !== '') {
        validInputs++

        if (!(hyp > 0)) {
            statusMessage[2].push("Hypotenuse must be above 0");
        }
        if (isNaN(hyp)) {
            statusMessage[2].push("Hypotenuse must be a numerical value");
        }
        if (side1 !== '') {
            if (!(hyp > side1)) {
                statusMessage[2].push("Hypotenuse must be larger than side 1");
            }
        }
        if (side2 !== '') {
            if (!(hyp > side2)) {
                statusMessage[2].push("Hypotenuse must be larger than side 2");
            }
        }
        if (side1 !== '' && side2 !== '') {
            if (!errorOffset(fastRnd((side1**2 + side2**2)), fastRnd(hyp**2))) {
                statusMessage[2].push("Hypotenuse must follow Pythagorean's Theorem")
            }
        }
    }

    // angle1
    if (angle1 !== '') {
        validInputs++

        if (!(angle1 > 0)) {
            statusMessage[3].push("Angle 1 must be above 0 degrees");
        }
        if (!(angle1 < 90)) {
            statusMessage[3].push("Angle 1 must be below 90 degrees");
        }
        if (isNaN(angle1)) {
            statusMessage[3].push("Angle 1 must be a numerical value");
        }
        if (angle2 !== '') {
            if (!((angle1 + angle2) === 90)) {
                statusMessage[3].push("The sum of angle 1 and angle 2 must equal 90 degrees");
            }
        }
    }

    // angle2
    if (angle2 !== '') {
        validInputs++

        if (!(angle2 > 0)) {
            statusMessage[4].push("Angle 2 must be above 0 degrees");
        }
        if (!(angle2 < 90)) {
            statusMessage[4].push("Angle 2 must be below 90 degrees");
        }
        if (isNaN(angle2)) {
            statusMessage[4].push("Angle 2 must be a numerical value");
        }
    }


    if (validInputs < 2) {

        graphicStatus = "absent";

    } else if (!statusMessage.every(e => e.length === 0)) {

        graphicStatus = "error";

    } else {

        graphicStatus = "display";

    }

    return statusMessage;
}

function postVerification(side1, side2, hyp, angle1, angle2, calcSide1, calcSide2, calcHyp, calcAngle1, calcAngle2) {

    console.log(side1, side2, hyp, angle1, angle2, calcSide1, calcSide2, calcHyp, calcAngle1, calcAngle2);

    if (side1 !== '') {
        if (side1 !== calcSide1) {
            return true;
        }
    }
    if (side2 !== '') {
        if (side2 !== calcSide2) {
            return true;
        }
    }
    if (hyp !== '') {
        if (hyp !== calcHyp) {
            return true;
        }
    }
    if (angle1 !== '') {
        if (angle1 !== calcAngle1) {
            return true;
        }
    }
    if (angle2 !== '') {
        if (angle2 !== calcAngle2) {
            return true;
        }
    }


    if (!errorOffset(fastRnd((calcSide1**2 + calcSide2**2)), fastRnd(calcHyp**2))) {
        return true;
    }
    if ((fastRnd(calcAngle1) + fastRnd(calcAngle2)) !== 90) {
        return true;
    }

    return false;
}

// Quickly round to 6 decimal places
function fastRnd(value) {
    return Math.round(value * 1000000) / 1000000;
}

function errorOffset(value, value2) {
    if ((Math.round(value * 100) / 100) === (Math.round(value2 * 100) / 100)) {
        return true;
    } else {
        return false;
    }
}


const Graphic = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);


        let statusMessage = preVerification(
            props.side1 !== '' ? parseFloat(fastRnd(props.side1)) : '',
            props.side2 !== '' ? parseFloat(fastRnd(props.side2)) : '',
            props.hypotenuse !== '' ? parseFloat(fastRnd(props.hypotenuse)) : '',
            props.angle1 !== '' ? parseFloat(fastRnd(props.angle1)) : '',
            props.angle2 !== '' ? parseFloat(fastRnd(props.angle2)) : ''
        );

        let triangle = calcData(props.side1, props.side2, props.hypotenuse, props.angle1, props.angle2);

        let postVerificationError = postVerification(
            props.side1 !== '' ? parseFloat(fastRnd(props.side1)) : '',
            props.side2 !== '' ? parseFloat(fastRnd(props.side2)) : '',
            props.hypotenuse !== '' ? parseFloat(fastRnd(props.hypotenuse)) : '',
            props.angle1 !== '' ? parseFloat(fastRnd(props.angle1)) : '',
            props.angle2 !== '' ? parseFloat(fastRnd(props.angle2)) : '',
            triangle[0],
            triangle[1],
            triangle[2],
            triangle[3],
            triangle[4]
        );

        console.log("Status: " + graphicStatus);

        if (postVerificationError && graphicStatus !== "absent") {
            graphicStatus = "error";
        }


        if (graphicStatus === "display") {

            let normSideLengths = normalizeLengths(triangle[0], triangle[1], props.width);
            let verticalPoint = (props.height - normSideLengths[0]) / 2;
            let horizontalPoint = (props.width - normSideLengths[1]) / 2;


            context.beginPath();
            context.moveTo(horizontalPoint, verticalPoint);


            context.lineTo(horizontalPoint, verticalPoint + normSideLengths[0]);
            context.lineTo(horizontalPoint + normSideLengths[1], verticalPoint + normSideLengths[0]);
            context.lineTo(horizontalPoint, verticalPoint);


            context.strokeStyle = 'black'; // Set the line color
            context.lineWidth = 2; // Set the line width
            context.stroke(); // Draw the lines

        } else if (graphicStatus === "error") {

            context.font = "15px Arial";
            context.fillStyle = 'black';
            context.fillText("Unable to display triangle. Please fix the following errors.", 10, 30, props.width - 20);

            let validErrors = [];
            for (let i = 0; i < statusMessage.length; i++) {
                for (let j = 0; j < statusMessage[i].length; j++) {
                    validErrors.push(statusMessage[i][j]);
                }
            }

            if (postVerificationError) {
                validErrors.push("The entered values do not make a right triangle.");
            }

            context.fillStyle = 'red'
            for (let e = 0; e < validErrors.length; e++) {
                let yVal = 50 + 20 * (e + 1);
                context.fillText(validErrors[e], 10, yVal, props.width - 20);
            }
            
        } else if (graphicStatus === "absent") {

            context.font = "20px Arial";
            context.fillStyle = 'black';
            context.fillText("Enter at least 2 values to begin.", 60, 205, props.width - 20);

        }
        

    }, [props.side1, props.side2, props.hypotenuse, props.angle1, props.angle2]);



    return (
        <canvas ref={canvasRef} width={props.width} height={props.height} />
    );
}

export default Graphic;
