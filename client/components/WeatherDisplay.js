import React from 'react'

const WeatherDisplay = ({hawaii}) => {
  const cold = hawaii.current_observation.temp_f < 70
  return (
    <div className='weather'>
      <p>It's {hawaii.current_observation.temp_f}{` \u00B0`}{`F in `}{hawaii.current_observation.display_location.full}{'...'}</p>
    {cold ? <p>Brrr! Better buy two shirts!</p> : <p>See you at the beach!</p>}
      <img className='wunderground' src='https://www.wunderground.com/logos/images/wundergroundLogo_4c_horz.jpg' /></div>
  )
}

export default WeatherDisplay
