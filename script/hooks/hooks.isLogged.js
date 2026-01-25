import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { isLogged } from "../user";

// Check si jamais l'utilisateur est connecté. Si non, envoie à la page de login
function useIsLoggedRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        async function check() {
            const user = await isLogged();
            if (!user) navigate("/login");
        }
        check();
    }, [navigate]);
}

function useIsLogged() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        async function check() {
            const status = await isLogged();
            setLogged(status);
        }
        check();
    }, []);

    return logged;
}

export {
    useIsLoggedRedirect,
    useIsLogged
}