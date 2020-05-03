//const bcrypt = require('bcrypt');
const generatePassword = document.getElementById("generatePassword");
const storePassword = document.getElementById("storePassword");
const encryptPassword = document.getElementById("encryptPassword");
const passwordKeyword = document.getElementById("passwordKeyword");
const keyword = document.getElementById("keyword");
const search = document.getElementById("search");
const passwordLength = document.getElementById('passwordLength');

var temp;

generatePassword.addEventListener('click', ()=>{
    let generatedPassword = GeneratePassword(passwordLength.value);
    alert(`Your password is ${generatedPassword}`);
    temp = generatedPassword;
});

storePassword.addEventListener('click', ()=>{
    StorePassword(temp, passwordKeyword.value, "non-encrypted");  
});
search.addEventListener('click', ()=>{
    GetPassword(keyword.value)
})

const GeneratePassword=(passwordLength)=>{
    const numbersAndLetters = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', "k", 'l', 'm', 'n', 'ñ',
     'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '@', '#', '$', 
     '%', '&', '*', '!', '~', '+', '?', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    return numbersAndLetters.sort(()=>{return 0.5 - Math.random()}).slice(0, passwordLength).join("");
}
const EncryptPassword=(password)=>{
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            return hash
        });
    });
}
const StorePassword=(password, secretWord, type)=>{
    let data = [password, secretWord, type]
    if (secretWord == "") {
        alert("Keyword should not be empty");
    }else{
        localStorage.setItem(secretWord, data);
        alert("Password Stored successfully");
    }

}
function GetPassword(secretWord){
    let savedItem = localStorage.getItem(secretWord);
    if(savedItem == null) return document
    let  item= savedItem.split(",")
    if(item[2] == "encrypted"){
        bcrypt.compare(item[1], hash, function(err, result) {
            return result;
        });
    }else{
       return navigator.clipboard.writeText(item[0]).then(
            cliptext => alert("Password has been copied in clipboard")
         )
    }
    
}

