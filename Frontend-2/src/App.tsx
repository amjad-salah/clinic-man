import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="main p-3">
                <ToastContainer />
                <div className="container my-5">
                   <Outlet />                    
                </div>
            </div>
        </div>
    );
};

export default App;