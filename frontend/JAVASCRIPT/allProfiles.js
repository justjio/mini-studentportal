buildAllProfiles();


function buildAllProfiles() {
    //GET all data from backend
    const requestURL = 'http://localhost:8080/api/v1/student/getAllStudents';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        const answer = request.response;
        console.log(answer.studentData);
    };
};






//Function to create new DOM elements with classes
function newWithClass (el, attr, attrName) {
    let newElement = document.createElement(el);
        return newElement.setAttribute(attr, attrName);
};

//Function to create only new DOM element
function newE (el) {
    return document.createElement(el);
};

//Function to create a text node
function text (words) {
    return document.createTextNode(words);
};

//Function to append nodes
function append (parent, child) {
    return parent.appendChild(child);
};

