//Author: Sujan Rokad, 000882948
const inputElement = document.querySelector('#inputElement');

// function to handle AJAX response for button 1
function handleResponse(data) {
const responseContainer = document.querySelector('.response-container');
    // create new elements and update DOM
    const container = document.createElement('div');
    const h_1 = document.createElement('h1');
    h_1.textContent = data + " - 000882948 ";
    h_1.style.textAlign = 'center';
    h_1.style.fontFamily = 'Lucida Console';
    h_1.style.color = '#1D2939';
    responseContainer.innerHTML = "";
    responseContainer.appendChild(h_1);
    responseContainer.appendChild(container);
}

// function to handle AJAX error
function handleError(error) {
    console.error(error);
}

// event listener for first button
document.addEventListener('DOMContentLoaded', function() {
    const firstBtn = document.querySelector('#firstBtn');

    firstBtn.addEventListener('click', () => {
        fetch('https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php')
            .then(response => response.text())
            .then(handleResponse)
            .catch(handleError);
        });
})


// event lsitener for second button
document.addEventListener('DOMContentLoaded', function() {
    const responseContainer2 = document.querySelector('.response-container-2');
    const secondBtn = document.querySelector('#secondBtn');
    const inputElement = document.querySelector('#inputElement');

    secondBtn.addEventListener('click', () => {
        const inputElementValue = inputElement.value;
        const validValues = ['mario', 'starwars'];

        if (validValues.includes(inputElementValue)) {
        fetch(`https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=${inputElementValue}`, {credentials:"include"})
        .then(response => response.json())
        .then(data => {
            responseContainer2.innerHTML = '';
            const divs = [];
            const numOfImg = data.length;
            let divWidth;
    
            if (numOfImg === 2 ){
                divWidth = "50%";
            } else if (numOfImg === 3){
                divWidth = "33.33%";
            } else if (numOfImg === 1){
                divWidth = "100%";
            }
    
            for (let i = 0; i < numOfImg; i++) {
                const { name, url, series } = data[i];
                var div = document.createElement('div');
                div.style.width = divWidth;
                // div.style.flex = '1 0 20%';
                div.style.float = 'left';
                div.style.textAlign = 'center';
                div.style.padding = '10px';
                const h2 = document.createElement('h2');
                h2.textContent = series;
                h2.style.color = '#947E8B'
                h2.style.fontFamily = 'Calisto MT';
                h2.style.borderStyle = 'inset';
                div.appendChild(h2);
                const img = document.createElement('img');
                img.src = url;
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.borderStyle = 'ridge';
                div.appendChild(img);
                const h3 = document.createElement('h3');
                h3.textContent = name;
                h3.style.color = '#181262'
                h3.style.fontFamily = 'Calisto MT';
                h3.style.borderStyle = 'outset';
                div.appendChild(h3);
                divs.push(div);
            }
    
            divs.forEach(div => responseContainer2.appendChild(div));
            responseContainer2.style.overflow = 'hidden';
            responseContainer2.style.display = 'flex';
            responseContainer2.style.flexwrap = 'wrap';
        })
        .catch(handleError);
    } else {
        alert('Invalid choice. Please choose "mario" or "starwars".');
    }
    });
})

// event listener for third button
document.addEventListener('DOMContentLoaded', function() {
    const responseContainer3 = document.querySelector('.response-container-3');
    const thirdBtn = document.querySelector('#thirdBtn');

    thirdBtn.addEventListener('click', () => {
        const inputElementValue = document.querySelector('#inputElement').value; 

        const fetchOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `choice=${inputElementValue}`
        };
        
        fetch('https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php', fetchOptions)
        .then(response => response.json())
        .then(data => {
        responseContainer3.innerHTML = '';
        const table = document.createElement('table'); // create a new table element
        table.style.borderStyle = 'groove';
        table.style.margin = 'auto';
        table.style.borderCollapse = 'collapse';
        
        const thead = document.createElement('thead');
        
        const tR = document.createElement('tr');
        
        const th1 = document.createElement('th');
        th1.textContent = 'Series';
        th1.style.backgroundColor = '#7F2237';
        th1.style.width = '25%';
        th1.style.color = 'white';
        
        const th2 = document.createElement('th');
        th2.textContent = 'Name';
        th2.style.backgroundColor = '#7F2237';
        th2.style.width = '25%';
        th2.style.color = 'white';
        
        const th3 = document.createElement('th');
        th3.textContent = 'Link';
        th3.style.backgroundColor = '#7F2237';
        th3.style.width = '50%';
        th3.style.color = 'white';
        
        tR.appendChild(th1);
        tR.appendChild(th2);
        tR.appendChild(th3);
        
        thead.appendChild(tR);
        table.appendChild(thead);
        
        const tbody = document.createElement('tbody');
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const tr = document.createElement('tr'); 
        
            const td1 = document.createElement('td');
            td1.textContent = obj.series;
            td1.style.borderStyle = 'groove';
            td1.style.width = '25%';
            tr.appendChild(td1);
        
            const td2 = document.createElement('td');
            td2.textContent = obj.name;
            td2.style.borderStyle = 'groove';
            td2.style.width = '25%';
            tr.appendChild(td2);
        
            const td3 = document.createElement('td');
            td3.textContent = obj.url;
            td3.style.borderStyle = 'groove';
            td3.style.width = '40%';
            tr.appendChild(td3);
        
            if (i % 2 == 0) {
            tr.style.backgroundColor = '#D7C7DE';
            }
        
            tbody.appendChild(tr);
            
            table.appendChild(tbody); // add the tr to the table
        }
        
        
            // create a new tr to display "Mario" or "Starwars"
            const copyright = document.createElement('td');
            copyright.style.backgroundColor = '#3F2B47';
            copyright.setAttribute('colspan', 3);
            copyright.style.fontStyle = 'italic';
            copyright.style.fontSize = '12px';
            copyright.style.color = 'white';
            copyright.style.textAlign = 'center';
            
            if (inputElementValue === 'mario') {
            copyright.textContent = 'Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. © 2019 Nintendo.';
            } else if (inputElementValue === 'starwars') {
            copyright.textContent = 'Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.';
            }
            
            //copyright.appendChild(cell4);
            table.appendChild(copyright); 
        
        responseContainer3.appendChild(table); 
        })
        .catch(error => {
        console.error(error); 
        });
        });
})

