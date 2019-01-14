import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {Provider} from 'react-redux';
import createStore from './store';
import {FormSection, FieldArray, SubmissionError, Field, reduxForm} from 'redux-form';

const store = createStore();

store.subscribe(() => {
  //console.log(store.getState());
});

class SimpleForm extends PureComponent {
  state = {}

  renderColor = (member, index, fields) => {
    console.log(member, index, fields)
    return (<div />);
    // return (<div><button>add color</button>
    //     {fields.map(field => <p>{field}</p>)}
    //   </div>);
  }

  renderInput = field => {
    console.log(field)
    return (
      <div>
        <input {...{...field.input}} />
        {field.meta.error && <p>{field.meta.error}</p>}
      </div>
    );
  };

  handleValidate = values => {
    console.log(values);
    const errors = {main: {}};
    if (!values.main || !values.main.firstName) {
      errors.main.firstName = 'Required';
    }
    if (!values.main || !values.main.lastName) {
      errors.main.lastName = 'Required';
    }
    if (!values.main || !values.main.email) {
      errors.main.email = 'Required';
    }

    if (Object.keys(errors).length > 1 || Object.keys(errors.main).length > 0) {
      throw new SubmissionError(errors);
    }

    return errors;
  };

  render() {
    const {handleSubmit, pristine, reset, submittig} = this.props;

    return (
      <form style={{padding: 20}} onSubmit={handleSubmit(this.handleValidate)}>
        <FormSection name="main">
          <div>
            <label>Name</label>
            <div>
              {/*<Field name="firstName" component="input" type="text" placeholder="name" />*/}
              <Field name="firstName" component={this.renderInput} type="text" placeholder="name" />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div>
              <Field name="lastName" component={this.renderInput} type="text" placeholder="last name" />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <Field name="email" component={this.renderInput} type="email" placeholder="email" />
            </div>
          </div>
        </FormSection>
        <div>
          <label>Gender</label>
          <div>
            <label>
              <Field name="gender" component="input" type="radio" value="female" /> female
            </label>
            <label>
              <Field name="gender" component="input" type="radio" value="male" /> male
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option />
              <option value="ff0000">red</option>
              <option value="00ff00">green</option>
              <option value="0000ff">blue</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Employed</label>
          <div>
            <Field name="employed" component="input" type="checkbox"  />
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submittig}>submit</button>
          <button type="button" disabled={pristine || submittig} onClick={reset}>clear</button>
        </div>

        {/*<FieldArray name="colors" component={this.renderColor} />*/}
      </form>
    );
  };
};

const EnhancedForm = reduxForm({
  form: 'simple'
})(SimpleForm);

ReactDOM.render(<Provider store={store}><EnhancedForm /></Provider>, document.getElementById('root'));