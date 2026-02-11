import { useState, useEffect } from 'react';
import './toast.css';

// Configuration des icônes par type
const toastIcons = {
  success: "/assets/icon/check-circle.svg",
  error: "/assets/icon/cross-circle.svg",
  info: "/assets/icon/info.png"
};

// État global du toast
let toastListener = null;

// Fonction d'export pour afficher le toast
export const showToast = (message, type = "info", persist = false) => {
  if (persist) {
    // Sauvegarder dans sessionStorage pour survivre aux redirections
    sessionStorage.setItem('pendingToast', JSON.stringify({ message, type }));
  }
  
  if (toastListener) {
    toastListener(message, type);
  }
};

function Toast() {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    toastListener = (msg, toastType) => {
      setMessage(msg);
      setType(toastType);
      setIcon(toastIcons[toastType] || toastIcons.info);
      setVisible(true);
    };

    // Vérifier s'il y a un toast en attente après redirection
    const pendingToast = sessionStorage.getItem('pendingToast');
    if (pendingToast) {
      try {
        const { message, type } = JSON.parse(pendingToast);
        sessionStorage.removeItem('pendingToast');
        // Petit délai pour que la page soit montée
        setTimeout(() => {
          toastListener(message, type);
        }, 100);
      } catch (e) {
        console.error('Erreur lors de la lecture du toast:', e);
      }
    }

    return () => {
      toastListener = null;
    };
  }, []);
  

  // timer + invisible ou visible du toast
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [visible]);


  // toast (la fenetre en gros)
  return (
    <>
      {visible && (
        <div className={`toast ${type}`}>
          <div className="icon">
            <img src={icon} alt="icon" />
          </div>
          <div className="message">{message}</div>
        </div>
      )}
    </>
  );
}

export default Toast;