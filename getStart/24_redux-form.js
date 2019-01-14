// redux-form


yarn add redux-form

// https://redux-form.com
// библиотека для работы с формами

// https://github.com/final-form/react-final-form (для работы с формами без редакс)



// in reducer.js
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer
});


// in index.js
...
import {Provider} from 'react-redux';
import createStore from './store';
import {Field, reduxForm} from 'redux-form';

const SimpleForm = props => {
  const {handleSubmit, pristine, reset, submittig} = this.props;

  return (
    <form style={{padding: 20}} onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="name" />
        </div>
      </div>
      ...
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
    </form>
  );
};

const EnhancedForm = reduxForm({
  form: 'simple'
})(SimpleForm);

ReactDOM.render(<Provider store={store}><EnhancedForm /></Provider>, document.getElementById('root'));



// - Field элемент формы, name и component обязательные аттрибуты
<Field name="firstName" component="input" type="text" placeholder="name" />
  
// - кастомизация рендера Field
// в Field component можно передать функцию
// исп если нужно вывести/обработать ошибки
renderInput = field => {
  console.log(field)
  return (
    <div>
      <input {...{...field.input}} />
      {field.meta.error && <p>{field.meta.error}</p>}
    </div>
  );
};
...
<Field component={this.renderInput} />





// - валидация
// валидация с material-ui (доп слой для redux-form): https://redux-form.com/8.1.0/examples/material-ui/
                
// валидация по сабмиту
import {SubmissionError} from 'redux-form';

handleValidate = values => {
  console.log(values.main.firstName);
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

<form style={{padding: 20}} onSubmit={handleSubmit(this.handleValidate)}> ... 


// валидация по Field



                
// - FormSection
// позволяет создавать вложенность у объектов
                
import {FormSection} from 'redux-form';
              
                
<FormSection name="main">
  <div>
    <label>Name</label>
    <div>
      <Field name="firstName" component="input" type="text" placeholder="name" />
    </div>
  </div>
  ...
</FormSection>
                
// result: main.firstName = {...}
                
                
                
// - FieldArray
// позволяет делать/итеррировать вложенные формы
import {FieldArray} from 'redux-form';
                
renderColor = (member, index , field) => {}    

<FieldArray name="colors" component={this.renderColor} />
