import React, { Component } from 'react';
import { Container, Form, Item, Input, Content, Button, Text } from 'native-base';
import axios from 'axios';

export default class ContactCreate extends Component {

  constructor(props) {
    super(props);
    this.item = null;
    if (props.navigation.state.params && props.navigation.state.params.item) {
      this.item = props.navigation.state.params.item;
    }
    this.state = {
      inputName: this.item && this.item.name ? this.item.name : '',
      inputAge: this.item && this.item.age ? this.item.age.toString() : ''
    }
  }

  handleSubmit = () => {
    if (this.item && this.item.name) {
      axios({
        method: 'put',
        url: `http://192.168.0.31:3000/contacts/${this.item.id}`,
        data: {
          name: this.state.inputName,
          age: this.state.inputAge
        }
      })
      .then(res => {
        this.props.navigation.goBack();
      })
    } else {
      axios({
        method: 'post',
        url: `http://192.168.0.31:3000/contacts`,
        data: {
          name: this.state.inputName,
          age: this.state.inputAge
        }
      })
      .then(res => {
        this.props.navigation.goBack();
      })
    }
    
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input autoFocus placeholder="Name" value={this.state.inputName} onChangeText={(value) => this.setState({inputName: value})}/>
            </Item>
            <Item last>
              <Input placeholder="Age" value={this.state.inputAge} onChangeText={(value) => this.setState({inputAge: value})} />
            </Item>
          </Form>
          <Button block style={{backgroundColor: '#000'}} onPress={this.handleSubmit}>
            <Text>{this.item && this.item.name ? 'Update' : 'Add'}</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}