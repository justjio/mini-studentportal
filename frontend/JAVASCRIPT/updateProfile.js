const forUpdate = JSON.parse(localStorage.dataForUpdate);

buildUpdateForm();

function buildUpdateForm() {
    document.querySelector('#firstname').value = forUpdate.first_name;
    document.querySelector('#surname').value = forUpdate.last_name;

    //Using momentJS to populate the date value
    let dOB = new Date(forUpdate.date_of_birth);
    let modifiedDOB = moment(dOB).format('YYYY-MM-DD');
    document.querySelector('#birthday').value = modifiedDOB;

    //Getting the matching gender box correctly checked
    let gender = document.getElementsByName('sex');
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].value === forUpdate.sex) {
            gender[i].checked = true;
        };
    };

    document.querySelector('#hobby1').value = forUpdate.hobby1;
    document.querySelector('#hobby2').value = forUpdate.hobby2;
    document.querySelector('#hobby3').value = forUpdate.hobby3;
    document.querySelector('#hobby4').value = forUpdate.hobby4;
    document.querySelector('#hobby5').value = forUpdate.hobby5;
    document.querySelector('#summary').value = forUpdate.summary;
    document.querySelector('#email').value = forUpdate.email;
    document.querySelector('#password').value = forUpdate.password;
};

function updateStudent() {
    //Get the correct sex value
    let gender = document.getElementsByName('sex');
    let genderName;
    for (let k = 0; k < gender.length; k++) {
        if(gender[k].checked) {
            genderName = gender[k].value;
        };
    };

    //Collect student data to request.body
    const params = {
        firstname: document.querySelector('#firstname').value,
        surname: document.querySelector('#surname').value,
        date_of_birth: document.querySelector('#birthday').value,
        sex: genderName,
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
    request.onload = () => {
        //Do something
    }
};