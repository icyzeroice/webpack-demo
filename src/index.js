import _ from 'lodash';
import printMe from './components/print.js';


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console! (webpack-dev-server-s)';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
