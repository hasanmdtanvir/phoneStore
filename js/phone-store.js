// console.log('phone-store is clicked');

// error message hidden 
document.getElementById('error-message').style.display = 'none';

// searching phone in the search box 
const searchPhone = () => {

    // delete existing phone details while searching new phone 

    document.getElementById('phone-details').textContent = '';

    // getting searchField input

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear data
    searchField.value = '';


    if (searchText == '') {
        // hidden existing items when error occurs 

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        // error message
        document.getElementById('error-message').style.display = 'block';

    }
    else {
        // existing error message disable when items is being shown

        document.getElementById('error-message').style.display = 'none';

        // loading data 

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }

}

// showing search result 
const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-lg border-0 rounded-3">
                <img class="w-50 mx-auto mt-2" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body mx-auto">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-dark w-50 mx-auto mb-2">Details</button>
              
        </div>
            
        `;
        searchResult.appendChild(div);
        // console.log(phone.slug);
    })
}

// loading phone details 
const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    // console.log('clicked', phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phoneDetails => {
    // console.log(phoneDetails);
    const phoneDetailsField = document.getElementById('phone-details');
    phoneDetailsField.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card mb-3 shadow-lg border-0">
    <div class="row g-0 ">
      <div class="col-md-2">
        <img src="${phoneDetails.image}" class="img-fluid rounded-start mt-2 ms-2" alt="...">
      </div>
      <div class="col-md-6">
        <div class="card-body">
            <h5 class="card-title">${phoneDetails.name}</h5>
            <p id="releasingDate"></p>
            <p class="card-text">${phoneDetails.brand}</p>
            <h3>Main Features</h3>
            <h6 class="d-inline-block">Display Size: </h6>
            <span class="lh-1">${phoneDetails.mainFeatures.displaySize}</span>
            <br />
            <h6 class="d-inline-block">Memory: </h6>
            <span class="lh-1">${phoneDetails.mainFeatures.memory}</span>
            <br />
            <h6 class="d-inline-block">Storage: </h6><span class="lh-1">${phoneDetails.mainFeatures.storage}</span>
            <br />
            <h6 class="d-inline-block">Sensors: </h6>
            <span id="sensors"></span>
        </div>
      </div>
    </div>
  </div>
        `;


    phoneDetailsField.appendChild(div);

    // releasing date 
    // console.log(phoneDetails.releaseDate);
    if (phoneDetails.releaseDate == '') {
        document.getElementById('releasingDate').innerText = 'Releasing Date Not Found';
    }
    else {
        document.getElementById('releasingDate').innerText = phoneDetails.releaseDate;
    }

    // showing sensors details 
    const sensor = phoneDetails.mainFeatures.sensors;
    // console.log(sensor);
    let sensorString = '';
    for (let i = 0; i < sensor.length; i++) {
        sensorString = sensorString + sensor[i] + ', ';

    }
    document.getElementById('sensors').innerText = sensorString;
}
