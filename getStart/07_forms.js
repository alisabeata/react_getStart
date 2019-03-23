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


// - redux form
// https://github.com/erikras/redux-form/
// минус - создаёт много экшенов

// (!) необходимо создать редьюсер from с именами формы
import {Field, reduxForm} from 'redux-form';

const ReduxForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;
  
  return (
    <form onSubmit={handleSubmit}>
      <Field 
        name="firstName"
        component="input"
        type="text"
        placeholder="First Name"
      />
    </form>
  );
}

export default reduxForm({
  form: 'simple',
  onSubmit: (values) => {
    console.log(values)
  }
})(ReduxForm);

// валидация
<Field
  validate={{val => val && val.length < 10 ? 'error' : undefined}}
/>


// - react final form
// https://github.com/final-form/react-final-form
import {Form, Field} from 'redux-form';

const Input = ({input, meta, label}) => {
  return (
    <>
      <p>{label}</p>
      <input {...input} />
      {meta.error
        && meta.visited
        && meta.sctive
        && (
          <pre style={{color: 'red'}}>{meta.error}</pre>
        )}
    </>
  );
};

const formValidation = values => {
  const errors = {};
  const user = {};
  
  if (!values.user) {
    user.first_name = 'Required';
    user.last_name = 'Required';
  } else if (!values.user.first_name) {
    user.first_name = 'Required';
  } else if (!values.user.last_name) {
    user.last_name = 'Required';
  }
  
  if (values.user) {
    if (!user.first_name && values.user.first_name.length < 5) {
      user.first_name = 'First name must be more than 5 symbols';
    }

    if (!user.last_name && values.user.last_name.length < 5) {
      user.last_name = 'Last name must be more than 5 symbols';
    }
  }
  
  if (Object.keys(user).length > 0) {
    errors.user = user;
    return errors;
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!values.user.email || values.user.email !== 'test@test.com') {
          resolve({user: {email: 'not uniq email'}});
        } else {
          resolve({});
        }
      }, 3000);
    });
  }
};

export class ReactFinalForm extends PureComponent {
  constructor(props) {
    super(props);
    
    let formValues;
    
    try {
      formValues = Json.parse(localStorage.getItem('form'));
    } catch (err) {
      formValues = {};
    }
    
    this.formValues = {user: {}};
    this.state = {
      initialValues: formValues,
    };
  }
  
  handleSubmit = values => {
    console.log('handleSubmit');
    console.log(values);
  };

  saveFormValues = form => {
    this._formValues.user = form.values.user;
  };

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(
        'form',
        JSON.sringify(this._formValues),
      );
    });
  }
  
  render() {
    const {initialValues} = this.state;
  
    return (
      <Form 
        initialValus={initialValues}
        debug={this.saveFormValues}
        onSubmit={this.handleSubmit}
        validate={formValidation} // валидация всей формы (при изм любого поля)
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Field 
              name="firstName"
              component={Input}
              label="First Name"
            />
            // (!) форматирование ввода с regExp (format, parse)
            // ввод: 0000 0000 0000
            // вывод: 000000000000
            <Field 
              name="creditCard"
              // инлайн валидация с validate
              validate={value => value && value.length < 10 ? 'error': undefined}
              format={value => 
                value 
                  ? value.replace(/(\d{4})/g, '$1 ')
                  : ''
              }
              parse={valueStr => valueStr.replace(/\s+/g, '').slice(0, 16)}
              label="Credit Card"
              component={Input}
            />
          </form>
        )}
      />
    );
  }
}


// - fromik
// https://github.com/jaredpalmer/formik
import {withFormik, Formik as FormikRenderProps} from 'formik';

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <input 
      type="email"
      name="email" 
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {touched.email && errors.email && <p>{errors.email}</p>}
  </form>
);

const MyForm = withFormik({
  mapPropsToValues: props => ({email: '', password: ''}),
  validate: (values, props) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'invalid email address';
    }
    console.log(errors);
    return errors;
  },
  handleSubmit: (values, {props, setSubmitting, setErrors}) => {
    console.log(vvalues);
  }
})(InnerForm);


const Formik = () => (
  <div>
    <h1>My Form</h1>
    <MyForm />
  </div>
);

exort default Formik;
