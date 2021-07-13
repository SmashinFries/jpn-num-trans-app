import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Conversion } from '../Converter/numconvert';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}; 
        this.onPress = this.onPress.bind(this);
    }

    onPress = () => {
        const conversion = new Conversion(this.state.text);
        const { hir_out, kanji } = conversion.Convert();
        this.setState({
            hiragana: hir_out,
            kanji: kanji
        })
    }

    render() {
        return(
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <Text style={{ fontWeight:'bold', fontSize:35 }}>Enter a number!</Text>
                <Input
                    style={{ textAlign: 'center' }}
                    onChangeText={(text) => this.setState({text})}
                    placeholder='Enter a number up to 6 digits'
                    keyboardType="numeric"
                    containerStyle={{ width:'70%' }}
                />
                <Button title='CRUNCH' type='outline' onPress={this.onPress} />
                <Text style={convertStyle.results}> {this.state.kanji} </Text>
                <Text style={convertStyle.results}> {this.state.hiragana} </Text>
            </View>
        );
    }
}

const convertStyle = StyleSheet.create({
    results: {
        paddingTop:18,
        fontSize:25,
        textAlign:'center'
    },
  });