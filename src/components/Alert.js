import React from 'react'

export default function Alerts(props) {

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    
    return (
        <div style={{ height: '50px' }}> { /* setting height so that the alert does not move the contents below it */ }
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: <strong>{props.alert.msg}</strong>
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  */} {/* This line provides a cross button which permanantly deletes the alert and won't be generated again unless we reload the page. That's why it's commented out */}
                {/* props.alert && ensures that the staments after it will only be returned if props.alert exists */}
            </div>}
        </div>
    )
}
