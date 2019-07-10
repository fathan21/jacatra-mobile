import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class PageScreen extends React.Component {
   static navigationOptions = {
    title: 'Page',
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>PageScreen Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
         <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Page', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}