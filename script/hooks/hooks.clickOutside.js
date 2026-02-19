import { useEffect } from 'react';


export function useClickOutside(ref, callback, isActive = true) {
    useEffect(() => {
        // Si le hook n'est pas actif, on ne fait rien
        if (!isActive) return;

        // Fonction qui vérifie si le clic est en dehors de l'élément
        const handleClickOutside = (e) => {
            // Si l'élément existe ET que le clic n'est pas dedans
            if (ref.current && !ref.current.contains(e.target)) {
                callback(); // On exécute la fonction de callback
            }
        };

        // On écoute tous les clics sur le document
        document.addEventListener('click', handleClickOutside);
        
        // Cleanup: on retire l'écouteur quand le composant se démonte
        return () => document.removeEventListener('click', handleClickOutside);
    }, [ref, callback, isActive]); // Se re-exécute si ces valeurs changent
}
