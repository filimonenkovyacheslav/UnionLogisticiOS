export const navTo = (screen, props) => {
  const { navigation } = props
  navigation.navigate(screen)
  if (navigation && navigation.closeDrawer) {
    navigation.closeDrawer()
  }
}

export const navToWithParams = (screen, props, data) => {
  const { navigation } = props
  navigation.navigate('Home page', {
   screen: screen,
   params: {
     userName: props.userName,
     token: props.token,
     userRole: props.userRole,
     serverName: data.serverName
   }
  })
  if (navigation && navigation.closeDrawer) {
    navigation.closeDrawer()
  }
}

export const navToWithScan = (screen, props, data) => {
  const { navigation } = props
  navigation.navigate('Home page', {
   screen: screen,
   params: {
     userName: data.userName,
     token: data.token,
     userRole: data.userRole,
     tracking: data.tracking,
     serverName: data.serverName,
     id: data.id
   }
  })
  if (navigation && navigation.closeDrawer) {
    navigation.closeDrawer()
  }
}

export const navToAfterUpdate = (screen, props, data) => {
  const { navigation } = props
  navigation.navigate('Home page', {
   screen: screen,
   params: {
     userName: data.userName,
     token: data.token,
     userRole: data.userRole,
     serverName: data.serverName
   }
  })
  if (navigation && navigation.closeDrawer) {
    navigation.closeDrawer()
  }
}
