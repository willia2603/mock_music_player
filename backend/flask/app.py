from flask import Flask

# __name__ -> name of the current Python module -> variable __name__ is used to tell where application is located. This is required to set some paths used by Flask applications
# init app -> pass __name__ top id app and know in which package to look for resources
app = Flask(__name__)
print(__name__)
# use the route() decorator to tell Flask what URL should trigger our 'hello_world' function.
@app.route("/")
# In the browser: the default content type is HTML, so HTML in the string will be rendered by the browser.
def hello_world():
    return "<p>Hello, World!</p>"
    # return 'The value of __name__ is {}'.format(__name__)
    
# change ports: flask run -p 3000, or export FLASK_RUN_PORT=8000