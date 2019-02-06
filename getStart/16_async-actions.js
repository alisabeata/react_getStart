// async-actions

// async-actions доп логика в миддлварах, для отправки сетевых запросов


// GET_SOMETHING_REQUEST
// isLoading: true

// GET_SOMETHING_SUCCESS
// isLoading: false
// data: from fetch

// GET_SOMETHING_FAILURE
// isLoading: false
// error: from fetch



// actions.js
export const GET_SERIES_REQUEST = 'GET_SERIES_REQUEST';
export const GET_SERIES_SUCCESS = 'GET_SERIES_SUCCESS';
export const GET_SERIES_FAILURE = 'GET_SERIES_FAILURE';

export const getSeriesRequest = () => ({
  type: GET_SERIES_REQUEST,
});


// App.js
class App extends PureComponent {
  componentDidMount() {
    // запрос данных
    this.props.getSeriesRequest();
  }
  
  render() {
    const {series, isLoading, error} = this.props;
    
    if (isLoading) return <p>Загрузка данных</p>;
    if (error) return <p>Ошибка</p>;
    
    return (
      <div>
        {series.map(item => (
          <div key={item.id}>
            <img src={item.img} alt={item.name} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  error: state.error,
  series: state.series,
});


// reducer.js
import {
  GET_SERIES_REQUEST,
  GET_SERIES_SUCCESS,
  GET_SERIES_FAILURE
} from './actions';


// (!) флаги можно передавать в объекте export const LOADING_STATE = {idle: 'IDLE', loading: 'LOADING', success: 'SUCCESS', failure: 'FAILURE'}
/*
const initialState = {
  series: [],
  loadingState: LOADING_STATE.idle,
  error: null,
};
...
case GET_SERIES_REQUEST:
  return {...state, isLoading: LOADING_STATE.loading};
case GET_SERIES_SUCCESS:
  return {
    ...state,
    series: action.payload,
    loadingState: LOADING_STATE.success,
  };
case GET_SERIES_FAILURE:
  return {
    ...state,
    error: action.payload,
    loadingState: LOADING_STATE.failure,
  };
*/

const initialState = {
  series: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERIES_REQUEST:
      return {...state, isLoading: true};
      
    case GET_SERIES_SUCCESS:
      return {
        ...state,
        series: action.payload,
        isLoading: false,
      };
      
    case GET_SERIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      
    default:
      return state;
  }
};


// store.js
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import tvmazeFetchMiddleware from './middlewares'

const createAppStore = () => {
  const store = createStore(
      rootReducer, 
      compose(
        applyMiddleware(tvmazeFetchMiddleware), 
        window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      )
  );
  
  return store;
};

export default createAppStore;
    

// middlewares.js
import {
  GET_SERIES_REQUEST,
  getSeriesSuccess,
  getSeriesFailure
} from '';

export const tvmazeFetchMiddleware = store => next => action => {
  if (action.type === GET_SERIES_REQUEST) {
    fetch('http://api.tvmaze.com/shows/180/episodes', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(series => {
        store.dispatch(getSeriesSuccess(series, series.length));
      })
      .catch(error => {
        store.dispatch(getSeriesFailure(error));
      });
  }
  
  // next(action) передаёт экшн следующему редьюсеру
  return next(action);
};



// (old)

const FETCH_EPISODS_REQUEST = 'FETCH_EPISODS_REQUEST';
const FETCH_EPISODS_SUCCESS = 'FETCH_EPISODS_SUCCESS';
const FETCH_EPISODS_FAILURE = 'FETCH_EPISODS_FAILURE';

// создание экшенов
const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODS_REQUEST
});
const fetchEpisodesSuccess = payload => ({
  type: FETCH_EPISODS_SUCCESS,
  payload
});
const fetchEpisodesFailure = error => ({
  type: FETCH_EPISODS_FAILURE,
  error
});

// передача экшена
class App extends Component {
  componentDidMount() {
    fetchEpisodesRequest();
  }

  render() { 
    return <div></div>;
  }
}


// in reducers.js
    const initState = {
      episodes: [],
      error: null,
      isFetching: false,
      isFetched: false
    };

    export default (state = initState, action) => {
      switch(action.type) {
        // начался сетевой запрос
        case FETCH_EPISODS_REQUEST:
          return {...state, isFetching: true, isFetched: false};

        // запрос закончился, скачались данные, передались в action.payload
        case FETCH_EPISODS_SUCCESS:
          return {...state, isFetching: false, isFetched: true, episodes: action.payload};

        // в случае ошибки
        case FETCH_EPISODS_FAILURE:
          return {...state, isFetching: false, isFetched: true, error: action.error}

        default:
          return state;
      }
    };


    export const getEpisodes = state => state.episodes;
    export const getIsFetching = state => state.isFetching;
    export const getIsFetched = state => state.isFetched;
    export const getError = state => state.error;

// in index.js
    import {
      getEpisodes, 
      getIsFetching, 
      getIsFetched, 
      getError} from './reducers';
    
    ...
    class App extends Component {
      componentDidMount() {
        const {isFetched} = this.props;
        if (!isFetched) {
          this.props.fetchEpisodesRequest();
        }
      }

      render() { 
        const {episodes, error, isFetching} = this.props;

        if (isFetching) {
          return <div>Loading...</div>;
        }

        if (error !== null) {
          return <div>Error: {error}</div>;
        }

        return <div>{episodes.map(item => <div key={item.id}>{item.summary}</div>)}</div>;
      }
    }

    const mapStateToProps = state => ({
      episodes: getEpisodes(state), 
      error: getError(state),
      isFetching: getIsFetching(state), 
      isFetched: getIsFetched(state)
    });

    const mapDispatchToProps = {fetchEpisodesRequest};

    const EnchancedApp = connect(mapStateToProps, mapDispatchToProps)(App);

    ReactDOM.render(
      <Provider store={store}>
        <EnchancedApp />
      </Provider>,
      document.getElementById('root')
    );


// in store.js
    const middleware = store => next => action => {
      if (action.type === FETCH_EPISODS_REQUEST) {
        fetch('http://api.tvmaze.com/shows/180/episodes', {
          method: 'GET',
          mode: 'cors'
        })
        .then(response => response.json())
        .then(episodes => {
          store.dispatch(
            fetchEpisodesSuccess(episodes)
          );
        })
        .catch(error => {
          store.dispatch(
            fetchEpisodesFailure(error)
          );
        });
      }
      return next(action);
    };

    export default () =>
      createStore(
          rootReducer, 
          compose(
            applyMiddleware(middleware), 
            window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
          )
      );
