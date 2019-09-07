# The API for converting HTML to image

## Getting Started

```bash  
make build 
make up 
make down 
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


You can view your image the following URL (Data URI scheme).


```
data:image/png;base64,[image encoded to base64]
```
