import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../styles/pages/boardList.css"

import { isLogged } from '../../script/auth';

export default function BoardList(){

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

        <section className='main'>
            <h1> Vos Boards </h1>

            <section className='board-container'>
                
            </section>
        </section>

        </>
    )
}