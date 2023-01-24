import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, Linking } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './NewPackingStyles'
import images from '../../utils/image.utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createNewPackingAction from '../../api/newPacking'
import { newPackingClear } from '../../actions/newPacking'
import { appConfig } from '../../config';


class NewPacking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      counter: 0,
      timerID: null,
      sent: false
    }
    this.handleNewPacking = this.handleNewPacking.bind(this)
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


  handleNewPacking(body) {
    if (this.state.sent) return false

    this.props.clear()
    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })

    this.props.createNewPacking(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  sessionToken = () =>{
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }


  ruPackingList = () => {
    const body = {
      token: this.state.token,
      session_token: this.sessionToken(),
      which_admin: 'ru'
    }

    this.handleNewPacking(body)
  }


  engPackingList = () => {
    const body = {
      token: this.state.token,
      session_token: this.sessionToken(),
      which_admin: 'eng'
    }

    this.handleNewPacking(body)
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
          <TouchableOpacity style={styles.button} onPress={this.ruPackingList}>
            <Text style={styles.buttonText}>Ru Packing List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.engPackingList}>
            <Text style={styles.buttonText}>Eng Packing List</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    link: state.newPacking.link,
    loading: state.newPacking.loading,
    error: state.newPacking.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createNewPacking: createNewPackingAction,
    clear: newPackingClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPacking)
