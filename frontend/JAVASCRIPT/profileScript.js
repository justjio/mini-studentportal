

const profileURI = 'http://localhost:8080/api/v1/getStudent';
const request = new XMLHttpRequest();

request.open('GET', profileURI);
request.responseType = 'json';
request.send();
request.onload = function() {
    const studentData = request.response;
    //Enclose the function that will build the page below.
};