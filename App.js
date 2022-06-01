import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator, PermissionsAndroid } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import Weather from './components/Weather';
import Search from './components/Search';
import Geolocation from 'react-native-geolocation-service';

const api_key = '287d51ffdea679a45939f1b760c41ff1'

const App = () => {
  const [data, setdata] = useState(null)
  const [loaded, setloaded] = useState(false)
  const [city, setcity] = useState('')

  const getpermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (permission === 'granted') {
        Geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
              const locationdata = await response.json()
              setcity(locationdata.city);
            }
            catch {
              (error) => {
                console.log(error)
              }
            }
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getpermission()
  }, [])

  useEffect(() => {
    if (city) {
      fetchdata(city)
    }
  }, [city])


  const fetchdata = async (city) => {
    setloaded(false)
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    try {
      const response = await fetch(api)
      if (response.status === 200) {
        const weatherdata = await response.json()
        setdata(weatherdata)
      }
      else {
        setdata(null)
      }
      setloaded(true)
    } catch { (error) => console.log(error) }
  }

  if (!loaded) {
    return (
      <View style={[tw`flex-1 justify-center items-center bg-white`]}>
        <ActivityIndicator
          size={40}
        />
      </View>
    )
  }

  else if (data === null) {
    return (
      <View style={[tw`flex-1 items-center bg-white`]}>
        <Search fetchdata={fetchdata} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>City not found!!! Try different city.</Text>
      </View>
    )
  }

  return (
    <View style={[tw`flex-1 justify-center items-center bg-white`]}>
      <Weather data={data} fetchdata={fetchdata} />
    </View>
  )
}

export default App