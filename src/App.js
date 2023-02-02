import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import MainNavigator from './utils/navigation.util'


export default class App extends Component {

  componentDidMount() {
	}

  render () {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MainNavigator />
      </Provider>
    )
  }
}
