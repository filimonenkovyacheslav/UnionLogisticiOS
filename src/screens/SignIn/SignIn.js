import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, TextInput, Alert } from 'react-native'
import styles from './SignInStyles'
import images from '../../utils/image.utils'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import signInAction from '../../api/signIn'
import { signInClear } from '../../actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navToWithParams, navTo } from '../../utils'


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      counter: 0,
      timerID: null,
      sent: false
    }
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }


  handleResponse(){
    this.setState({ counter: this.state.counter + 1 })
    if (this.props.token && this.state.counter < 10) {
      const roleArr = ['admin','courier','agent']
      if(roleArr.indexOf(this.props.userRole) !== -1){
        clearInterval(this.state.timerID)
        this.setState({ sent: false })
        this.setUser([this.props.userName,this.props.token,this.props.userRole])
        navToWithParams('Home', this.props)
      }
      else {
        clearInterval(this.state.timerID)
        this.setState({ sent: false })
        Alert.alert('Error', 'You do not have access!')
        this.props.clear()
        navTo('Welcome to Union Logistics', this.props)
      }
    }
    else if (this.props.error && this.state.counter < 10) {
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      Alert.alert('Error', this.props.error.message)
      this.props.clear()
      navTo('Welcome to Union Logistics', this.props)
    }
    else if (this.state.counter === 10){
      clearInterval(this.state.timerID)
      this.setState({ sent: false })
      Alert.alert('Error', 'Network error!')
      this.props.clear()
      navTo('Welcome to Union Logistics', this.props)
    }
  }


  handleSignIn() {
    if (this.state.sent) return false

    this.props.clear()
    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })

    if (!this.state.email || !this.state.password) {
      Alert.alert('Error', 'Email and password are required!')
      this.props.clear()
      this.setState({ sent: false })
      return false
    }

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.signIn(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  setEmail = (value) => {
    this.setState({ email: value })
  }
  setPassword = (value) => {
    this.setState({ password: value })
  }

  setUser = async (value) => {
  try {
       await AsyncStorage.setItem('userNameUL', value[0])
       await AsyncStorage.setItem('tokenUL', value[1])
       await AsyncStorage.setItem('userRoleUL', value[2])
    } catch(e) {
    }
  }


  render () {

    const { loading } = this.props;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Signing in ...'}
        />
        <View style={styles.wrapper}>
          <View style={styles.imageContainer}>
            <Image source={images.logo} style={styles.logo} />
          </View>
        </View>
          <View style={styles.SignInForm}>
            <View style={styles.SignInFormEmail}>
              <Text style={styles.SignInFormEmailTitle}>Email</Text>
              <FontAwesomeIcon icon={faUserAlt} style={styles.imageInput} size={10} />
            </View>
              <TextInput
                textContentType={'username'}
                value={this.state.email}
                onChangeText={this.setEmail}
                style={styles.textInputStyle}
                autoCorrect={false}
              />
            <View style={styles.SignInFormPassword}>
              <Text style={styles.SignInFormEmailTitle}>Password</Text>
              <FontAwesomeIcon icon={faLock} style={styles.imageInput} size={10} />
            </View>
            <TextInput
                textContentType={'password'}
                secureTextEntry
                value={this.state.password}
                onChangeText={this.setPassword}
                style={styles.textInputStyle}
                autoCorrect={false}
              />
          </View>
          <TouchableOpacity style={ !this.state.sent ? styles.button : styles.buttonDisabled } onPress={this.handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    userRole: state.auth.userRole,
    loading: state.auth.loading,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn: signInAction,
    clear: signInClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
