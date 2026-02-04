import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/pages/board.css"

import { useUserIsLoggedRedirect } from "../../script/hooks/hooks.isLogged";
import { getElement } from "../../script/services/getElement";

export default function Board() {

    useUserIsLoggedRedirect('/login');

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
                setBoard(res.data);
                document.title = res.data.title ? `${res.data.title} - Task Loader` : "Board - Task Loader";
            } catch (err) {
                // Gestion spécifique du 404
                if (err.response && err.response.status === 404) {
                    setError("Board introuvable.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchBoard();
    }, [id, navigate]);

    if (loading) return <p>Chargement…</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!board || !board.columns) return <p>Aucune colonne</p>;

    document.title = `Task Loader | ${board.name}`

    return (
        <>
            <div className="board-container">
                <h1>{board.name}</h1>
                {/* Affichage des colonnes et cartes à ajouter ici */}
            </div>
        </>
    );
}
