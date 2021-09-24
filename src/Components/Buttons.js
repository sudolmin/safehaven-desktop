const Buttons = ({ innertext, className, clickFunc, id, disabled}) => {
    return (
        <div className="btn-wrapper" id={id}>
            <button onClick={clickFunc} className={className} disabled={disabled}>
                {innertext}
            </button>
        </div>
    )
}

Buttons.defaultProps = {
    className: "btn",
    innertext: "Click Me !",
    disabled: false
}

export default Buttons