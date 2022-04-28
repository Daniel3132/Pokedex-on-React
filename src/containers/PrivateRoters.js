import { Navigate } from "react-router-dom";

const PrivateRoters = ({isAut, children}) => {
        return isAut
        ?children
        :<Navigate to="/login"/>
};

export default PrivateRoters;