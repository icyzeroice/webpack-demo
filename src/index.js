import hello from './components/hello'

function hello () {
  let element = document.createElement('div');
  let btn = document.createElement('button');

  element.innerHTML = 'test';

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console! (webpack-dev-server)';

  // printMe
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

function printMe() {
  console.log('I get called from print.js');
}

/* console.log(hello); */
console.log('index');
document.body.appendChild(hello());
