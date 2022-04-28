import { Navigate } from "react-router-dom";

const PublicRouters = ({isAut, children}) => {
    return !isAut
    ?children
    :<Navigate to="/*"/>
};

export default PublicRouters;