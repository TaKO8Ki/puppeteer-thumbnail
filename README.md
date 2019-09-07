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

    ```bash
    {"html": [your HTML encoded to base64]}
    ```

- Response 200 (application/json)

  - Body

    ```bash
    {"response": "OK", "image": [image created form HTML and encoded to base64]}
    ```

    or

    ```bash
    {"response": "NG", "image": [image created from HTML and encoded to base64]}
    ```
<br>
You can view your image the following URL (Data URI scheme).

```bash
data:image/png;base64,[image encoded to base64]
```
