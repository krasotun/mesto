function getFetch() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
    method: 'GET',
    headers: {
      authorization: '99499664-2026-410c-a4a5-b475d910be99'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

getFetch();


