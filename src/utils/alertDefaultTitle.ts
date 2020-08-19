import { Alert } from "react-native"

class AlertDefaultTitle {
    show = (message:string, titleLeft = "OK", actionLeft?:any, titleRight?:string, actionRight?:any) => {
        let optionAction = []
        if (titleLeft) {
            optionAction.push({
                text: titleLeft,
                onPress: actionLeft
            })
        }

        if (titleRight) {
            optionAction.push({
                text: titleRight,
                onPress: actionRight
            })
        }

        Alert.alert(
            'Thông báo',
            message,
            optionAction
        )
    }

    prompt = (message:string, titleLeft = "OK", actionLeft:any, titleRight:string, actionRight:any) => {
        let optionAction = []
        if (titleLeft) {
            optionAction.push({
                text: titleLeft,
                onPress: actionLeft
            })
        }

        if (titleRight) {
            optionAction.push({
                text: titleRight,
                onPress: actionRight
            })
        }

        Alert.prompt(
            'Thông báo',
            message,
            optionAction
        )
    }
}

const alertDefaultTitle = new AlertDefaultTitle()

export default alertDefaultTitle