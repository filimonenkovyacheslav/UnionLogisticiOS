import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native'
import styles from './TasksItemStyle'
import images from '../../utils/image.utils'


class TasksItem extends Component {

  constructor (props) {
    super(props)
  }

  handleBoxDone = () => {
    this.props.handleBoxDone(this.props)
  }

  handleDownloadPL = () => {
    this.props.handleDownloadPL(this.props)
  }

  handleAddTracking = () => {
    this.props.handleAddTracking(this.props)
  }

  render () {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={styles.container}>
          <View style={{ width: 210, paddingTop: 10 }}>
            <View style={styles.row}>
              <Image source={images.status} style={ styles.image } />
              <Text style={styles.textPhone}>{this.props.item.status}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.imageText}>№</Text>
              <Text style={styles.textPhone}>{this.props.item.packing_num}</Text>
            </View>
            <View style={styles.row}>
              <Image source={images.avatar} style={ styles.image } />
              <Text style={styles.nameText}>{this.props.item.shipper_name}</Text>
            </View>
            <View style={styles.row}>
              <Image source={images.phone} style={ styles.image } />
              <Text style={styles.textPhone}>{this.props.item.standard_phone}</Text>
            </View>
            <View style={styles.row}>
              <Image source={images.house} style={ styles.image } />
              <Text style={styles.textPhone}>{this.props.item.shipper_city+', '+this.props.item.shipper_address}</Text>
            </View>
          </View>
          <View>
          {
            (this.props.item.status === 'Box' || this.props.item.status === 'Коробка') ?
            (
              <TouchableOpacity onPress={this.handleBoxDone}>
                <Text style={styles.buttonGreen}>DONE</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity onPress={this.handleAddTracking}>
                  <Text style={styles.button}> +</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleDownloadPL}>
                  <Text style={styles.button}>PL</Text>
                </TouchableOpacity>
              </View>
            )
          }
          </View>
        </View>
      </View>

    )
  }
}

export default TasksItem
