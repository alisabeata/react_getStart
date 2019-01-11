import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {Provider} from 'react-redux';
import createStore from './store';
import {Field, reduxForm} from 'redux-form';

const store = createStore();

store.subscribe(() => {
  console.log(store.getState());
});

const SimpleForm = props => {
  const {handleSubmit, pristine, reset, submittig} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="name" />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="last name" />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="email" />
        </div>
      </div>
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
          <Field name="favoriteColor" component="select" />
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
    </form>
  );
};

const EnhancedForm = reduxForm({
  form: 'simple'
})(SimpleForm);

ReactDOM.render(<Provider store={store}><EnhancedForm /></Provider>, document.getElementById('root'));