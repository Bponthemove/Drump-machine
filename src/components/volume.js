const Volume = ( {volume, onChangeValue} ) => {
    return (
        <div id='volume'>
            <p>Volume</p>
            <input type="range" min="0" max="100" step="1" value={volume} onChange={onChangeValue}></input>
            <p>{volume}</p>
        </div>
    )}

export { Volume }