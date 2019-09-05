buildAllProfiles();


//Main function
function buildAllProfiles() {
    //GET all data from backend
    const requestURL = 'http://localhost:8080/api/v1/student/getAllStudents';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        const answer = request.response;
        if(answer.success === 'true') {
            //Loop through the array of student data and create profiles for each object in the array.
            for (let i = 0; i < answer.studentData.length; i++) {
                //Create main container
                let mainContainer = newE('div');
                mainContainer.setAttribute('class', 'main_container');
                
                //Create header div and attach heading
                let header = newE('div');
                header.setAttribute('class', 'header');
                let h1 = newE('h1');
                let fullName = `${answer.studentData[i].first_name} ${answer.studentData[i].last_name}`;
                let fullNameNode = text(fullName);
                myAppend(h1, fullNameNode);
                myAppend(header, h1);

                //Create hobbies div and append hobbies
                let hobbies = newE('div');
                hobbies.setAttribute('class', 'hobbies');
                let pH = newE('p');
                let hobby = `${answer.studentData[i].hobby1}`;
                let hobbyNode = text(hobby);
                myAppend(pH, hobbyNode);
                myAppend(hobbies, pH);

                //Create summary div and append summary
                let summary = newE('div');
                summary.setAttribute('class','summary');
                let pSummary = newE('p');
                let summaryText = `"${answer.studentData[i].summary}"`;
                let summaryTextNode = text(summaryText);
                myAppend(pSummary, summaryTextNode);
                myAppend(summary, pSummary);


                //Append header, hobbies and summary to maincontainer
                myAppend(mainContainer, header);
                myAppend(mainContainer, hobbies);
                myAppend(mainContainer, summary);

                //Append maincontainer to body
                document.body.appendChild(mainContainer);

                //Add a break before next profile
                let space = newE('br');
                document.body.appendChild(space);
            };
        }
    };
};






//List of other functions
//Function to create only new DOM element
function newE (el) {
    return document.createElement(el);
};

//Function to create a text node
function text (words) {
    return document.createTextNode(words);
};

//Function to append nodes
function myAppend (parent, child) {
    return parent.appendChild(child);
};

