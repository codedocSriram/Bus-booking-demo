function handleFormSubmit(event) {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const busNumber = document.querySelector("#bus-number").value;
  const userDetails = {
    username,
    email,
    phone,
    busNumber
  };

  console.log(userDetails);
}
