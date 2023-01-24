import { StyleSheet } from 'react-native'
import { width, height } from '../../utils/width.util'

export default StyleSheet.create({
  container: {
    width: width[100],
    height: height[100],
    backgroundColor: '#fff'
  },
  logoWarap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 113
  },
  textLogo: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  languageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35
  },
  languageText: {
    fontSize: 10,
    marginVertical: 20
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55
  },
  buttonWhite: {
    width: 200,
    height: 43,
    borderRadius: 9,
    marginTop: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#254680',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWhiteText: {
    fontSize: 15,
    color: '#000'
  }
})
