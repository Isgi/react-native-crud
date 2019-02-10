import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Container, Content, List, ListItem, Text, Fab, Icon } from 'native-base';
import axios from 'axios';

export default class ContactList extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    axios({
      method: 'get',
      url: 'http://192.168.0.31:3000/contacts'
    })
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        })
      })
  }

  _keyExtractor = (item, index) => item.id.toString();

  handleDelete = (id) => () => {
    axios({
      method: 'delete',
      url: `http://192.168.0.31:3000/contacts/${id}`
    })
      .then(res => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderItem = ({ item, index }) => (
    <ListItem
      onLongPress={this.handleDelete(item.id)}
      onPress={() => this.props.navigation.navigate('ContactCreate', {item})}
    >
      <Text>{item.name}</Text>
      <Text> {item.age}</Text>
    </ListItem>
  )

  render() {
    return (
      <Container>
        <Content>
          <List>
            <FlatList
              data={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderItem}
              refreshing={this.state.isLoading}
              onRefresh={this.getData}
            />
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#000' }}
          onPress={() => this.props.navigation.navigate('ContactCreate')}>
          <Icon name="ios-add" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
