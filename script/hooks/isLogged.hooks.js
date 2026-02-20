import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { isLogged } from "../user";

// Check si jamais l'utilisateur est connecté. Si non, envoie à la page de login
function useUserIsLoggedRedirect(destination, isLoggedCheck = false) { // Si jamais isLogged est à true. On va agir en disant "Si l'utilisateur est connecté alors on fait ça. Si jamais isLogged === false alors on dira "Si jamais l'utilisateur n'est pas connecté alors on fait ça"
    const navigate = useNavigate();

    useEffect(() => {
        async function check() {
            const user = await isLogged();

            if(isLoggedCheck){
                if (user) navigate(`${destination}`);
            } else {
                if (!user) navigate(`${destination}`);
            }

            
        }
        check();
    }, [navigate]);
}

function userIsLogged() {
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

export{
    useUserIsLoggedRedirect,
    userIsLogged,
}