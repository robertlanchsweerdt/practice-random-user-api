const API_URL = 'https://randomuser.me/api/';
const btnUserInfo = document.querySelectorAll('.icon');
const btnRefresh = document.querySelector('.btn');
let userInfo;

btnRefresh.addEventListener('click', callUser);

btnUserInfo.forEach((btn) => {
  btn.addEventListener('mouseover', buttonClicked);
});

callUser();

function callUser() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      userInfo = data.results[0];
      if (userInfo.location.country !== 'United States') {
        callUser();
        return;
      }
      displayUserInfo(userInfo);
    })
    .catch((err) => console.error(err));
}

function displayUserInfo(displayUserTitle, displayUserValue) {
  const userTitle = document.querySelector('.user-title');
  const userValue = document.querySelector('.user-value');
  const userPhoto = document.querySelector('.user-img');

  userPhoto.src = userInfo.picture.large;

  if (displayUserValue != undefined) {
    userTitle.innerText = `My ${displayUserTitle} is`;
    userValue.innerText = displayUserValue;
  } else {
    userTitle.innerText = `My name is`;
    userValue.innerText = `${userInfo.name.first} ${userInfo.name.last}`;
  }
}

function buttonClicked(e) {
  const clickedButton = e.currentTarget;
  const buttonLabel = clickedButton.dataset.label;
  let displayUserValue;

  switch (buttonLabel) {
    case 'name':
      displayUserValue = `${userInfo.name.first} ${userInfo.name.last}`;
      break;
    case 'email':
      displayUserValue = userInfo.email;
      break;
    case 'age':
      displayUserValue = userInfo.dob.age;
      break;
    case 'street':
      displayUserValue = `${userInfo.location.street.number} ${userInfo.location.street.name}`;
      break;
    case 'phone':
      displayUserValue = userInfo.phone;
      break;
    case 'password':
      displayUserValue = userInfo.login.password;
      break;
  }

  displayUserInfo(buttonLabel, displayUserValue);
}
