import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Dimensions } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Search = ({ fetchdata }) => {
    const [city, setcity] = useState('')
    return (
        <View style={[tw`mt-10 flex-row m-4 px-4 justify-between items-center w-11/12 self-center rounded-xl`, {backgroundColor:'lightgray'}]}>
            <TextInput
                placeholder='Enter City Name'
                value={city}
                onChangeText={(text)=>setcity(text)}
                style={[tw`text-xl`]}
            />
            <FontAwesome
                name='search'
                color='black'
                size={30}
                onPress={()=>fetchdata(city)}
            />
        </View>
    )
}

export default Search