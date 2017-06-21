import os.path, random

from flask import Flask, Response

app = Flask(__name__)
app.config.from_object(__name__)

def root_dir():
    return os.path.abspath(os.path.dirname(__file__))

def random_file():
    try:
        random_image = random.choice([
            x for x in os.listdir(full_path)
            if os.path.isfile(os.path.join(full_path, x))
            if os.path.join(full_path, x).endswith(".jpeg")
            or os.path.join(full_path, x).endswith(".jpg")
            or os.path.join(full_path, x).endswith(".gif")
            or os.path.join(full_path, x).endswith(".png")
        ])
        return random_image
    except IOError as exc:
        return str(exc)

def get_file(filename): 
    try:
        src = os.path.join(full_path,filename)
        return open(src).read()
    except IOError as exc:
        return str(exc)

@app.route('/', methods=['GET'])
def metrics():
    image_to_display = random_file()
    content = get_file(image_to_display)
    return Response(content, mimetype="image/jpeg")

if __name__ == '__main__':
    full_path = root_dir() + "/resources"
    app.run(port=80)