import "./css/main.css";
import * as signalR from "@aspnet/signalr";
import "./images/pointer.svg";

const mouseArea: HTMLDivElement = <HTMLDivElement> document.querySelector("#mouseArea");
const mouseLoc: HTMLDivElement = <HTMLDivElement> document.querySelector("#mouseLoc");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/mouse")
    .build();

connection.start().catch(err => console.error(err))

connection.on("ReceiveMouseLoc", (name: string, x: number, y: number) => {
    console.log(`Recieved: ${name} ${x} ${y}`);
    let el = document.querySelectorAll('[data-name="' + name + '"]');
    let mousePointer: HTMLImageElement;
    if (el.length > 0) {
       mousePointer = <HTMLImageElement>el[0];       
    }
    else {
        mousePointer =  <HTMLImageElement> document.createElement("img");
        mousePointer.src = "/images/pointer.svg";
        mousePointer.className = "mouse-pointer";
        mousePointer.setAttribute("data-name", name);
        mouseArea.appendChild(mousePointer);  
    }

    mousePointer.setAttribute("style", "top: " + y + "px; left: " + x + "px");
});

mouseArea.addEventListener("mousemove", (e: MouseEvent) => {
    let x: number = e.clientX - mouseArea.offsetLeft;
    let y: number = e.clientY - mouseArea.offsetTop;

    mouseLoc.innerText = "Mouse X: " + x + " Mouse Y: " + y;

    connection.send("SendMouseLoc", x, y);
});
