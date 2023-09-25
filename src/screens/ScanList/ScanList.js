import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Alert, Image, ImageBackground, BackHandler, ScrollView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanListStyles';
import images from '../../utils/image.utils'
import { navToAfterChoose } from '../../utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addListAction from '../../api/addList'
import { addListClear } from '../../actions/addList'


class ScanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            userName: props.route.params.userName,
            token: props.route.params.token,
            userRole: props.route.params.userRole,
            tracking: '',
            serverName: props.route.params.serverName,
            listName: props.route.params.listName,
            counter: 0,
            timerID: null,
            sent: false,
            endScan: false
        };

        this.handleAddList = this.handleAddList.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    
    handleResponse(){
        this.setState({ counter: this.state.counter + 1 })
        const { error, message } = this.props;

        if (message && this.state.counter < 10) {
            Alert.alert('Success', message)
            clearInterval(this.state.timerID)
            this.setState({ sent: false })
            this.props.clear()
            if (this.state.endScan)
                navToAfterChoose('Home', this.props, this.state)
            else{
                this.setState({
                    result: null,
                    scan: false,
                    ScanResult: false,
                    tracking: ''
                })
                navToAfterChoose('Scan Tracking to List', this.props, this.state)
            }
        }
        else if (error && this.state.counter < 10){
            Alert.alert('Error', error.message+'\n כישלון. סרוק שוב \n Failure. Scan again \n Сканирование не удалось, повторите попытку')
            clearInterval(this.state.timerID)
            this.setState({ sent: false })
            this.props.clear()
        }
        else if (this.state.counter === 10){
            clearInterval(this.state.timerID)
            this.setState({ sent: false })
            Alert.alert('Error', 'Network error!')
            this.props.clear()
        }
    }


    handleAddList(){
        if (this.state.sent) return false
        if (!this.state.tracking) {
            Alert.alert('Error', 'Tracking is required!')
            return false
        } 

        this.setState({ counter: 0 })
        this.setState({ timerID: null })
        this.setState({ sent: true })

        const body = {
            token: this.state.token,
            tracking_list: [this.state.tracking],
            serverName: this.state.serverName,
            list_name: this.state.listName
        }

        this.props.addList(body)
        this.setState({ timerID: setInterval(this.handleResponse, 1000) })
    }


    setTracking = (value) => {
        this.setState({ tracking: value })
    }

    
    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true,
            tracking: e.data
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                tracking: e.data
            })
        }
    }

    
    activeQR = () => {
        this.setState({ scan: true })
    }


    handleScanAgain = () => {
        this.handleAddList()
    }


    handleEndScan = () => {
        this.setState({ endScan: true })
        this.handleAddList()
    }

    
    render() {
        const { scan, ScanResult, result, tracking } = this.state
        return (
            <View style={styles.viewStyle}>
                <Fragment>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Image source={images.camera} style={{height: 36, width: 36}}></Image>
                            <Text numberOfLines={8} style={styles.descText}>
                            Please move your camera {"\n"} over the Barcode
                            </Text>
                            <Image source={images.barCode} style={{margin: 0}}></Image>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan Barcode</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Result : {tracking}</Text>
                                <TouchableOpacity onPress={this.handleScanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                        <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleEndScan} style={styles.buttonSave}>
                                    <Text style={{color: 'white'}}>Complete the List</Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                   Please move your camera {"\n"} over the Barcode
                                </Text>
                            }
                            bottomContent={
                                <View>
                                  <TouchableOpacity style={styles.buttonScan2}
                                      onPress={() => this.setState({ scan: false })}
                                      >
                                      <View style={styles.buttonCancelWrapper}>
                                        <Image source={images.camera2}
                                        style={styles.cancelScan}></Image>
                                        <Text style={styles.cancelText}>Cancel Scan</Text>
                                      </View>
                                  </TouchableOpacity>
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        message: state.addList.message,
        loading: state.addList.loading,
        error: state.addList.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addList: addListAction,
        clear: addListClear
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanList)
