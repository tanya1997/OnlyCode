from http.server import HTTPServer, BaseHTTPRequestHandler
import base64
import json
import logging
from threading import Thread
from ml_script import ml_awesome, get_uuid
import urllib.parse as urlparse

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):


    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itsel
        print("post_data")
        print(post_data)
        prompt = post_data.decode('utf-8')
        print("prompt")
        print(prompt)
        y = json.loads(prompt)
        print(y["product"])
        print(prompt)
        id = get_uuid()
        respond = b'{"id":"' + id.encode() + b'"}'
        self._set_response()
        self.wfile.write(respond)
        
        thread = Thread(target=ml_awesome, args=[y, id])
        thread.start()
        '''ml_awesome(y["product"], id)'''

    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        print("self.path")
        print(self.path)
        
        print("parsed_path")
        print(parsed_path)
        id = urlparse.parse_qs(parsed_path.query)['id']
        print(id)
        self._set_response()
        arr = []
        try:
            print("path")
            for seed in range(3):
                path = f'image_{seed}_'+id[0]+'.png'
                print(path)
                with open(path, 'rb') as img:
                    img = base64.b64encode(img.read()).decode('utf-8')
                    arr.append(img)
        except:
            print("err")
        dump = json.dumps(arr)
        self.wfile.write(dump.encode())

httpd = HTTPServer(('0.0.0.0', 3002), SimpleHTTPRequestHandler)
httpd.serve_forever()