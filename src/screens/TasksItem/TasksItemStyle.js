import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 310,
    minHeight: 150,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#254680',
    marginVertical: 10,
    marginLeft: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  nameText: {
    marginLeft: 7,
    fontSize: 15,
    bottom: 4,
    fontWeight: 'bold',
    maxWidth: 200,
    maxHeight: 20,
    overflow: 'hidden',
  },
  textPhone: {
    fontSize: 15,
    bottom: 4,
    maxWidth: 200,
    maxHeight: 55,
    overflow: 'hidden',
  },
  row: {
    marginLeft: 7,
    flexDirection: 'row'
  },
  image: {
    marginRight: 12,
    marginBottom: 7,
    width: 20,
    height: 20
  },
  imageText: {
    marginRight: 12,
    marginBottom: 7,
    width: 20,
    height: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#254680',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 20
  },
  buttonGreen: {
    backgroundColor: 'green',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    margin: 20,
    borderRadius: 20
  }
})
