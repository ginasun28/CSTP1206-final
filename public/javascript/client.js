// This function is check email and password from user input value
function validatePassword(checkEmpty=true){
    // Set variable to get each user input elements
    let pwd = document.getElementById("password").value;
    let cmpwd = document.getElementById("conf-password").value;
    let email = document.getElementById("email").value;
    let cemail = document.getElementById("conf-email").value;
    // Set variable to get the message when user has wrong input
    let message = document.getElementById("error-message");

    // Check if user input thier email
    if(email === "" || cemail === ""){
        message.innerHTML = "The email can't be empty";
        return false;
    }
    // Check if user input thier password
    if (pwd ==="" && cmpwd ==="" && !checkEmpty){
        message.innerText = "The password can't be empty.";
        return true;
    }
    // Check if user input thier email and confirm email are same or not
    if (email !== cemail){
        message.innerText = "The email are not match.";
        return false;
    }
    // Check if user input thier password and confirm password are same or not
    if (pwd !== cmpwd){
        message.innerText = "The passwords are not match.";
        return false;
    }
    // Check if password is less than 6 char
    if (pwd.length < 6){
        message.innerText = "The passwords at least 6 chars.";
        return false;
    }

    // Set variable for special character, uppercase letter to check user input value
    let specialChars = "_#$!%^<>?&*-+=(){}[]|:~@";
    let anyUpperCase = false;
    let anySpecialChar = false;
    // Check the passwords if have special character, uppercase character
    for(let i = 0; i < pwd.length; i++){
        let c = pwd.charAt(i);
        if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <=90 ){
            anyUpperCase = true;
        }
        else if(specialChars.indexOf(c)>=0){
            anySpecialChar = true;
        }
    }
    // Return message if passwords do not have 1 uppercase character
    if(!anyUpperCase){
        message.innerText = "The passwords at least 1 upper case char.";
        return false;
    }
    // Return message if passwords do not have 1 special character
    if(!anySpecialChar){
        message.innerText = "The passwords at least 1 special char as _#$!%^<>?&*-+=(){}[]|:~@";
        return false; 
    }
    return true;
}

// Select local images and display on add plants page
function addUploadListener(){
    document.getElementById("myImage").addEventListener('change', (e) => {
        let reader = new FileReader();
        reader.onload = (e1) =>{
            let imgObj = document.getElementById("mypic");
            imgObj.src = e1.target.result;
            let hiddenImage = new Image();
            hiddenImage.onload = (e) => {
                let orgWidth = hiddenImage.width;
                let orgHeight = hiddenImage.height;
                if (orgWidth > orgHeight) {
                    let r = 300 / orgWidth ;
                    orgHeight = orgHeight * r;
                    orgWidth = 300;
                }
                else{
                    let r = 300 / orgHeight ;
                    orgWidth = orgWidth * r;
                    orgHeight = 300;
                }
                const c = document.getElementById("c");
                const ctx = c.getContext('2d');
                c.width = 300;
                c.height = 300;
                ctx.drawImage(hiddenImage, 0, 0, hiddenImage.width, hiddenImage.height,0,0, orgWidth,orgHeight);
                const hidden = document.getElementById("imageData")
                hidden.value = c.toDataURL("image/png");
            }
            hiddenImage.src = e1.target.result;
          }
          reader.readAsDataURL(e.target.files[0]);
    });
}

// Delete data form database
function deletePlant(){
    const action = document.getElementById("action");
    action.method = "delete";
    return true
}

function addSearchEnter(){
    const element = document.getElementById("query");
    element.addEventListener("keyup", (event) =>{
       if (event.keyCode === 13){
           // event.preventDefault();
           console.info(event.target.value);
           document.getElementById("search").submit();
       }
    });
}