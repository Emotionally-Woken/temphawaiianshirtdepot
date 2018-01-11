import React, {Component} from 'react'
import Loader from './HOC/Loader'
import WeatherDisplay  from './WeatherDisplay'

class Weather extends Component {
  constructor(props){
    super(props)

  }
  render(){
    const {hawaii} = this.props
    return <WeatherDisplay hawaii={hawaii} />
  }
}

const wrappedWeather = Loader('hawaii')(Weather)


export default wrappedWeather
