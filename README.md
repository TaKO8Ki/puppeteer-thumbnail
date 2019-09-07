# The API for converting HTML to image

## Getting Started

```bash  
make build 
make up 
make down 
```

## Usage

### POST /image
convert HTML inside "div#image" to image

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
    {"response": "OK", "image": [image created from HTML and encoded to base64]}
    ```

    or

    ```bash
    {"response": "NG", "image": [image created from HTML and encoded to base64]}
    ```

## Example

<details>
<summary>click and see the example</summary>
<br>

```bash
html='
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body><div id="image">
    <div class="content">
      <p class="text">hoge</p>
    </div>
  </div>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    #image {
      display: table;
      text-align: center;
      padding: 0px 30px;
      width: 540px;
      height: 314px;
      background: #16a085;
    }

    #image div.content {
      font-size: 25px;
      font-weight: bold;
      display: table-cell;
      vertical-align: middle;
      word-break: break-all;
    }

    #image p.text {
      background: #fff;
      border-radius: 10px;
      padding: 110px 0px;
    }
  </style> 
  </body>
</html>
'

echo -n $html | base64
# PGh0bWw+IDxoZWFkPiA8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+IDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSI+IDxsaW5rIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1NK1BMVVMrUm91bmRlZCsxYyZhbXA7ZGlzcGxheT1zd2FwIiByZWw9InN0eWxlc2hlZXQiPiA8bGluayByZWw9InN0eWxlc2hlZXQiIHR5cGU9InRleHQvY3NzIiBocmVmPSJsb2NhbGhvc3Q6c3R5bGVzaGVldC9hcHBsaWNhdGlvbi5jc3MiPiA8L2hlYWQ+IDxib2R5PjxkaXYgaWQ9ImltYWdlIj4gPGRpdiBjbGFzcz0iY29udGVudCI+IDxwIGNsYXNzPSJ0ZXh0Ij5ob2dlPC9wPiA8L2Rpdj4gPC9kaXY+IDxzdHlsZT4gYm9keSB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgfSAjaW1hZ2UgeyBkaXNwbGF5OiB0YWJsZTsgdGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiAwcHggMzBweDsgd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDMxNHB4OyBiYWNrZ3JvdW5kOiAjMTZhMDg1OyB9ICNpbWFnZSBkaXYuY29udGVudCB7IGZvbnQtc2l6ZTogMjVweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGRpc3BsYXk6IHRhYmxlLWNlbGw7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfSAjaW1hZ2UgcC50ZXh0IHsgYmFja2dyb3VuZDogI2ZmZjsgYm9yZGVyLXJhZGl1czogMTBweDsgcGFkZGluZzogMTEwcHggMHB4OyB9IDwvc3R5bGU+IDwvYm9keT4gPC9odG1sPg==

# request
curl -X POST -H "Content-Type: application/json" -d '{"html": [the above code]}' localhost:3000/image

# response
{"response": "OK", "image": "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H330UURE9OjRI0aMGFHs37t3b7H+/PPPi3Xv3r1jyJAhERFx4MCB2LdvX3HbXXfdVVxx/s/fxvz666//sicG8D0EFlCqY8eOFW/1RURUVv7PR0Orqqo63ferr74q1kuWLCnWzz//fOzYsSN2794dTz31VLH/oYceipqamoj4bjitWLEiTp069Z2fO+64I+eJAd2aD7kDperdu3dUVVVFe3t7RESn2Dq977S+ffsW6xtuuCEGDhwYM2bMiCNHjsSYMWOioqIi6uvrY9q0aXHLLbfENddc872PjYg4fPjwmXg6ABHhDBZwDhgzZkyx/vLLL4v1oUOHOt1v7NixnbZfe+216NmzZ3z22WfR3t4ex48fj927d8err77aKa4iIgYMGBCDBg0qtt96663MpwDQicACSjdv3rxivX379mK9devWYl1XVxdXXXVVsf3EE0/E008/He3t7bFhw4Y4efLkDx5n7ty5xbq1tTXuvvvuIs4OHDgQGzdudGYLSCGwgNLdfvvt0dzcHBER77zzTrz99ttx+PDhePzxxyPiT5/L+tWvfhXV1dXFY5555pmI+NP/KJw6dWr07Nmz+NB6TU1NjB49OhYvXtzpg+0PPvhgNDU1FduPPvpoDBs2LHr16hX19fUxceLE+PTTT8/GUwa6OIEFpNiwYUNcffXVnfbdeOON8frrr8fOnTtj8uTJnW677bbb4sknn4yIiAsuuCBaWlri4YcfjnHjxsWUKVNi0KBB0dbWFnPnzo3W1tZOFxmNiJg/f/7/Ocs333wTbW1tsXz58rjyyiuL7yPs169ftLa2xrJly2LChAlRW1sblZWV0djYGDNmzIjVq1fHuHHjMl4OoJuraFi17NQP3y3f3hvuLeOwQBeycOHCePbZZ3/wfps3b47x48efhYmAc82gXz9cynGdwQLOS/fee2+sWrUqrr/++jhx4kSnSy0cOnSo05Xje/TwTx1wdrlMA3DeWbduXTzyyCMREXHfffd9J6D69+8fw4cPj4iIkSNHxiWXXHLWZwS6N3/WAeed0aNHR11dXURELF26NNra2qKjoyOOHz8e27Zti/vvvz9WrlwZjY2N8eKLLzqDBZx1zmAB552hQ4fGBx98ECtXroz169dHc3NzHDlyJCorK+Oiiy6KpqamWLFiRSxYsKDTV+8AnC0CCzgvDR8+PJYvX172GADfy3lzAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJKVFlj7j31T1qEBgG6gzNYoLbD+84u9ZR0aAOgGymwNgQUAdEkCCwAgWbcMrDd3bY+PD+0r6/AAQBfWdnh/vLFre2nHLy2wvu1oj1/+7jfRfvJEWSMAAF1Q+8kT8Y//9q9xtKO9tBlKvUzDx4f2xUPvt5Q5AgDQxTz0fku0Hd5f6gyVpR49Iv5l6+/j2ImOeOCyv4sLK3uVPQ4AcJ768vixuG/Tb+PF/9pS9ihR0bBq2amyh4iIGFbTL56Y+PP46cU/KnsUAOA8s3HPH+KXv3s19nz7ddmjRMQ5FFinjay9KJovHh4/aRgWPxk0PIbW9Ct7JADgHLP7m6+ide8fo3Xvrnh37x9jx5cHyx6pk3MusAAAzne+ixAAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGQCCwAgmcACAEgmsAAAkgksAIBkAgsAIJnAAgBIJrAAAJIJLACAZAILACCZwAIASCawAACSCSwAgGT/DUTCgsuibRf1AAAAAElFTkSuQmCC"}
```

</details>

You can view your image the following URL (Data URI scheme).


```
data:image/png;base64,[image encoded to base64]
```
