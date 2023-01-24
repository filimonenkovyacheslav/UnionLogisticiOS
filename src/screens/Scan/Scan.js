import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyles';
import images from '../../utils/image.utils'
import { navToWithScan } from '../../utils'


class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            userName: props.route.params.userName,
            token: props.route.params.token,
            userRole: props.route.params.userRole,
            tracking: props.route.params.tracking,
            id: props.route.params.id
        };
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

    saveTracking = () => {
      navToWithScan('Add Tracking', this.props, this.state)
    }

    activeQR = () => {
        this.setState({ scan: true })
    }

    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }

    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Image source={images.camera} style={{height: 36, width: 36}}></Image>
                            <Text numberOfLines={8} style={styles.descText}>
                            Please move your camera {"\n"} over the Barcode
                            </Text>
                            <Image source={images.barCode} style={{margin: 0}}></Image>
                            <TouchableOpacity onPress={this.saveTracking} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={images.handly} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Input Handly</Text>
                                </View>
                            </TouchableOpacity>
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
                                <Text>Result : {result.data}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={images.camera} style={{height: 36, width: 36, marginRight: 20}}></Image>
                                        <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.saveTracking} style={styles.buttonSave}>
                                    <Text style={{color: 'white'}}>Save Tracking</Text>
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

export default Scan;
