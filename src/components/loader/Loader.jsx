import './loader.css';

export default function Loader({ fullPage = false, size = 'medium', text = '' }) {
    const sizeClass = `spinner-${size}`;
    
    if (fullPage) {
        return (
            <div className="loader-fullpage">
                <div className={`spinner ${sizeClass}`}></div>
                {text && <p className="loader-text">{text}</p>}
            </div>
        );
    }

    return (
        <div className="loader-inline">
            <div className={`spinner ${sizeClass}`}></div>
            {text && <span className="loader-text">{text}</span>}
        </div>
    );
}

// Mini spinner pour les boutons
export function ButtonSpinner() {
    return <span className="button-spinner"></span>;
}
