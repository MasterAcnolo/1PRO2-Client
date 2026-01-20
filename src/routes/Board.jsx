import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskCard from '../components/board/column/card/card.jsx';

import { isLogged } from '../../script/auth';

export default function Board(){

    const navigate = useNavigate();

    useEffect(() => {
      // Check Login (If user connected)
            async function checkLogin() {
                const user = await isLogged(); // récupère l'utilisateur si connecté
                if (!user) {
                    navigate("/login"); // pas connecté -> redirection
                }
            }
         checkLogin();
      }, [navigate]);

    return (
    <>
            <TaskCard 
            titre="Titre"
            description="Ceci est une description qui decrit"
            date="EE"
            />
        </>
    )
}