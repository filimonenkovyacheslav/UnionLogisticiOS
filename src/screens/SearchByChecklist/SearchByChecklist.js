import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Alert, Image, ImageBackground, BackHandler, ScrollView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './SearchByChecklistStyles';
import images from '../../utils/image.utils'
import { navToWithScan } from '../../utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchChecklistAction from '../../api/fetchChecklist'
import { fetchChecklistClear } from '../../actions/checklist'


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
            tracking: [],
            serverName: props.route.params.serverName,
            id: props.route.params.id
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

    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }

    render() {
        const { scan, ScanResult, result, tracking } = this.state
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
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan Barcode</Text>
                                </View>
                            </TouchableOpacity>
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
                                    (checklistArr.indexOf(tracking) !== -1) ?
                                    <Text style={styles.textFound}>FOUND</Text> :
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
        error: state.fetchChecklist.error
    }
}


function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        fetchChecklist: fetchChecklistAction,
        clear: fetchChecklistClear
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByChecklist)
