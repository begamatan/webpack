import _ from 'lodash'
import printMe from './print.js'
import './style.css'

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button')

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click It'
    btn.onclick = printMe

    element.appendChild(btn)

    return element;
}

let element = component()
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.appendChild(element);
    })
}