function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve the values of the input fields
    var fullName = document.getElementsByName("fullname")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;

    // Check if email, password, and fullName are entered
    if (!email || !password || !fullName) {
        alert('Please enter email, password, and full name.');
        return; // Exit the function if any field is empty
    }

    // Call the login function if needed
    // login();

    // Redirect to 'nmu.html'
    window.location.href = 'Deposit.html';
}