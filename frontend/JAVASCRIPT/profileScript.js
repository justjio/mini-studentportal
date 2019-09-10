//Get data of logged - in student
const verifiedStudent = JSON.parse(localStorage.data);
//Build profile of logged  - in student
buildProfile();






//LIST OF FUNCTIONS
//Function for creating only new element
function onlyDOMelement (el) {
    return document.createElement(el);
};

//Function for creating text node
function text (words) {
    return document.createTextNode(words);
};

//Function to calculate age of user
function age () {
    let today = new Date();
    let birthdate = new Date (verifiedStudent.date_of_birth);
    return today.getFullYear() - birthdate.getFullYear();
};

//Function for building profile
function buildProfile() {
    let header = document.getElementsByClassName('header')[0];
    let hobbies = document.getElementsByClassName('hobbies')[0];
    let summary = document.getElementsByClassName('summary')[0];
    let contact = document.getElementsByClassName('contact')[0];
    

    //Create heading and paragraph elements.
    let h1 = onlyDOMelement('h1');
    let pHeader = onlyDOMelement('p');

    let pH1 = onlyDOMelement('p');
    let pH2 = onlyDOMelement('p');
    let pH3 = onlyDOMelement('p');
    let pH4 = onlyDOMelement('p');
    let pH5 = onlyDOMelement('p');

    let pSummary = onlyDOMelement('p');

    let pContact = onlyDOMelement('p');

    //Create text nodes and append them to respective heading and paragraphs
    let fullname = `${verifiedStudent.first_name} ${verifiedStudent.last_name}`;
    let fullnameNode = text(fullname);
    h1.appendChild(fullnameNode);

    let studentAge = age();
    let ageSex = `${studentAge} years -  ${verifiedStudent.sex}`;
    let ageSexNode = text(ageSex);
    pHeader.appendChild(ageSexNode);

    header.appendChild(h1);
    header.appendChild(pHeader);//1st div settled

    let hobby1 = `${verifiedStudent.hobby1}`;
    let hobby1Node = text(hobby1);
    pH1.appendChild(hobby1Node);

    let hobby2 = `${verifiedStudent.hobby2}`;
    let hobby2Node = text(hobby2);
    pH2.appendChild(hobby2Node);

    let hobby3 = `${verifiedStudent.hobby3}`;
    let hobby3Node = text(hobby3);
    pH3.appendChild(hobby3Node);

    let hobby4 = `${verifiedStudent.hobby4}`;
    let hobby4Node = text(hobby4);
    pH4.appendChild(hobby4Node);

    let hobby5 = `${verifiedStudent.hobby5}`;
    let hobby5Node = text(hobby5);
    pH5.appendChild(hobby5Node);

    hobbies.appendChild(pH1);
    hobbies.appendChild(pH2);
    hobbies.appendChild(pH3);
    hobbies.appendChild(pH4);
    hobbies.appendChild(pH5);//2nd div settled

    let summaryText = `"${verifiedStudent.summary}"`;
    let summaryTextNode = text(summaryText);
    pSummary.appendChild(summaryTextNode);
    summary.appendChild(pSummary);//3rd div settled

    let email = `${verifiedStudent.email}`;
    let emailNode = text(email);
    pContact.appendChild(emailNode);
    contact.appendChild(pContact);//4th div settled
};

//Function for controlling logging out
function logOut() {
    localStorage.removeItem('data');
    window.location.href = '../HTML/login.html';
};

function allProfiles () {
    window.location.href = '../HTML/allprofiles.html';
};


function updateProfile () {
    const params = {
        id: verifiedStudent._id
    };

    console.log(params);

    const requestURL = 'http://localhost:8080/api/v1/student/fetchStudentProfile';
    const request = new XMLHttpRequest();
    request.open('POST', requestURL, true);
    request.responseType = 'json';
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(params));
    request.onload = () => {
        const answer = request.response;
        const studentForUpdate = JSON.stringify(answer.studentData);
        localStorage.setItem('dataForUpdate', studentForUpdate);
        window.location.href = '../HTML/updateprofile.html';
        console.log(answer.studentData);
    };
};