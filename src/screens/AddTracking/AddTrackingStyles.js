import { StyleSheet } from 'react-native'
import { width, height } from '../../utils/width.util'

export default StyleSheet.create({
  container: {
    width: width[100],
    height: height[100],
    backgroundColor: '#fff'
  },
  button: {
    width: 200,
    height: 45,
    backgroundColor: '#254680',
    alignSelf: 'center',
    borderRadius: 9,
    top: 50,
    margin: 10
  },
  buttonDisabled: {
    width: 200,
    height: 45,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 9,
    top: 50,
    margin: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
    top: 10
  },
  dataForm: {
    width: 286,
    height: 366,
    borderWidth: 1,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#fff',
    top: 20
  },
  dataFormFirstField: {
    flexDirection: 'row',
    marginTop: 25,
    marginRight: 30,
    justifyContent: 'space-between'
  },
  dataFormField: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 30,
    justifyContent: 'space-between'
  },
  dataFormTitle: {
    marginHorizontal: 28,
    color: '#BABABA',
    fontSize: 10
  },
  textInputStyle: {
    width: '80%',
    height: 30,
    alignSelf: 'center',
    fontSize: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#BABABA',
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})
