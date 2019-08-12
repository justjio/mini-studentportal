function submitForm() {
    //Collect email and password so request.body can be populated in backend
    var params = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value};

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
        console.log(typeof answer.success);
        console.log(typeof answer.message);
        if(answer.success === 'true') {
            window.location.href = '../HTML/singleprofile.html';
            return;
        } else if(answer.success === 'false')  {
            var newList = document.getElementById('error');
            if(answer.message instanceof Array) {
                for(let i = 0; i < answer.message.length; i++) {
                    var listItem = document.createElement('li');
                    var text = document.createTextNode(answer.message[i]);
                    listItem.appendChild(text);
                    newList.appendChild(listItem);
                }
            } else {
                var oneItem = document.createElement('li');
                var oneText = document.createTextNode(answer.message);
                oneItem.appendChild(oneText);
                newList.appendChild(oneItem);
            };
            return;
        }
    };
}