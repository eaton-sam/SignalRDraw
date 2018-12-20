
//connection.on("ReceiveMouseLoc", (name: string, x: number, y: number) => {
//    console.log(`Recieved: ${name} ${x} ${y}`);
//    let el = mouseArea.querySelectorAll('[data-name="' + name + '"]');
//    let mousePointer: HTMLDivElement;
//    if (el.length > 0) {
//        mousePointer = <HTMLDivElement>el[0];       
//    }
//    else {
//        mousePointer = <HTMLDivElement>document.createElement("span");
//        mousePointer.className = "mouse-pointer";
//        mousePointer.setAttribute("data-name", name);

//        let mouseImg = <HTMLImageElement>document.createElement("img");
//        mouseImg.src = "/images/pointer.svg";  
//        mousePointer.appendChild(mouseImg);

//        mouseArea.appendChild(mousePointer);  
//    }

//    mousePointer.setAttribute("style", "top: " + y + "px; left: " + x + "px");
//});

//connection.on("ReceiveMouseClick", (name: string, x: number, y: number) => {
//    console.log(`Recieved: ${name} ${x} ${y}`);

//    let clickPaint = document.createElement("div");
//    clickPaint.className = "mouse-click";
//    clickPaint.setAttribute("style", "top: " + y + "px; left: " + x + "px");
//    mouseArea.appendChild(clickPaint);
//});

//mouseArea.addEventListener("mousemove", (e: MouseEvent) => {
//    let x: number = e.clientX - mouseArea.offsetLeft;
//    let y: number = e.clientY - mouseArea.offsetTop;

//    mouseLoc.innerText = "Mouse X: " + x + " Mouse Y: " + y;

//    connection.send("SendMouseLoc", x, y);
//});

//mouseArea.addEventListener("click", (e: MouseEvent) => {
//    let x: number = e.clientX - mouseArea.offsetLeft;
//    let y: number = e.clientY - mouseArea.offsetTop;

//    connection.send("SendMouseClick", x, y);
//});