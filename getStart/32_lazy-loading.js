// lazy-loading

// отложенная загрузка

// https://reactjs.org/docs/code-splitting.html
// https://github.com/smooth-code/loadable-components

// нативная реализация, на текущий момент не поддерж северсайд рендеринг
import React, {Component, lazy, Suspense} from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}


// - react-loadable
// https://github.com/jamiebuilds/react-loadable
import Loadable from 'react-loadable';
import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
