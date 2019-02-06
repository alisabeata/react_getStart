// selectors

// хорошие практикой является вынос функционала получения данных в отдельные функции
// функция селекторов — подготовка данных
// такой подход помогает избежать дублирования данных и повоторного пересчёта стейта
// обычно именются начиная с get...

const getDataType = state => state.editor.dataType;

// this
export default connect(
  (state) => ({
    dataType: state.editor.dataType,
  })
)(MyComponent);

// becomes this
export default connect(
  (state) => ({
    dataType: getDataType(state),
  })
)(MyComponent);


// seletors.js
export const getloadingState = state => state.loadingState;
export const getError = state => state.error;
export const getSeries = state => state.series;

// App.js
import {
  loadingState,
  getError,
  getSeries,
} from './seletors.js';
  
const mapStateToProps = state => ({
  loadingState: getloadingState(state),
  error: getError(state),
  series: getSeries(state),
});


// reselect
// https://github.com/reduxjs/reselect

yarn add reselect

import {createSelector} from 'reselect';

// вместо того, чтобы вытаскивать значения из стейта напрямую, реселект мемоизирует (запоминает) стейт и сравнивает изменения с сохр значением
// те подписывается на обновление определённого метса в стейте (state.series в примере)

// первая функция в аргументе достаёт данные (state => state.series)
export const getSeries = state => createSelector(state => state.series);

// вторая говорит что сделать с данными
export const getSeries = state => createSelector(
  state => state.series.entities,
  entities => entities.map(cur => ({name: cur.name, id: cur.id}))
);


// добавление зависимоти от нескольких значений стейта
export const getSeries = state => createSelector(
  [state => state.series.entities, state => getError(state)],
  ([entities, errors]) => entities.map(cur => ({name: cur.name, id: cur.id}))
);
