from flask import Flask, request, jsonify
import os, requests

app = Flask(__name__)
OPENAI_KEY = os.getenv("OPENAI_KEY")

@app.post('/generate')
def generate():
    data = request.json
    mode = data.get("mode")
    prompt = data.get("prompt")

    if mode == "text":
        return generate_text(prompt)
    if mode == "image":
        return generate_image(prompt, data.get("size","1024x1024"))
    if mode == "audio":
        return generate_audio(prompt)
    if mode == "video":
        return generate_video(prompt)

    return jsonify({"error":"invalid mode"})

def generate_text(prompt):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization":f"Bearer {OPENAI_KEY}"}
    body = {
        "model":"gpt-4o-mini",
        "messages":[{"role":"user","content":prompt}]
    }
    r = requests.post(url, json=body, headers=headers)
    text = r.json()["choices"][0]["message"]["content"]
    return jsonify({"text":text})

def generate_image(prompt,size):
    url = "https://api.openai.com/v1/images/generations"
    headers = {"Authorization":f"Bearer {OPENAI_KEY}"}
    body = {"prompt":prompt,"size":size,"n":1}
    r = requests.post(url, json=body, headers=headers)
    img = r.json()["data"][0].get("url")
    return jsonify({"image":img})

def generate_audio(prompt):
    # placeholder example
    return jsonify({"audio":"audio-file-url.mp3"})

def generate_video(prompt):
    # placeholder example
    return jsonify({"video":"video-file-url.mp4"})

if __name__ == '__main__':
    app.run(debug=True)