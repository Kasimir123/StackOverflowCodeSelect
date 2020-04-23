// Gets all code objects on the page
var codes = document.getElementsByTagName("code");

// Text for the button
var buttonText = "Copy code";

// Gets the stored values
chrome.storage.sync.get(["minVal"], function(items) {
    // Loops through all code objects on page and adds a button
    for (i = 0; i < codes.length; i++) {
        // Creates button
        var button = document.createElement("button");
        // adds the text to the button
        button.innerHTML = buttonText;
        // Adds id for custom css to button
        button.id = "copyButton";
        // Checks if the value is a number and if the content is longer than the min length
        if (!isNaN(items["minVal"]) && codes[i].textContent.length >= parseInt(items["minVal"])) {
            // Adds the button to the code block
            codes[i].append(button);
        }
        // Adds the event listener to the button
        button.addEventListener('click', function() {
            saveToClip(this.parentElement);
        });
    }   
});

/*
 Takes in the code object, grabs all text - the length of the button text and
 sends it to the string to clip copy.
 */ 
function saveToClip(codeObject) {
    stringToClip(codeObject.textContent.substring(0, codeObject.textContent.length - buttonText.length));
}

// Copies the string into a textarea, selects it, and copies to clipboard
function stringToClip(string) {
    // Creates the text area
    var textArea = document.createElement('textarea');
    // Adds the string to the text area
    textArea.value = string;
    // Appends the body to the document
    document.body.appendChild(textArea);
    // Selects the text
    textArea.select();
    // Copies text to clipboard
    document.execCommand('copy');
    // Removes the text area
    document.body.removeChild(textArea);
}

