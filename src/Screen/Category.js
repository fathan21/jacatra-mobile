import React from "react";
import { View, Text, Button } from "react-native";

export default class CategoryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Category Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Page', {
              itemId: 86,
              otherParam: 'anything you want here',
            })}
        />
      </View>
    );
  }
}