import "./css/main.css";
import "./images/pointer.svg";
import * as signalR from "@aspnet/signalr";
import * as paper from "paper";
import { Guid } from "guid-typescript";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/path")
    .build();

connection.start().catch(err => console.error(err))

paper.setup(<HTMLCanvasElement>document.getElementById("canvas"));

let path: paper.Path;
let guid: Guid;
let map: { [guid: string]: paper.Path; } = {};

let lineColour: string = '#000';
let lineWidth: number = 2;

let colourPicker: HTMLInputElement = <HTMLInputElement>document.getElementById("colourPicker");
let sizeSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("sizeSlider");

sizeSlider.addEventListener('change', event => {
    lineWidth = parseInt(sizeSlider.value);
});

colourPicker.addEventListener('change', event => {
    lineColour = colourPicker.value;
});

paper.view.onMouseDown = (event) => {
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

    guid = Guid.create();
    connection.send("SendPathStart", guid.toString(), ToPointObject(event.point), lineColour);
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
paper.view.onMouseDrag = (event) => {
    path.add(event.point);

    connection.send("SendPathMiddle", guid.toString(), ToPointObject(event.point));
}

// When the mouse is released, we simplify the path:
paper.view.onMouseUp = (event) => {
    connection.send("SendPathEnd", guid.toString(), ToPointObject(event.point));
    // When the mouse is released, simplify it:
    path.simplify();

}

connection.on("ReceivePathStart", (guid: string, point: any, colour: string) => {
    let temp = new paper.Path({
        segments: [new paper.Point(point)],
        strokeColor: colour,
        strokeWidth: lineWidth
    });
    map[guid] = temp;
});

connection.on("ReceivePathMiddle", (guid: string, point) => {
    map[guid].add(new paper.Point(point));
});

connection.on("ReceivePathEnd", (guid: string, point) => {
    map[guid].add(new paper.Point(point));
    map[guid].simplify();
    delete map[guid];
});

function ToPointObject(point: paper.Point): any {
    return {
        x: point.x,
        y: point.y,
        length: point.length,
        angle: point.angle,
        angleInRadians: point.angleInRadians
    }
}