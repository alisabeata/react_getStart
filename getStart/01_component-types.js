// componet types

// - Statefull Component
// - Statefull PureComponent
// - Stateless функция

// (!) компонент — это всегда чистая функция

// - Statefull Component
class ComponentA extends Component {
 render() {
   return <p>Simple statefull component</p>;
 }
}

// - Statefull PureComponent
class ComponentB extends PureComponent {
 render() {
   return <p>Pure component</p>;
 }
}

// - Stateless функция
function StatelessComponent() {
  return <p>Stateless component</p>;
}
// or
const StatelessComponent = () => <p>Stateless component</p>;


// - синтаксис создания реакт компоненты напрямую
React.createClass({
 render: function() {
   return <div>Hello!</div>;
 }
});


/*
Отличие PureComponent от Component: PureComponent реализует поверхностное
сравнение в методе shouldComponentUpdate (сравнение чисел, булевых значенией 
и строк по значению, а массивов и объектов по ссылке)

те если у компоненты и/или её дочерних компонент не меняются стейт/пропсы, 
они не перерендериваются
*/
