import React from 'react';
import { View, StatusBar } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }});

export const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
<View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={"#000000"} />
</View>
);