import { Dimensions } from 'react-native';
import { width, height } from '../../utils/width.util';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#254680'
    },
    scrollContainer: {
      width: width[50],
      height: height[30],
      backgroundColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#258ce3',
      margin: 20,
      padding: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textFound: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'green'
    },
    textNotFound: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'orange'
    },
    textFail: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'red'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#258ce3',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    buttonScan2: {
        width: 100,
        height: 100
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
       width: deviceWidth,
       height: 120,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonSave: {
        borderRadius: 10,
        backgroundColor: '#254680',
        paddingTop: 20,
        paddingRight: 25,
        paddingBottom: 20,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonCancelWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        width: deviceWidth - 162,
        backgroundColor: 'white',
        marginTop: 32,
        alignItems: 'center',
        borderRadius: 20
    },
    cancelScan: {
        height: 36,
        width: 36,
        marginRight: 20,
        borderRadius: 20
    },
    cancelText: {
        textAlign: 'center',
        fontSize: 18
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    },
    seachByForm: {
        width: 286,
        height: 162,
        borderWidth: 1,
        borderRadius: 16,
        alignSelf: 'center',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    seachByFormTracking: {
        flexDirection: 'row',
        marginTop: 25,
        marginRight: 30,
        justifyContent: 'space-between'
    },
    seachByFormTrackingTitle: {
        marginHorizontal: 28,
        color: '#BABABA',
        fontSize: 10
    },
    textInputStyle: {
        width: '80%',
        height: 30,
        alignSelf: 'center',
        fontSize: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#BABABA',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    buttonCheck: {
        borderRadius: 10,
        backgroundColor: '#254680',
        paddingTop: 20,
        paddingRight: 25,
        paddingBottom: 20,
        paddingLeft: 25,
        marginTop: 20,
        width: '60%'
    }
}

export default styles;
