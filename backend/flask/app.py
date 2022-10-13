from flask import Flask, send_from_directory

# ** __name__ -> name of the current Python module -> variable __name__ is used to tell where application is located. This is required to set some paths used by Flask applications. Here init app -> pass __name__ top id app and know in which package to look for resources
app = Flask(__name__)

# ** use the route() decorator to tell Flask what URL should trigger our 'hello_world' function.
@app.route("/")
# In the browser: the default content type is HTML, so HTML in the string will be rendered by the browser.
def hello_world():
    return "<p>Hello, World!</p>"
    # return 'The value of __name__ is {}'.format(__name__)

# ** You can add variable sections to a URL by marking sections with <variable_name>. 
# ** Your function then receives the <variable_name> as a keyword argument. 
# Optionally, you can use a converter to specify the type of the argument like <converter:variable_name>.
# converter types: string (with no /), int, float, path, uuid
@app.route("/static/<path:path>")
def static_dir(path):
    return send_from_directory("static", path)
    
    
    
    
    
    
# add this to only run python3 app.py instead of flask run
# if __name__ == '__main__':
#     app.run(host="localhost", port=5000, debug=True)