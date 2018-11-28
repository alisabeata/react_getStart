// componets (three ways)

// - Расширить класс Component
// - Расширить класс PureComponent
// - Написать функцию возвращающую jsx


// - Расширить класс Component
class HelloWorld extends React.Component {
 render() {
   return <div>Hello!</div>;
 }
}

// - Расширить класс PureComponent
class HelloWorld extends React.PureComponent {
 render() {
   return <div>Hello!</div>;
 }
}

// - Написать функцию возвращающую jsx
function HelloWorld () {
  return <div>Hello!</div>;
}


// - old school (don't use)
React.createClass({
 render: function() {
   return <div>Hello!</div>;
 }
});


// Единственное отличие PureComponent от Component заключается в том, что PureComponent реализует поверхностное сравнение (сравнение чисел, булевых значенией и строк по значению, а массивов и объектов по ссылке) в методе shouldComponentUpdate. 
