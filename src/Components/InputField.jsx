import '../css/basic.css';


function InputField(props) {

    return ( 
        <div className="InputField">

            <input onChange={(event) => props.handleInputChange(props.valueType, event)} placeholder={props.placeholderText}/>

        </div>
    );
}

export default InputField;