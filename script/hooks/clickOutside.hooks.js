import { useEffect } from 'react';

/*
  Hook personnalisé qui détecte un clic en dehors d’un élément
   et déclenche un callback.
  
   ref - Référence React vers l'élément à surveiller (useRef)
   callback - Fonction à exécuter si clic en dehors
   isActive - Permet d'activer/désactiver le listener
 */
export function useClickOutside(ref, callback, isActive = true) {
    useEffect(() => {

        // Si le hook est désactivé (ex: modal fermée),
        // on ne crée pas d’event listener.
        if (!isActive) return;

        /*
          Fonction exécutée à chaque clic sur le document.
           Elle vérifie si le clic est en dehors de l’élément ciblé.
         */
        const handleClickOutside = (e) => {

            // Vérifie que :
            // L’élément existe dans le DOM
            // Le clic ne s’est PAS produit à l’intérieur de cet élément
            if (ref.current && !ref.current.contains(e.target)) {

                // Si c’est un clic extérieur on déclenche le callback
                callback();
            }
        };

        // On écoute tous les clics sur le document
        // (car un clic extérieur peut venir de n'importe où)
        document.addEventListener('click', handleClickOutside);

        // Cleanup :
        // Important pour éviter les memory leaks et les listeners multiples.
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

        // L’effet se relance si :
        // - la ref change
        // - le callback change
        // - isActive change
    }, [ref, callback, isActive]);
}