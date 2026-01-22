import TaskCard from '../components/board/column/card/card.jsx';

import {useIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';

export default function Board(){

    useIsLoggedRedirect();
    
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