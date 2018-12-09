"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@aspnet/signalr");
var mouseArea = document.querySelector("#mouseArea");
var mouseLoc = document.querySelector("#mouseLoc");
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/mouse")
    .build();
connection.start().catch(function (err) { return document.write(err); });
connection.on("messageReceived", function (name, x, y) {
    var el = document.querySelectorAll('[data-name="' + name + '"]');
    var mousePointer = el.length > 0 ? el[0] : document.createElement("div");
    mousePointer.className = "mouse-pointer";
    mousePointer.attributes["style"] = "top: " + y + "; left: " + x;
    mousePointer.attributes["data-name"] = name;
    mouseArea.appendChild(mousePointer);
});
mouseArea.addEventListener("mousedown", function (e) {
    var x = e.clientX - mouseArea.offsetLeft;
    var y = e.clientY - mouseArea.offsetTop;
    mouseLoc.innerText = "Mouse X: " + x + " Mouse Y: " + y;
    connection.send("SendMouseLoc", x, y);
});
//# sourceMappingURL=index.js.map