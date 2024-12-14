function toggleSections() {
    var userType = document.getElementById('userType').value;
    if (userType === 'student') {
        document.getElementById('studentSection').style.display = 'block';
        document.getElementById('adminSection').style.display = 'none';
    } else if (userType === 'admin') {
        document.getElementById('studentSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
    }
 }
 
 function validateForm(event) {
    event.preventDefault(); 
 
    var userType = document.getElementById('userType').value;
    var email, password;
 
   
    if (userType === 'student') {
        email = document.getElementById('student-email').value;
        password = document.getElementById('student-pass').value;
    } else if (userType === 'admin') {
        email = document.getElementById('admin-email').value;
        password = document.getElementById('admin-pass').value;
    }
 
   
    if (!email || !password) {
        alert('Please enter email and password.');
        return; 
    }
 
    
    login();
 
    window.location.href = 'Deposit.html';
 }
 
 
 function login() {
    var userType = document.getElementById('userType').value;
    var email, password;
 
    
    if (userType === 'student') {
        email = document.getElementById('student-email').value;
        password = document.getElementById('student-pass').value;
    } else if (userType === 'admin') {
        email = document.getElementById('admin-email').value;
        password = document.getElementById('admin-pass').value;
    }
 
    alert('Login as: ' + userType + '\nEmail: ' + email + '\nPassword: ' + password);
 }
 
 
 /*=============== SHOW HIDDEN - PASSWORD ===============*/
 
 const showHiddenPass = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       if(input.type === 'password'){
          // Switch to text
          input.type = 'text'
 
          // Icon change
          iconEye.classList.add('ri-eye-line')
          iconEye.classList.remove('ri-eye-off-line')
       } else{
          // Change to password
          input.type = 'password'
 
          // Icon change
          iconEye.classList.remove('ri-eye-line')
          iconEye.classList.add('ri-eye-off-line')
       }
    })
 }
 
 showHiddenPass('login-pass','login-eye')