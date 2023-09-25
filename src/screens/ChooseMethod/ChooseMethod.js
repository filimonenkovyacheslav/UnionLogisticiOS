import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './ChooseMethodStyles'
import images from '../../utils/image.utils'
import { navToAfterChoose } from '../../utils'


class ChooseMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      serverName: props.route.params.serverName,
      listName: props.route.params.listName
    }
  }

  navToScan = () => {
    navToAfterChoose('Scan Tracking to List', this.props, this.state)
  }

  navToInput = () => {
    navToAfterChoose('Add Tracking to List', this.props, this.state)
  }

  navToHome = () => {
    navToAfterChoose('Home', this.props, this.state)
  }


  render () {
console.log(this.state.listName)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.logoWarap}>
          <TouchableOpacity style={styles.button} onPress={this.navToScan}>
            <Text style={styles.buttonText}>Scan a tracking number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToInput}>
            <Text style={styles.buttonText}>Input a tracking number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToHome}>
            <Text style={styles.buttonText}>Complete the List</Text>
          </TouchableOpacity>   
        </View>
      </ScrollView>
    )
  }
}

export default ChooseMethod
