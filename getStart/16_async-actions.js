// async-actions


const FETCH_EPISODS_REQUEST = 'FETCH_EPISODS_REQUEST';
const FETCH_EPISODS_SUCCESS = 'FETCH_EPISODS_SUCCESS';
const FETCH_EPISODS_FAILURE = 'FETCH_EPISODS_FAILURE';

// создание экшенов
const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODS_REQUEST
});
const fetchEpisodesSuccess = () => ({
  type: FETCH_EPISODS_SUCCESS
});
const fetchEpisodesFailure = () => ({
  type: FETCH_EPISODS_FAILURE
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
        if (isFetched) {
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

        return <div>{episodes.map(item => <div key={item.id}>{item.content}</div>)}</div>;
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
