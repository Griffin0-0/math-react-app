import '../css/basic.css';
import '../css/home.css';
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

    return (
        <div className="Home">



            <div className="homeContainer">
                <h1>Right Triangle Solver</h1>

                <button 
                    onClick={() => 
                        navigate("/calculate")
                }>
                Begin
                </button>

            </div>



        </div>
    );
}

export default Home;
