import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './ChooseListNameStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navToAfterChoose } from '../../utils'
import fetchTrackingListNamesAction from '../../api/fetchTrackingListNames'
import { fetchTrackingListNamesClear } from '../../actions/trackingListNames'
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'


class ChooseListName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.route.params.userName,
      token: props.route.params.token,
      userRole: props.route.params.userRole,
      serverName: props.route.params.serverName,
      listName: ''
    }

    this.userData = {
      name: this.props.route.params.userName,
      token: this.props.route.params.token,
      serverName: this.props.route.params.serverName,
      role: this.props.route.params.userRole
    }
    this.props.fetchTrackingListNames(this.userData)
  }


  setListName = (value) => {
      this.setState({ listName: value })
  }


  navToChooseMethod = () => {
    if (!this.state.listName) {
      Alert.alert('Error', 'List Name is required!')
      return false
    }
    navToAfterChoose('Choose Method', this.props, this.state)
  }


  render () {  

    const { trackingListNames,loadingFetchTrackingListNames } = this.props;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loadingFetchTrackingListNames}
          textContent={'Loading ...'}
        />
        <View style={styles.dataForm}>
          
          <SelectDropdown
            data={Object.values(trackingListNames)}
            onSelect={this.setListName}
            defaultButtonText={'Old List Names'}
            buttonStyle={styles.buttonSelect}
            renderDropdownIcon={isOpened => {
              return <FontAwesomeIcon 
                  icon={isOpened ? faCaretUp : faCaretDown} 
                  style={styles.imageSelect} 
                  size={18} 
              />
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />

          <View style={styles.dataFormField}>
            <Text style={styles.dataFormTitle}>New List Name</Text>
          </View>
          <TextInput
            textContentType={'none'}
            style={styles.textInputStyle}
            placeholder={'New List Name'}
            value={this.state.listName}
            onChangeText={this.setListName}
            autoCorrect={false}
          />
        </View>
          <TouchableOpacity style={ !this.state.sent ? styles.button : styles.buttonDisabled } onPress={this.navToChooseMethod}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    trackingListNames: state.fetchTrackingListNames.trackingListNames,
    loadingFetchTrackingListNames: state.fetchTrackingListNames.loading,
    errorFetchTrackingListNames: state.fetchTrackingListNames.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTrackingListNames: fetchTrackingListNamesAction,
    clearFetchTrackingListNames: fetchTrackingListNamesClear
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseListName)
