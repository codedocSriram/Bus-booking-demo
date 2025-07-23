document.addEventListener("DOMContentLoaded", initialize);
let edit = false;
let editId = null;
const url =
  "https://crudcrud.com/api/76c54a8bcfff4acfbb0cc5e787270c86/bookingList"; //CRUD-CRUD Url

async function initialize() {
  const bookingList = await getBookings();
  for (let i = 0; i < bookingList.length; i++) {
    displayBookings(bookingList[i]);
  }
}

const addBooking = userDetails => {
  //POST Method
  return axios
    .post(url, userDetails)
    .then(res => {
      displayBookings(res.data);
    })
    .catch(error => {
      return error;
    });
};

const getBookings = () => {
  //GET Method
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

const deleteBooking = id => {
  //DELETE method
  axios
    .delete(`${url}/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

const editBooking = (id, editedData) => {
  return axios.put(`${url}/${id}`, editedData).then(res => {}).catch(error => {
    console.log(error);
  });
};

async function handleFormSubmit(event) {
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
  if (edit) {
    await editBooking(editId, userDetails);
    const li = document.getElementById(editId);
    li.firstChild.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone} - ${userDetails.busNumber}`;
    document.querySelector("#submit-btn").value = "Submit";
    edit = false;
    editId = null;
  } else {
    addBooking(userDetails);
    document.querySelector("#username").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
  }
}

function displayBookings(bookings) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.key = bookings._id;
  li.id = bookings._id;
  li.className = "li-element";
  li.textContent = `${bookings.username} - ${bookings.email} - ${bookings.phone} - ${bookings.busNumber}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn hover-class";
  deleteButton.addEventListener("click", () => {
    deleteData(li);
  });
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn hover-class";
  editButton.addEventListener("click", () => {
    editData(bookings);
  });
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  ul.appendChild(li);
}

function deleteData(li) {
  deleteBooking(li.key);
  li.remove();
}

function editData(bookings) {
  edit = true;
  editId = bookings._id;
  console.log(editId);
  document.querySelector("#username").value = bookings.username;
  document.querySelector("#email").value = bookings.email;
  document.querySelector("#phone").value = bookings.phone;
  document.querySelector("#bus-number").value = bookings.busNumber;
  document.querySelector("#submit-btn").value = "Update";
}

async function filterData() {
  const filter = document.querySelector("#filter");
  const ul = document.querySelector("ul");
  const bookings = await getBookings();
  ul.innerHTML = "";
  if (filter.value === "All") {
    for (let i = 0; i < bookings.length; i++) {
      displayBookings(bookings[i]);
    }
  } else {
    const filteredBookings = bookings.filter(data => {
      if (data.busNumber === filter.value) {
        return data;
      }
    });
    for (let i = 0; i < filteredBookings.length; i++) {
      displayBookings(filteredBookings[i]);
    }
  }
}
