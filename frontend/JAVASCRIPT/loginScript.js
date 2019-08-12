var header = document.querySelector('header');

//submitForm function is the function that will use XMLHttpRequest to interact with the backend.
function submitForm() {

    var params = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value
};

    console.log(params);
    //Send form data to backend and process
    var requestURL = 'http://localhost:8080/api/v1/student/studentLogin';
    var request = new XMLHttpRequest();
    request.open('POST', requestURL, true);
    request.responseType = 'json';
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(params));
    request.onload = function() {
        var answer = request.response;
        console.log(answer);
        getFeedback(answer);
    };

    console.log(request);

    function getFeedback(msg) {
        var newH1 = document.createElement('h1');
        newH1.innerHTML = 'Success Status: ';
        header.appendChild(newH1);

        var newP1 = document.createElement('p');
        newP1.textContent = msg.success;
        header.appendChild(newP1);

        var newH2 = document.createElement('h2');
        newH2.textContent = 'Server message: ';
        header.appendChild(newH2);

        var newP2 = document.createElement('p');
        newP2.textContent = msg.message;
        header.appendChild(newP2);
    };
}