import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Alert, Image, ImageBackground, BackHandler, ScrollView, TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './SearchByChecklistStyles';
import images from '../../utils/image.utils'
import { navToWithScan } from '../../utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchChecklistAction from '../../api/fetchChecklist'
import { fetchChecklistClear } from '../../actions/checklist'
import addChecksHistoryAction from '../../api/addChecksHistory'
import { addChecksHistoryClear } from '../../actions/addChecksHistory'


class SearchByChecklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            userName: props.route.params.userName,
            token: props.route.params.token,
            userRole: props.route.params.userRole,
            tracking: null,
            serverName: props.route.params.serverName,
            id: props.route.params.id,
            isVisible: false,
            trackingNow: ''
        };

        this.userData = {
            name: this.props.route.params.userName,
            token: this.props.route.params.token,
            serverName: this.props.route.params.serverName,
            role: this.props.route.params.userRole
        }
        this.props.fetchChecklist(this.userData)      
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        
        if (this.state.trackingNow !== e.data) {
            const scanResult = this.checkTrackingWithValue(this.props.checklist, e.data)
            if (scanResult) {
                this.sendAddChecksHistory(e.data,scanResult);
            }
            else {
                this.sendAddChecksHistory(e.data,'NOT FOUND');
            }

            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                tracking: e.data,
                trackingNow: e.data
            })
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                tracking: e.data
            })
        }                                      
        
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } /*else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                tracking: e.data
            })
        }*/
    }

    inputHandly = () => {
        if (!this.state.isVisible)
            this.setState({ isVisible: true })
        else
            this.setState({ isVisible: false })
    }

    setTracking = (value) => {
        this.setState({ tracking: value })
    }

    checkTracking = () => {
        this.setState({
            scan: false,
            ScanResult: true
        })
    }

    activeQR = () => {
        this.setState({ scan: true })
    }

    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }

    checkTrackingWithValue = (checklistArr, tracking) => {
        for (let i = 0; i < checklistArr.length; i++) {
            for (let prop in checklistArr[i]) {
                if (checklistArr[i]['tracking_main'] === tracking) {
                    
                    return checklistArr[i]['value'];
                }
            }
        }
        
        return false;
    }

    sendAddChecksHistory = (tracking,value) => {
        const body = {
            token: this.state.token,
            tracking: tracking,
            serverName: this.state.serverName,
            value: value
        }
        this.props.addChecksHistory(body)
    }

    render() {
        const { scan, ScanResult, result, tracking, isVisible } = this.state
        const checklistArr = this.props.checklist
        const checkResult = checklistArr.length ? true : false
        
        return (
            <View style={styles.viewStyle}>
                <Fragment>
                    {!scan && !ScanResult && checkResult &&                       
                        <View style={styles.cardView} >
                            <Image source={images.camera} style={{height: 36, width: 36}}></Image>
                            <Text numberOfLines={8} style={styles.descText}>
                            Please move your camera {"\n"} over the Barcode
                            </Text>
                            <Image source={images.barCode} style={{margin: 0}}></Image>
                            <TouchableOpacity onPress={this.inputHandly} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={images.handly} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Input Handly</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ display: isVisible ? 'flex' : 'none' }} >
                                <View style={styles.seachByForm}>
                                    <View style={styles.seachByFormTracking}>
                                        <Text style={styles.seachByFormTrackingTitle}>Tracking number</Text>
                                    </View>
                                    <TextInput
                                      textContentType={'username'}
                                      value={tracking}
                                      onChangeText={this.setTracking}
                                      style={styles.textInputStyle}
                                      autoCorrect={false}
                                    />
                                    <TouchableOpacity onPress={this.checkTracking} style={styles.buttonCheck}>
                                        <Text style={{color: 'white',textAlign: 'center'}}>Check Tracking</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ display: isVisible ? 'none' : 'flex' }} >
                                <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                    <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan Barcode</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>                      
                    }
                    {!scan && !ScanResult && !checkResult &&                       
                        <View style={styles.cardView} >
                            <Text style={styles.textFail}>FAIL</Text>
                        </View>                       
                    }
                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                {
                                    (this.checkTrackingWithValue(checklistArr, tracking)) ?
                                    <Text style={styles.textFound}>{this.checkTrackingWithValue(checklistArr, tracking)}</Text> :
                                    <Text style={styles.textNotFound}>NOT FOUND</Text>
                                }
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                        <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                    </View>
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

function mapStateToProps (state) {
    return {
        checklist: state.fetchChecklist.checklist,
        loading: state.fetchChecklist.loading,
        error: state.fetchChecklist.error,
        messageChecksHistory: state.addChecksHistory.message,
        loadingChecksHistory: state.addChecksHistory.loading,
        errorChecksHistory: state.addChecksHistory.error
    }
}


function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        fetchChecklist: fetchChecklistAction,
        clear: fetchChecklistClear,
        addChecksHistory: addChecksHistoryAction,
        clearChecksHistory: addChecksHistoryClear
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByChecklist)
