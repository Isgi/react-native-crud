import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ContactList from './src/screens/ContactList';
import ContactCreate from './src/screens/ContactCreate';

const AppNavigator = createStackNavigator({
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      title: 'List'
    }
  },
  ContactCreate: {
    screen: ContactCreate,
    navigationOptions: {
      title: 'Create'
    }
  }
});

export default createAppContainer(AppNavigator);