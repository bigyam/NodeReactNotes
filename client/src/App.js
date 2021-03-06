import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  InputGroup,
  Input,
  InputGroupAddon,
  ButtonGroup,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
  Col
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    currentToDo: null,
    toDoList: [],
    newToDo: ''
    };
  }

  getToDoList = () => {
    fetch('/api/todo')
    .then(res => res.json())
    .then(res => {
      var toDoList = res; //map(r => r.title); //change this from title to whole object
      this.setState({ toDoList });
    });
  };

  handleInputChange = (e) => {
    this.setState( { newToDo: e.target.value });
  };

  handleKeyPress = (target) => {
    if (target.charCode === 13) {
      this.handleAddToDo();
    }
  };

  handleAddToDo = () => {
    fetch('/api/todo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toDo: this.state.newToDo })
    })
    .then(res => res.json())
    .then(res => {
      this.getToDoList();
      this.setState({ newToDo: '' });
    });
  };

  handleChangeCurrentToDo = (e) => {
    this.getToDoList();
  };

  renderToDoList = () => {
    return (this.state.toDoList.map((todoItem) => {
      return (
        <Toast key={todoItem.id} className="toast">
          <ToastHeader>{todoItem.completed === false && 'Incomplete'}
                       {todoItem.completed === true && 'Completed'}
          </ToastHeader>
          <ToastBody>
            {todoItem.title} <br />
          <ButtonGroup>
            <Button color="primary" size="sm" onClick={e => this.handleComplete(todoItem.id, todoItem.completed)}>Toggle Complete</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="primary" size="sm" onClick={e => this.handleRemove(todoItem.id)}>Remove</Button>
          </ButtonGroup>
          </ToastBody>
        </Toast>
      )
    }))
  };

  handleComplete = (id, isComplete) => {
    if (isComplete) {
      isComplete = false;
    }else{
      isComplete = true;
    }
    fetch('/api/todo', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toDoId: id, completedBool: isComplete })
    })
    .then(res => res.json())
    .then(res => {
      this.getToDoList();
    });
  };

  handleRemove = (id) => {
    fetch('/api/todo', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toDoId: id })
    })
    .then(res => res.json())
    .then(res => {
      this.getToDoList();
    });
  };

  componentDidMount () {
    this.getToDoList();
  };

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">To Do</NavbarBrand>
        </Navbar>
        
        <Row>
          <Col>
              <h1 className="display-3">To Do List</h1>
              <p className="lead">List of things to do!</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup size="sm">
              <Input
                placeholder="Enter New To Do Item..."
                value={ this.state.newToDo}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.handleAddToDo}>Add To Do</Button>
              </InputGroupAddon>
            </InputGroup>
            <br />
          </Col>
        </Row>
        <Row>
          <Col>
            {this.renderToDoList()}
          </Col>
</Row>
        <Row>
          <Col>
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
