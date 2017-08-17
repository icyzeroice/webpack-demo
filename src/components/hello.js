import _ from 'lodash';
import printMe from './print';


export default function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console! (webpack-dev-server)';

    // printMe
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}
