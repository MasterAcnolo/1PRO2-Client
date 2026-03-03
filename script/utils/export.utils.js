import html2canvas from "html2canvas";
import { showToast } from "../../src/components/toast/toast";

export default function exportBoardAsImage(boardName = "board") {

    const board = document.getElementById("columns-container");
    
    if (!board) return showToast("Erreur lors de l'export du board", "error");

    // Convertir inset box-shadow en border visible
    board.querySelectorAll('.column_card').forEach(card => {

        const match = card.style.boxShadow?.match(/rgb\([\d,\s]+\)/);

        if (match) { 
            card.style.border = `4px solid ${match[0]}`; card.style.boxShadow = ''; 
        }
    });

    board.style.padding = '20px';

    html2canvas(board, {
        backgroundColor: "#f7f7f7", scale: 2,
        width: board.scrollWidth, height: board.scrollHeight,
        ignoreElements: el => el.classList?.contains("no-export") || el.classList?.contains("dropDown") || el.id === "column-grab" || el.id === "column_card-grab"
    })
    .then(canvas => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${boardName}.png`;
        a.click();
        showToast("Board exporté avec succès", "success");
    })
    .catch(() => showToast("Erreur lors de l'export du board", "error"))
    .finally(() => board.style.padding = '');
}