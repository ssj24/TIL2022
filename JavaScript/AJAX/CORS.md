# CORS

cross origin resource sharing



SOP(same origin policy) is one of the browser's built-in security mechanisms against attacks

cross-origin request is controlled by CORS policy

## SOP

same origin policy

SOP is followed by XMLHttpRequest & Fetch

AJAX(JS) can only make calls to URLS that live on the same origin

- same origin
  - same protocol: http / https
  - same port: http's default port is 80
  - same host: the name of the website
- http://yoursite.com:80
  - http://yoursite.com/dir1/about.html same
  - https://youtsite.com/index.html cross(protocol)
  - http://yoursite.com:82/dir1/index.html cross(port)
  - http://externalsite.com:80 cross(host)



## CORS

- cors is a policy to relax the rules of SOP

  SOP does not block all cross-origin resources

  yes, it does not.

  Otherwise CDN's would not work

  jQuery script(CDN) in your project is also cross-origin

- SOP is far from perfect

- CORS (2006) is a specification

- CORS allows a server to define what origins it will share resource with

  - Access-Control-Allow-Origin: https://yourseite.com

    if you use * instead of an array, it means anyone                       

- A CORS request can either be simple/prflight

  - simple

    - content-typescriptpe: get, post, head
    - orgin: header(browser)
    - Access-Control-Allow-Origin(server)

  - head method

    - requests HTTP only headers(not body) from the server
    - just like HTTP GET method
    - head method is much faster than get method
    - if the amount of data needs to be transferred is small, use head

  - who uses this header? 

    - the browser

    1. to update cached data
    2. to check whether a resource has been modified since the last time it was accessed
    3. to check whether a resource is available for download

  - check if a example.png file exists on th eserver

    - both GET and HEAD returns 200 if Yes, 401 if No
    - GET returns png file in the body if there is
    - HEAD uses no extra megabytes of traffic

  - check index.html file was last modified

    - HEAD returns the full headers from the server
    - check LastModified, ContentLength headers to decide if we want to re-download a given resource using GET request