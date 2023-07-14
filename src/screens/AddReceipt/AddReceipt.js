import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './AddReceiptStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addReceiptAction from '../../api/addReceipt'
import { addReceiptClear } from '../../actions/addReceipt'
import { navToAfterUpdate } from '../../utils'
import { appConfig } from '../../config';


class AddReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      tracking: props.route.params.tracking,
      serverName: props.route.params.serverName,
      id: props.route.params.id,
      senderPhone: props.route.params.senderPhone,
      senderName: props.route.params.senderName,
      senderSite: props.route.params.senderSite,
      quantity: 0,
      amount: 0,
      counter: 0,
      timerID: null,
      sent: false
    }

    this.handleAddData = this.handleAddData.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }


  handleResponse(){
    this.setState({ counter: this.state.counter + 1 })
    const { error, message } = this.props;

    if (message && this.state.counter < 10) {
      Alert.alert('Success', 'DONE')
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      this.props.clear()
      navToAfterUpdate('Home', this.props, this.state)
    }
    else if (error && this.state.counter < 10){
      Alert.alert('Error', error.message+'\n FAILURE')
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


  handleAddData(){
    if (this.state.sent) return false

    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })

    if (!this.state.senderName || !this.state.senderPhone || !this.state.quantity || !this.state.amount) {
      Alert.alert('Error', 'Fields are required!')
      this.props.clear()
      this.setState({ sent: false })
      return false
    }

    let site = ''
    if (this.state.senderSite === 'forward')
      site = appConfig.API_URL_2
    else
      site = appConfig.API_URL_1


    const body = {
      role: this.state.userRole,
      token: this.state.token,
      serverName: this.state.serverName,
      id: this.state.id,
      senderPhone: this.state.senderPhone,
      senderName: this.state.senderName,
      senderSite: site,
      quantity: this.state.quantity,
      amount: this.state.amount
    }

    this.props.addReceipt(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  setName = (value) => {
    this.setState({ senderName: value })
  }
  setPhone = (value) => {
      this.setState({ senderPhone: value })
  }
  setQuantity = (value) => {
    if (value.replace(/[^0-9]/g, '') < 1000)
      this.setState({ quantity: value.replace(/[^0-9]/g, '') })
  }
  setAmount = (value) => {
      this.setState({ amount: value.replace(/[^0-9]/g, '') })
  }


  render () {

    const { loading } = this.props;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading ...'}
        />
        <View style={styles.dataForm}>
        <Text style={styles.dataFormTitle}>Task № {this.state.id}</Text>
          <View style={styles.dataFormFirstField}>
            <Text style={styles.dataFormTitle}>CUSTOMER NAME</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Customer name'}
            value={this.state.senderName}
            onChangeText={this.setName}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>CUSTOMER PHONE NUNMBER</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Customer phone'}
            value={this.state.senderPhone}
            onChangeText={this.setPhone}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>QUANTITY OF PARCELS</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Quantity'}
            value={this.state.quantity}
            onChangeText={this.setQuantity}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>AMOUNT</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Amount'}
            value={this.state.amount}
            onChangeText={this.setAmount}
            autoCorrect={false}
          />          
        </View>
          <TouchableOpacity style={ !this.state.sent ? styles.button : styles.buttonDisabled } onPress={this.handleAddData}>
            <Text style={styles.buttonText}>ISSUE RECEIPT</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.addReceipt.message,
    loading: state.addReceipt.loading,
    error: state.addReceipt.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addReceipt: addReceiptAction,
    clear: addReceiptClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReceipt)
