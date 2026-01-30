import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TaskCard from "../components/board/column/card/card.jsx";
import { userIsLoggedRedirect } from "../../script/hooks/hooks.isLogged";
import { getElement } from "../../script/services/getElement";

export default function Board() {

    userIsLoggedRedirect();

    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [column, setColumn] = useState(null);
    const [card, setCard] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            navigate("/board");
            return;
        }

        async function fetchBoard() {
            try {
                const res = await getElement("BOARD", id);
                console.log(res.data.name)
                console.log(res.data)
                setBoard(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBoard();
    }, [id, navigate]);

    if (loading) return <p>Chargement…</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!board || !board.columns) return <p>Aucune colonne</p>;

    return (
        <> 
            <h1>{board.name}</h1>
            <p>{board.description}</p>
        </>
    );
}
