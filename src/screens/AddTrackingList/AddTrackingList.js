import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './AddTrackingListStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addListAction from '../../api/addList'
import { addListClear } from '../../actions/addList'
import { navToAfterUpdate } from '../../utils'


class AddTrackingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      tracking: props.route.params.tracking,
      serverName: props.route.params.serverName,
      id: props.route.params.id,
      listName: '',
      counter: 0,
      timerID: null,
      sent: false
    }

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
      navToAfterUpdate('Home', this.props, this.state)
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

    this.setState({ counter: 0 })
    this.setState({ timerID: null })
    this.setState({ sent: true })

    if (!this.state.listName) {
      Alert.alert('Error', 'List Name is required!')
      this.props.clear()
      return false
    }

    const body = {
      token: this.state.token,
      tracking_list: this.state.tracking,
      serverName: this.state.serverName,
      list_name: this.state.listName
    }

    this.props.addList(body)
    this.setState({ timerID: setInterval(this.handleResponse, 1000) })
  }


  setListName = (value) => {
      this.setState({ listName: value })
  }


  render () {

    const { loading } = this.props;
    const { tracking } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading ...'}
        />
        <View style={styles.dataForm}>
          <ScrollView style={styles.scrollContainer}>
              <Text>Tracking List : </Text>
              {tracking.map(item => {
                return <Text>{item}</Text>;
              })}
            </ScrollView>
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>List Name</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'List Name'}
            value={this.state.listName}
            onChangeText={this.setListName}
            autoCorrect={false}
          />
        </View>
          <TouchableOpacity style={ !this.state.sent ? styles.button : styles.buttonDisabled } onPress={this.handleAddList}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.addList.message,
    loading: state.addList.loading,
    error: state.addList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addList: addListAction,
    clear: addListClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackingList)
