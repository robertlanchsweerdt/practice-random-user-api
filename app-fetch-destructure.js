const API_URL = 'https://randomuser.me/api/';
const btnUserInfo = document.querySelectorAll('.icon');
const btnRefresh = document.querySelector('.btn');
let userInfo;

window.addEventListener('DOMContentLoaded', startMe);
btnRefresh.addEventListener('click', startMe);

function startMe() {
  callUser().then((data) => {
    console.log(data);
    displayUser(data);
  });
}

function callUser() {
  return new Promise((resolve, reject) => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        userInfo = data.results[0];
        const person = convertToUniqueObject(userInfo);
        resolve(person);
      })
      .catch((err) => console.error(err));
  });
}

function convertToUniqueObject(userInfo) {
  const { first, last } = userInfo.name;
  const name = `${first} ${last}`;
  const { email, phone } = userInfo;
  const { age } = userInfo.dob;
  const { large: profileImg } = userInfo.picture;
  const { password } = userInfo.login;

  let {
    street: { number, name: address },
  } = userInfo.location;

  const street = `${number} ${address}`;

  return {
    name,
    email,
    phone,
    age,
    street,
    profileImg,
    password,
  };
}

function displayUser(person) {
  const userTitle = document.querySelector('.user-title');
  const userValue = document.querySelector('.user-value');
  const userPhoto = document.querySelector('.user-img');

  userValue.textContent = person.name;
  userTitle.textContent = `My name is`;
  userPhoto.src = person.profileImg;

  btnUserInfo.forEach((btn) => {
    btn.addEventListener('mouseover', (e) => {
      const clickedButton = e.currentTarget;
      const buttonLabel = clickedButton.dataset.label;

      userValue.textContent = person[buttonLabel];
      userTitle.textContent = `My ${buttonLabel} is`;
    });
  });
}
