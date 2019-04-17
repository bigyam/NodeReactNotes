import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
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
      var toDoList = res.map(r => r.title);
      this.setState({ toDoList });
    });
  };

  handleInputChange = (e) => {
    this.setState( { newToDo: e.target.value });
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
    this.setState({ currentToDo: e.target.value });
  }

  componentDidMount () {
    this.getToDoList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">To Do</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">To Do List</h1>
              <p className="lead">List of things to do!</p>
            </Jumbotron>

            <InputGroup>
              <Input
                placeholder="Enter New To Do Item..."
                value={ this.state.newToDo}
                onChange={this.handleInputChange}
              />
              <InputGroupAddon addontType="append">
                <Button color="primary" onClick={this.handleAddToDo}>Add To Do</Button>
              </InputGroupAddon>

            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5"> To Do List </h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCurrentToDo}>
                { this.state.toDoList.length === 0 && <option>No to do added yet.</option> }
                { this.state.toDoList.length > 0 && <option>Select a to to item.</option> }
                { this.state.toDoList.map((todo, i) => <option key={i}>{todo}</option>) }
              </Input>

            </FormGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
