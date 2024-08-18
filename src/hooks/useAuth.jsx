import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("idToken")) {
            navigate("/login");
        }
    }, [navigate]);
}