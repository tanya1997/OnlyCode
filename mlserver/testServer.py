from http.server import HTTPServer, BaseHTTPRequestHandler
import base64
import json
import logging

from ml import ml_awesome

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):


    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itsel
        prompt = post_data.decode('utf-8')
        print(prompt)
        
        self._set_response()
        self.wfile.write(b'{"id":"42"}')
        ml_awesome(self,prompt)

    def do_GET(self):
        self._set_response()
        try:
            with open('image1.png', 'rb') as img:
                img = base64.b64encode(img.read()).decode('utf-8')
                respond = b'{"image":"'+img.encode()+b'"}'
                self.wfile.write(respond)
        except:
            self.wfile.write(b'{"image":"not found"}')

httpd = HTTPServer(('0.0.0.0', 3002), SimpleHTTPRequestHandler)
httpd.serve_forever()