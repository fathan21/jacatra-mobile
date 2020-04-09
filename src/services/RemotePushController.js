import React, { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import {App} from "../Redux/const";
const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.warn("TOKEN:", token);
        console.debug("TOKEN:", token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        // console.warn("REMOTE NOTIFICATION ==>", notification);
        console.debug("REMOTE NOTIFICATION ==>", notification);
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: App.sender_id,
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};
export default RemotePushController;
