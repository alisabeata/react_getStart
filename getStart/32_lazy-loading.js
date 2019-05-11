// lazy-loading

// отложенная загрузка

// https://reactjs.org/docs/code-splitting.html
// https://github.com/smooth-code/loadable-components


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
