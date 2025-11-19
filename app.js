const mode = document.getElementById("mode");
const promptEl = document.getElementById("prompt");
const extra = document.getElementById("extra");
const result = document.getElementById("result");

mode.addEventListener("change", ()=>{
    if(mode.value === "image"){
        extra.innerHTML = `<label>Size</label>
            <select id="size"><option>512x512</option><option>1024x1024</option></select>`;
    } else if(mode.value === "video"){
        extra.innerHTML = `<label>Duration</label>
            <input id='duration' type='number' value='6' />`;
    } else if(mode.value === "audio"){
        extra.innerHTML = `<label>Voice</label>
            <input id='voice' placeholder='alloy' />`;
    } else extra.innerHTML = "";
});

async function generate(){
    const payload = {
        mode: mode.value,
        prompt: promptEl.value,
        size: document.getElementById("size")?.value,
        voice: document.getElementById("voice")?.value,
        duration: document.getElementById("duration")?.value
    };

    result.innerHTML = "Generating...";

    const res = await fetch("server.php",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    });

    const data = await res.json();
    render(data);
}

function render(data){
    result.innerHTML = "";

    if(data.text){
        result.innerHTML = `<pre>${data.text}</pre>`;
    }
    if(data.image){
        result.innerHTML = `<img src='${data.image}' />`;
    }
    if(data.audio){
        result.innerHTML = `<audio controls src='${data.audio}'></audio>`;
    }
    if(data.video){
        result.innerHTML = `<video controls src='${data.video}'></video>`;
    }
}

document.getElementById("generateBtn").onclick = generate;