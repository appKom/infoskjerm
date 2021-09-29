import Weather from "./Weather"

const WeatherContainer = () => {
    return (
        <div id="weatherDiv">
            <h3>Været på A4</h3>
            <div className="weatherContainer">
                <Weather time={8} temp={4}/>
                <Weather time={12} temp={8}/>
                <Weather time={16} temp={15}/>
                <Weather time={18} temp={13}/>
            </div>
        </div>
        
    )
}

export default WeatherContainer
