var inpPhoto = document.getElementById("photo");
var Name = document.getElementById("carModel");
var list = [];

function add() {
    let data = {
        lisence: inpPhoto.files[0], 
        name: Name.value 
    };
    list.push(data);
    display();
}

function display() {
    var view = '';
    for (var i = 0; i < list.length; i++) {
        
        var imgURL = URL.createObjectURL(list[i].lisence);
        view += `
        <div class="col-md-4 p-3">
            <div class="card" style="width: 18rem; padding: 15px;"> <!-- Add padding here -->
                <img src="${imgURL}" class="card-img-top" alt="Car Image">
                <div class="card-body">
                    <h5 class="card-title">${list[i].name}</h5>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("content").innerHTML = view; // Use innerHTML to set HTML content
}