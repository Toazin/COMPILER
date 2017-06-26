var myButton = document.getElementById("clickButton");
var myText = document.getElementById("helloText");

myButton.addEventListener('click', doSomething, false)

function doSomething() {
    console.log("S");
	myText.textContent = "hello, world!";
}
