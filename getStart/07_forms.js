// forms

// обработка нескольких инпутов
class App extends Component {
  state = {
    firstName: '',
    secondName: '',
    lastName: ''
  };

  handleChange = event => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <form>
          <input 
            name="firstName" 
            onChange={this.handleChange} 
            value={this.state.firstName} 
          />
          <input 
            name="secondName" 
            onChange={this.handleChange} 
            value={this.state.secondName} 
          />
          <input 
            name="lastName" 
            onChange={this.handleChange} 
            value={this.state.lastName} 
          />
        </form>
      </div>
    );
  }
}