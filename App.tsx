import React from 'react';
import SignIn from './src/components/SignIn';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/rootReducer';
import Home from './src/components/Home';
import Colors from './src/constants/colors';
import ChatRoom from './src/components/ChatRoom';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Home',
        headerBackTitle: '',
      }),
    },
    ChatRoom: {
      screen: ChatRoom,
      navigationOptions: () => ({
        title: 'John Smith',
        headerBackTitle: '',
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.turquoise,
      },
      headerTintColor: Colors.white,
    },
  },
);

const Root = createSwitchNavigator(
  {
    SignIn: SignIn,
    Home: HomeStack,
  },
  {
    initialRouteName: 'SignIn',
  },
);

const Navigation = createAppContainer(Root);
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
