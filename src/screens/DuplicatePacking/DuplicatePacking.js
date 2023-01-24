import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, Alert, Linking } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './DuplicatePackingStyles'
import images from '../../utils/image.utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createDuplicatePackingAction from '../../api/duplicatePacking'
import { duplicatePackingClear } from '../../actions/duplicatePacking'
import { appConfig } from '../../config';


class DuplicatePacking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      counter: 0,
      timerID: null,
      sent: false,
      packingNumber: ''
    }
    this.handleDuplicatePacking = this.handleDuplicatePacking.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }


  handleResponse(){
    this.setState({ counter: this.state.counter + 1 })
    if (this.props.link && this.state.counter < 10) {
      const url = appConfig.API_URL + this.props.link;
      const supported = Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      this.props.clear()
    }
    else if (this.props.error && this.state.counter < 10) {
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      Alert.alert('Error', this.props.error.message)
      this.props.clear()
    }
    else if (this.state.counter === 10){
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      Alert.alert('Error', 'Network error!')
      this.props.clear()
    }
  }


  handleDuplicatePacking(body) {
    if (this.state.sent) return false

    this.props.clear()
    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })

    this.props.createDuplicatePacking(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  setPackingNumber = (value) => {
    this.setState({ packingNumber: value })
  }


  sessionToken = () =>{
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }


  sendPackingNumber = () => {
    if (!this.state.packingNumber) {
      Alert.alert('Error', 'Packing Number is required!')
      return false
    }

    const body = {
      token: this.state.token,
      session_token: this.sessionToken(),
      duplicate_qty: 1,
      packing_number: this.state.packingNumber
    }

    this.handleDuplicatePacking(body)
  }


  render () {
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading ...'}
        />
        <View style={styles.logoWarap}>
          <Image source={images.logo} />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Packing Number</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Packing Number'}
            value={this.state.packingNumber}
            onChangeText={this.setPackingNumber}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.button} onPress={this.sendPackingNumber}>
            <Text style={styles.buttonText}>Send Packing Number</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    link: state.duplicatePacking.link,
    loading: state.duplicatePacking.loading,
    error: state.duplicatePacking.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDuplicatePacking: createDuplicatePackingAction,
    clear: duplicatePackingClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuplicatePacking)
