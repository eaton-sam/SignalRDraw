"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
require("./images/pointer.svg");
var signalR = require("@aspnet/signalr");
var paper = require("paper");
var guid_typescript_1 = require("guid-typescript");
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/path")
    .build();
connection.start().catch(function (err) { return console.error(err); });
paper.setup(document.getElementById("canvas"));
var path;
var guid;
var map = {};
var lineColour = '#000';
var lineWidth = 2;
var colourPicker = document.getElementById("colourPicker");
var sizeSlider = document.getElementById("sizeSlider");
sizeSlider.addEventListener('change', function (event) {
    lineWidth = parseInt(colourPicker.value);
});
colourPicker.addEventListener('change', function (event) {
    lineColour = colourPicker.value;
});
paper.view.onMouseDown = function (event) {
    // If we produced a path before, deselect it:
    if (path) {
        path.selected = false;
    }
    // Create a new path and set its stroke color to black:
    path = new paper.Path({
        segments: [event.point],
        strokeColor: lineColour,
        strokeWidth: lineWidth
    });
    guid = guid_typescript_1.Guid.create();
    connection.send("SendPathStart", guid.toString(), ToPointObject(event.point), lineColour);
};
// While the user drags the mouse, points are added to the path
// at the position of the mouse:
paper.view.onMouseDrag = function (event) {
    path.add(event.point);
    connection.send("SendPathMiddle", guid.toString(), ToPointObject(event.point));
};
// When the mouse is released, we simplify the path:
paper.view.onMouseUp = function (event) {
    connection.send("SendPathEnd", guid.toString(), ToPointObject(event.point));
    // When the mouse is released, simplify it:
    path.simplify();
};
connection.on("ReceivePathStart", function (guid, point, colour) {
    var temp = new paper.Path({
        segments: [new paper.Point(point)],
        strokeColor: colour,
        strokeWidth: lineWidth
    });
    map[guid] = temp;
});
connection.on("ReceivePathMiddle", function (guid, point) {
    map[guid].add(new paper.Point(point));
});
connection.on("ReceivePathEnd", function (guid, point) {
    map[guid].add(new paper.Point(point));
    map[guid].simplify();
    delete map[guid];
});
function ToPointObject(point) {
    return {
        x: point.x,
        y: point.y,
        length: point.length,
        angle: point.angle,
        angleInRadians: point.angleInRadians
    };
}
//# sourceMappingURL=index.js.map