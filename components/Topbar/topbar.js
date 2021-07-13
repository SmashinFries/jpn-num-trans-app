import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export class TopBar extends Component {

    render() {
        return (
            <SafeAreaView>
                <Header
                    backgroundColor= {'#15cf37'}
                    centerComponent={{ text: '日本語の番号！', style: { color: '#fff', fontSize:25 } }}
                />
            </SafeAreaView>
        );
    }
}