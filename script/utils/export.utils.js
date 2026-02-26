import html2canvas from "html2canvas";
import { showToast } from "../../src/components/toast/toast";

export default function exportBoardAsImage(boardName = "board") {
    const boardDiv = document.getElementById("columns-container");
    if (!boardDiv) {
        showToast("Erreur lors de l'export du board", "error");
        return;
    }
    
    // Sauvegarder les styles actuels
    const originalOverflow = boardDiv.style.overflow;
    const originalPadding = boardDiv.style.padding;
    
    // Récupérer toutes les cards avec bordure colorée
    const cards = boardDiv.querySelectorAll('.column_card');
    const originalBoxShadows = [];
    
    cards.forEach((card, index) => {
        originalBoxShadows[index] = card.style.boxShadow;
        // Si la card a une bordure colorée (inset box-shadow)
        if (card.style.boxShadow && card.style.boxShadow.includes('inset')) {
            const colorMatch = card.style.boxShadow.match(/rgb\([\d,\s]+\)/); // Cherche les valeurs RGB des couleurs 
            if (colorMatch) {
                card.style.border = `2px solid ${colorMatch[0]}`;
                card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        }
    });
    
    // Appliquer les styles pour l'export
    boardDiv.style.overflow = "visible";
    boardDiv.style.padding = "20px";
    
    html2canvas(boardDiv, {
        backgroundColor: "white",
        scale: 2,
        width: boardDiv.scrollWidth,
        height: boardDiv.scrollHeight,
        scrollX: -boardDiv.scrollLeft,
        scrollY: -boardDiv.scrollTop,
        ignoreElements: (element) => {
            return element.classList.contains("no-export");
        }
    })

    .then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${boardName}.png`;
        link.click();
        showToast("Board exporté avec succès", "success");
    })

    .catch(error => {
        console.error("Erreur lors de l'export :", error);
        showToast("Erreur lors de l'export du board", "error");
    })

    .finally(() => {

        // Restaurer tous les styles originaux
        boardDiv.style.overflow = originalOverflow;
        boardDiv.style.padding = originalPadding;
        
        cards.forEach((card, index) => {
            card.style.boxShadow = originalBoxShadows[index];
            card.style.border = '';
        });
    });
}