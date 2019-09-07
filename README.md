# The API for converting HTML to image

## Getting Started

```bash  
docker-compose build 
docker-compose up 
docker-compose down 
```

## Usage

### POST /image
convert HTML to image

- Request JSON Message
  
  - Headers
  
    Accept: application/json
  
  - Body

    {"html": [your HTML encoded to base64]}

- Response 200 (application/json)

  - Body

    {"response": "OK", "image": [image created form HTML and encoded to base64]}

    or

    {"response": "NG", "image": [image created from HTML and encoded to base64]}
