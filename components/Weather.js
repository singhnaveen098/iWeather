import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import Search from './Search';
import { haze, rainy, snow, sunny } from '../background/index'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Weather = ({ data, fetchdata }) => {

    const [backgroundimg, setbackgroundimg] = useState()
    const { weather, name, main: { temp, humidity }, wind: { speed } } = data
    const [{ main }] = weather

    useEffect(() => {
        setbackgroundimg(getbackgroundimg(main))
    }, [data])

    const getbackgroundimg = (weather) => {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;
    }

    let textcolor = backgroundimg !== sunny ? 'white' : 'black'

    return (
        <View style={[tw`flex-1 items-center bg-white`]}>
            <ImageBackground
                source={backgroundimg}
                resizeMode='cover'
                style={[tw`flex-1`, { width: Dimensions.get('screen').width }]}
            >
                <Search fetchdata={fetchdata}/>
                <View style={[tw`items-center`]}>
                    <Text style={[tw``, { fontSize: 60, color: textcolor, fontWeight: 'bold' }]}>{name}</Text>
                    <Text style={[tw``, { fontSize: 40, color: textcolor, fontWeight: 'bold' }]}>{main}</Text>
                    <Text style={[tw``, { fontSize: 40, color: textcolor }]}>{temp} °C</Text>
                </View>

                <View style={[tw`flex-row justify-between p-4 mt-20`]}>
                    <View style={[tw`items-center justify-center rounded-xl p-4`, {backgroundColor: 'rgba(0,0,0, 0.5)'}]}>
                        <Text style={[tw``, { fontSize: 30, color: 'white' }]}>Humidity</Text>
                        <Text style={[tw``, { fontSize: 30, color: 'white' }]}>{humidity} %</Text>
                    </View>

                    <View style={[tw`items-center justify-center rounded-xl p-4`, {backgroundColor: 'rgba(0,0,0, 0.5)'}]}>
                        <Text style={[tw``, { fontSize: 30, color: 'white' }]}>Wind Speed</Text>
                        <Text style={[tw``, { fontSize: 30, color: 'white' }]}>{speed} m/s</Text>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default Weather