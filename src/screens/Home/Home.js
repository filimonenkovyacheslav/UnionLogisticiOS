import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './HomeStyles'
import images from '../../utils/image.utils'
import { navToWithScan } from '../../utils'
import { appConfig } from '../../config';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      tracking: '',
      serverName: props.route.params.serverName
    }
  }

  navToTasks = () => {
    navToWithScan('Tasks', this.props, this.state)
  }

  navToNewPacking = () => {
    navToWithScan('New Packing List', this.props, this.state)
  }

  navToDuplicatePacking = () => {
    navToWithScan('Duplicate Packing List', this.props, this.state)
  }

  navToScanTracking = () => {
    navToWithScan('Scan Tracking to List', this.props, this.state)
  }

  navToSearchByChecklist = () => {
    navToWithScan('Search by checklist', this.props, this.state)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.route.params.token !== state.token) {
      return {
        userName: props.route.params.userName,
        token: props.route.params.token,
        userRole: props.route.params.userRole,
        tracking: '',
        serverName: props.route.params.serverName
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render () {

    return (
      <View style={styles.container}>
        <View style={styles.logoWarap}>
          <Image 
          source={(this.state.serverName === appConfig.API_URL_1)?images.logo:images.logoOE} 
          />
          <Text style={styles.textLogo}>Hello, {this.state.userName}!</Text>
          <TouchableOpacity style={styles.button} onPress={this.navToTasks}>
            <Text style={styles.buttonText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToNewPacking}>
            <Text style={styles.buttonText}>New Packing List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToDuplicatePacking}>
            <Text style={styles.buttonText}>Duplicate a Packing List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToScanTracking}>
            <Text style={styles.buttonText}>Scan Tracking to List</Text>
          </TouchableOpacity>     
          <TouchableOpacity style={styles.button} onPress={this.navToSearchByChecklist}>
            <Text style={styles.buttonText}>Search by checklist</Text>
          </TouchableOpacity>     
        </View>
      </View>
    )
  }
}

export default Home
