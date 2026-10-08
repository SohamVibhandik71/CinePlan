import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useProtectedAction = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const runProtectedAction = (action) => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        action();
    };

    return runProtectedAction;
};

export default useProtectedAction;