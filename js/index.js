    //----------------------FIREBASE CONFIG------------------------------------//
    
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    

    const firebaseConfig = {
        apiKey: "AIzaSyBmZWhTEx6luGhfD_Wo90QtGnai_QDdcPQ",
        authDomain: "tindog-db-2b183.firebaseapp.com",
        databaseURL: "https://tindog-db-2b183-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "tindog-db-2b183",
        storageBucket: "tindog-db-2b183.appspot.com",
        messagingSenderId: "77994226986",
        appId: "1:77994226986:web:2f938311d57e6e46c11a53"
  };

    const app = initializeApp(firebaseConfig);

    import { getDatabase, ref, set, child, get}
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

    const db = getDatabase();

    //------------------------------REFERENCES-----------------------------//

    const name = document.querySelector("#nameInp");
    const email = document.querySelector("#emailInp");
    const username = document.querySelector("#userInp");
    const pass = document.querySelector("#passInp");
    const submit = document.querySelector("#sub-btn");

    //-----------------------------------VALIDATION-----------------------//

    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    function validation() {
        let nameregex = /^[a-zA-Z\s]+$/;
        let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
        let userregex = /^[a-zA-Z0-9]{5,}$/;

        if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value) || 
        isEmptyOrSpaces(pass.value)){
            alert("You cannot leave any fields empty.")
            return false;
        }
        
        if (!nameregex.test(name.value)) {
            alert("The name should only contain alphabets.")
            return false;
        }

        if (!emailregex.test(email.value)) {
            alert("Enter a valid email.")
            return false;
        }

        if (!userregex.test(username.value)) {
            alert("The username should only contain alphabets")
            return false;
        }

        return true;
    }

    //-----------------------REGISTER USER TO FIREBASE-----------------------//

    function RegisterUser(){
        if(!validation()){
            return;
        }; 

        const dbRef = ref(db);
        
        get(child(dbRef, "UsersList/" + username.value)).then((snapshot) =>{
            if(snapshot.exists()){
                alert("Account already exists.")
            }

            else{
                set(ref(db, "UsersList/" + username.value),
                {
                    fullname: name.value,
                    email: email.value,
                    username: username.value,
                    password: pass.value
                })
                .then(() =>{
                    alert("User added successfully!");
                })
                .catch((error)=>{
                    alert("Error"+error);
                })
            } 
        });
    }

    //-------------------PASS ENCRYPTION-----------------------------------//

    // function encPass(){
    //     var pass12 = CryptoJS.AES.encrypt(pass.value, pass.value)
    //     return pass12.toString();
    // }

    //-------------------ASSIGN THE EVENT----------------------------------//

    submit.addEventListener("click",RegisterUser)