function registerStudent() {
    //Collect student data to request.body
    const params = {
        firstname: document.querySelector('#firstname').value,
        surname: document.querySelector('#surname').value,
        date_of_birth: document.querySelector('#birthday').value,
        sex: [
            document.querySelector('#male').value,
            document.querySelector('#female').value
        ],
        hobby1: document.querySelector('#hobby1').value,
        hobby2: document.querySelector('#hobby2').value,
        hobby3: document.querySelector('#hobby3').value,
        hobby4: document.querySelector('#hobby4').value,
        hobby5: document.querySelector('#hobby5').value,
        summary: document.querySelector('#summary').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };

    //Send form data for processing by backend app
    const requestURL = 'http://localhost:8080/api/v1/student/registerStudentProfile';
    const request = new XMLHttpRequest();
    request.open('POST', requestURL, true);
    request.responseType = 'json';
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(params));
    request.onload = function () {
        const answer = request.response;
        if(answer.success === 'true') {
            window.location.href = '../HTML/login.html';
            return;
        } else if(answer.success === 'false') {
            var newList = document.getElementById('error');
            if(answer.message instanceof Array) {
                for(let i = 0; i < answer.message.length; i++) {
                    var listItem = document.createElement('li');
                    var text = document.createTextNode(answer.message[i].msg);
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
    }
};