import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, Alert, Linking, TextInput } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './TasksStyles'
import images from '../../utils/image.utils'
import TasksItem from '../TasksItem/TasksItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchTasksAction from '../../api/fetchTasks'
import { fetchTasksClear } from '../../actions/tasks'
import updateTaskAction from '../../api/updateTask'
import { updateTaskClear } from '../../actions/task'
import { navToAfterUpdate, navToWithScan } from '../../utils'
import { appConfig } from '../../config';


class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: props.route.params.userName,
        token: props.route.params.token,
        userRole: props.route.params.userRole,
        tracking: props.route.params.tracking,
        phoneNumber: ''
    };
    this.renderTasks = this.renderTasks.bind(this)
    this.handleBoxDone = this.handleBoxDone.bind(this)
    this.handleDownloadPL = this.handleDownloadPL.bind(this)
    this.handleAddTracking = this.handleAddTracking.bind(this)
    this.searchByPhoneNumber = this.searchByPhoneNumber.bind(this)

    this.userData = {
      name: this.props.route.params.userName,
      token: this.props.route.params.token,
      role: this.props.route.params.userRole
    }
    this.props.fetchTasks(this.userData)
  }


  updateTasksScreen = () =>{
    this.props.fetchTasks(this.userData)
  }


  renderTasks(){
    return this.searchByPhoneNumber().map(task => {
      return(
        <TasksItem
          key={task.id}
          item={task}
          user={this.userData}
          handleBoxDone={this.handleBoxDone}
          handleDownloadPL={this.handleDownloadPL}
          handleAddTracking={this.handleAddTracking}
        />
      )

    })
  }


  handleDownloadPL(params){
    if (!params.item.packing_num) {
      Alert.alert('Error', 'There is nothing!')
      return false
    }
    else{
      const url = appConfig.API_URL + '/download-pdf/' + params.item.packing_num + '/1';
      const supported = Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }
  }


  handleBoxDone(params){
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to update this order?",
      [
        {
          text: "Yes",
          onPress: () => {
            const data = {
              id: params.item.id,
              token: params.user.token
            }
            this.props.updateTask(data);

            setTimeout(() => {
              const { loadingUpdate, errorUpdate } = this.props;
              if (!errorUpdate) {
                const userData = {
                  userName: this.state.userName,
                  token: this.state.token,
                  userRole: this.state.userRole
                }
                Alert.alert('Success', 'Courier task updated successfully!')
                navToAfterUpdate('Home', this.props, userData)
              }
              else {
                this.props.clearUpdate();
              }
            }, 1000)
          },
        },
        {
          text: "No",
        },
      ]
    );
  }


  handleAddTracking(params){
    if (!params.item.packing_num) return Alert.alert('Error', 'You can\'t add tracking without packing list!')
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to add this tracking?",
      [
        {
          text: "Yes",
          onPress: () => {
            const data = {
              id: params.item.id,
              token: params.user.token,
              userName: this.state.userName,
              tracking: this.state.tracking,
              userRole: this.state.userRole
            }
            navToWithScan('Scan', this.props, data)
          },
        },
        {
          text: "No",
        },
      ]
    );
  }


  setPhoneNumber = (value) => {
    this.setState({ phoneNumber: value })
  }


  searchByPhoneNumber(){
    let filtered = this.props.tasks
    if (this.state.phoneNumber.length === 4 ) {
      filtered = filtered.filter(task => {
        return task.standard_phone.slice(-4) === this.state.phoneNumber;
      })
    }
    else if (this.state.phoneNumber.length > 4 ){
      filtered = filtered.filter(task => {
        return task.standard_phone.indexOf(this.state.phoneNumber) !== -1;
      })
    }

    return filtered
  }


  render () {

    const { loading, error, loadingUpdate, errorUpdate } = this.props

    if (this.state) {
      if (error && !this.state.errorShown) {
        Alert.alert('Error', error.message)
        this.props.clear()
      }

      if (errorUpdate && !this.state.errorShown) {
        Alert.alert('Error', errorUpdate.message)
        this.props.clearUpdate()
      }
    }

    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading ...'}
        />
        <View>
          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>Search by phone</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'Phone Number'}
            value={this.state.phoneNumber}
            onChangeText={this.setPhoneNumber}
            autoCorrect={false}
          />
        </View>
        <View>
          {this.renderTasks()}
        </View>
      </ScrollView>
    )
  }
}


function mapStateToProps (state) {
  return {
    tasks: state.fetchTasks.tasks,
    loading: state.fetchTasks.loading,
    error: state.fetchTasks.error,
    loadingUpdate: state.updateTask.loading,
    errorUpdate: state.updateTask.error,
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTasks: fetchTasksAction,
    clear: fetchTasksClear,
    updateTask: updateTaskAction,
    clearUpdate: updateTaskClear,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
