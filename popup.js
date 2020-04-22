// Gets the form and adds the submit event listener
document.getElementById("myForm").addEventListener("submit", submitForm);
// Gets the stored value and sets the min length to that value
chrome.storage.sync.get(["minVal"], function(items) {
    // Checks if the value is a number, if it is not then it sets the value to 0
    if (isNaN(items["minVal"])) {
        document.getElementById("minLength").value = "0";
    }
    else {
        document.getElementById("minLength").value = items["minVal"];
    }
});

// On form submit it saves the value
function submitForm() {
    // Does not save if the form field is not a number
    if (isNaN(document.getElementById("minLength").value)) {
        alert("Please use a real number");
    }
    else {
        chrome.storage.sync.set({"minVal": document.getElementById("minLength").value}, function(){
            // Do nothing on save
        });
    }
}