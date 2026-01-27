import TaskCard from '../components/board/column/card/card.jsx';

import {userIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';

export default function Board(){

    userIsLoggedRedirect();
    
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