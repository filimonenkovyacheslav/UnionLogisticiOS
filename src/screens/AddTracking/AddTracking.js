import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './AddTrackingStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addDataAction from '../../api/addData'
import { addDataClear } from '../../actions/addData'
import { navToWithTask } from '../../utils'


class AddTracking extends Component {
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
      weight: '',
      width: '',
      height: '',
      length: '',
      amountPayment: '',
      counter: 0,
      timerID: null,
      sent: false
    }

    this.handleAddData = this.handleAddData.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleAddReceipt = this.handleAddReceipt.bind(this)
  }


  handleResponse(){
    this.setState({ counter: this.state.counter + 1 })
    const { error, message } = this.props;

    if (message && this.state.counter < 10) {
      /*if(this.state.userRole === 'courier')
        Alert.alert('Success', 'הוקלט בהצלחה \n Recorded successfully \n Обработка завершена успешно')
      else
        Alert.alert('Success', 'Recorded successfully')*/
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      this.props.clear()
      this.handleAddReceipt()
      /*console.log(this.props.task)      
      navToAfterUpdate('Home', this.props, this.state)*/
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


  handleAddData(){
    if (this.state.sent) return false

    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })
    const courierArr = ['courier', 'courier_1', 'courier_2', 'courier_3', 'courier_4', 'courier_5', 'courier_6', 'courier_7']

    if (!this.state.tracking) {
      Alert.alert('Error', 'Tracking is required!')
      this.props.clear()
      return false
    }
    if (courierArr.indexOf(this.state.userRole) !== -1) {
      if (!this.state.weight || !this.state.length || !this.state.width || !this.state.height || !this.state.amountPayment) {
        Alert.alert('Error', 'הזן את כל הנתונים הנדרשים  \n Enter all data required \n Введите все необходимые данные')
        this.props.clear()
        return false
      }
    }
    if (this.state.userRole === 'agent') {
      if (!this.state.weight || !this.state.length || !this.state.width || !this.state.height) {
        Alert.alert('Error', 'Enter all data required')
        this.props.clear()
        return false
      }
    }

    const body = {
      role: this.state.userRole,
      token: this.state.token,
      tracking: this.state.tracking,
      serverName: this.state.serverName,
      id: this.state.id,
      weight: this.state.weight,
      length: this.state.length,
      width: this.state.width,
      height: this.state.height,
      amountPayment: this.state.amountPayment
    }

    this.props.addData(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  handleAddReceipt(){
    return Alert.alert(
      "GENERATE RECEIPT",
      "Recorded successfully! Do you want to generate receipt?",
      [
        {
          text: "Yes",
          onPress: () => {
            const data = {
              id: this.state.id,
              token: this.state.token,
              userName: this.state.userName,
              tracking: this.state.tracking,
              serverName: this.state.serverName,
              userRole: this.state.userRole,
              senderPhone: this.state.senderPhone,
              senderName: this.state.senderName,
              senderSite: this.state.senderSite
            }
            navToWithTask('Add Receipt', this.props, data)
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  
  setTracking = (value) => {
    this.setState({ tracking: value })
  }
  setWeight = (value) => {
      this.setState({ weight: value })
  }
  setWidth = (value) => {
    this.setState({ width: value })
  }
  setHeight = (value) => {
      this.setState({ height: value })
  }
  setLength = (value) => {
    this.setState({ length: value })
  }
  setAmountPayment = (value) => {
      this.setState({ amountPayment: value })
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
            <Text style={styles.dataFormTitle}>Tracking</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Tracking number'}
            value={this.state.tracking}
            onChangeText={this.setTracking}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Weight</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Weight'}
            value={this.state.weight}
            onChangeText={this.setWeight}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Width</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Width'}
            value={this.state.width}
            onChangeText={this.setWidth}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Height</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Height'}
            value={this.state.height}
            onChangeText={this.setHeight}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Length</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Length'}
            value={this.state.length}
            onChangeText={this.setLength}
            autoCorrect={false}
          />
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Payment amount</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Received payment amount'}
            value={this.state.amountPayment}
            onChangeText={this.setAmountPayment}
            autoCorrect={false}
          />
        </View>
          <TouchableOpacity style={ !this.state.sent ? styles.button : styles.buttonDisabled } onPress={this.handleAddData}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.addData.message,
    loading: state.addData.loading,
    error: state.addData.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addData: addDataAction,
    clear: addDataClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTracking)
