function setPosition(id, x, y) {
    let element = document.getElementById(id);
    element.style.left = y + "px";
    element.style.top = x + "px";
}

function sendDelta(url, action) {
    let delta = {type: "delta", action: move};
    const req = new Request(url);
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: delta,
    }


}
