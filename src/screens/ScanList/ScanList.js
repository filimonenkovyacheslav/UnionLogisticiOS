import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Alert, Image, ImageBackground, BackHandler, ScrollView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanListStyles';
import images from '../../utils/image.utils'
import { navToWithScan } from '../../utils'


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
            tracking: [],
            serverName: props.route.params.serverName,
            id: props.route.params.id
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        let trackingArr = this.state.tracking;
        if (trackingArr.indexOf(e.data) === -1)
          trackingArr.push(e.data);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true,
            tracking: trackingArr
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                tracking: trackingArr
            })
        }
    }

    saveTracking = () => {
      if (this.state.tracking.length) {
        navToWithScan('Add Tracking to List', this.props, this.state)
      } else {
        Alert.alert('Error', 'List cannot be empty!')
        return false
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
                              <ScrollView style={styles.scrollContainer}>
                                  <Text>Result : </Text>
                                  {tracking.map(item => {
                                    return <Text>{item}</Text>;
                                  })}
                                </ScrollView>
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

export default ScanList;
