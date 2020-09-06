import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';


class FirebaseImpl {
    notificationOpenedListener: Function | undefined;
    notificationListener: any;
    messageListener: any;
    async allowFirebase() {
        const enabled = await firebase.messaging().hasPermission();
        if (!enabled) {
            this.requestPermission();
        }

    }

    //2
    private async requestPermission() {
        try {
            await firebase.messaging().requestPermission();


        } catch (error) {

        }
    }

    //3
    async getToken(key: string) {


        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem(key, fcmToken);
        }

        return fcmToken;


    }


    async createNotificationListeners() {

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {

            const notification: Notification = notificationOpen.notification;
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;

            const notification: Notification = notificationOpen.notification;

            var notiJson = JSON.stringify(notification.data);

            try {
                notiJson = notiJson.replace(/\\/g, '');
                notiJson = notiJson.replace('"{', '{');
                notiJson = notiJson.replace('}"', '}');

                var notiObj = JSON.parse(notiJson);



            }
            catch (err) {

            }
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {



        });
    }

}
export default new FirebaseImpl;