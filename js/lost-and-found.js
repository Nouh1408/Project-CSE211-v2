var inpPhoto = document.getElementById("photo");
var Name = document.getElementById("name");
var comment = document.getElementById("comment");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var list = [];
var currentIndex = -1;

function add() {
  if (inpPhoto.files.length === 0) {
    alert("Please upload a license image.");
    return;
  }

  if (inpPhoto.files[0].size > 5 * 1024 * 1024) { // 5MB limit
    alert("File size should be less than 5MB.");
    return;
  }

  const currentDateTime = new Date().toLocaleString();

  let data = {
    license: inpPhoto.files[0],
    name: Name.value,
    comment: comment.value,
    date: currentDateTime, // Adding date and time
  };

  list.push(data);
  display();
  resetForm();
}

function display() {
  var view = '';
  for (var i = 0; i < list.length; i++) {
    var imgURL = URL.createObjectURL(list[i].license);
    view += `
      <div class="col-md-4 p-3">
        <div class="card" style="width: 18rem; padding: 15px;">
          <img src="${imgURL}" class="card-img-top" alt="Lost Item Image" loading="lazy">
          <div class="card-body">
            <h5 class="card-title">Name: ${list[i].name}</h5>
            <p class="card-text fw-bold">Place: ${list[i].comment}</p>
            <p class="card-text"><bold class="fw-bold">Submitted on: ${list[i].date}</bold></p>
            <button class="btn btn-outline-danger btn-sm" onclick="remove(${i})">Delete</button>
            <button class="btn btn-outline-success btn-sm" onclick="edit(${i})">Update</button>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("content").innerHTML = view;

  list.forEach(item => URL.revokeObjectURL(item.license));
}

function resetForm() {
  inpPhoto.value = '';
  Name.value = '';
  comment.value = '';
  currentIndex = -1;
  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function remove(index) {
  list.splice(index, 1);
  display();
}

function edit(index) {
  currentIndex = index;
  var data = list[index];
  Name.value = data.name;
  comment.value = data.comment;
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function confirmUpdate() {
  if (currentIndex === -1) return;

  list[currentIndex].name = Name.value;
  list[currentIndex].comment = comment.value;

  if (inpPhoto.files.length > 0) {
    list[currentIndex].license = inpPhoto.files[0];
  }

  display();
  resetForm();
}
