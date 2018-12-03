// portals

// доступны в api react 16

// модальные компоненты, которые рендерятся отдельно от родительского компонента (прим модальные окна, тултипы, расп перед закр body), с точки зрения реакта являются child, с точки зрения DOM явл отдельными элементами

// если нет элемента для вставки, то его можно сгенерировать в constructor

class ModalWindow extends Component {
  render() { 
    const {children} = this.props;
    return ReactDOM.createPortal(children, document.getElementById('modals'));
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <span>Hello</span>
        <ModalWindow>modal window</ModalWindow>
      </div>
    );
  }
}

// >>> <div id="root">...</div><div id="modals">modal window</div>


// with condition
return (
  <div>
    <span>Hello</span>
    {true ? <ModalWindow>modal window</ModalWindow> : null}
  </div>
);

return (
  <div>
    <span>Hello</span>
    {true ? (
      <ModalWindow>
        <div>modal window</div>
      </ModalWindow>
    ) : null}
  </div>
);


// события внутри портала можно отловить на parent
class App extends Component {
  handleClick = event => {
    console.log(event.target.tagName); // >>> BUTTON
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <span>Hello</span>
        {true ? (
          <ModalWindow>
            <span>modal window</span>
            <button>btn</button>
          </ModalWindow>
        ) : null}
      </div>
    );
  }
}


// toggle
class App extends Component {
  state = {
    isModalPresent: false
  };
  
  handleClickShowModal = () => {
    this.setState({isModalPresent: !this.state.isModalPresent});
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClickShowModal}>toggle</button>
        {this.state.isModalPresent ? (
          <ModalWindow>
            <span>modal window</span>
          </ModalWindow>
        ) : null}
      </div>
    );
  }
}
