# Anon

## Users​

List of available endpoints:
​

-   `POST /user/register`
-   `POST /user/login`
-   `PATCH /user/:id`
-   `PATCH /user/buy-item/:id` 

### POST /user/register

Request:

-   data:

```json
{
    "email": "tombradyisold@mail.com",
    "username": "blablabla",
    "password": "12345"
}
```

Response:

-   status: 201
-   body:

```json
{
    "id": 8,
    "username": "blablabla",
    "email": "tombradyisold@mail.com",
    "avatar": "https://avatars.dicebear.com/api/bottts/anon-168.svg"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### POST /user/login

Request:

-   data:

```json
{
    "email": "user1@mail.com",
    "password": "12345"
}
```

```json
{
    "username": "blablabla",
    "password": "12345"
}
```

Response:

-   status: 200
-   body:
    ​

```json
{
    "id": 1,
    "username": "blablabla",
    "email": "user1@mail.com",
    "avatar": "https://avatars.dicebear.com/api/bottts/anon-123.svg",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMjUzMjYwfQ.jDvducDr5A43oP5uuT4p-ZGRJpl8qhftkUefXogFxJ4"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### PATCH /user/:id

Request:

-   data:

```json
{
    "avatar": "https://avatars.dicebear.com/api/bottts/anon-123.svg"
}

```

Response:

-   status: 200
-   body:

```json
{
    "id": 2,
    "username": "masteradmin",
    "email": "masteradmin@mail.com",
    "avatar": "https://avatars.dicebear.com/api/bottts/anon-123.svg"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```




### PATCH /user/buy-item/:id

Request:

-   data:

```json
{
    "price": "integer"
}

```

Response:

-   status: 200
-   body:

```json
{
    "id": 2,
    "username": "masteradmin",
    "email": "masteradmin@mail.com",
    "wallet": 10000
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

## Hiss

List of available endpoints:
​

-   `GET /hiss`
-   `POST /hiss`
-   `GET /hiss/:id`
-   `PUT /hiss/:id`
-   `PATCH /hiss/:id`
-   `DELETE /hiss/:id`

### GET /hiss

Request:

Response:

-   status: 200
-   body:
    ​

```json
[
    {
        "id": 1,
        "contents": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
        "UserId": 2,
        "createdAt": "2021-09-10T04:27:26.382Z",
        "updatedAt": "2021-09-10T04:27:26.382Z"
    },
    {
        "id": 2,
        "contents": "I just thinking nachos",
        "UserId": 1,
        "createdAt": "2021-09-10T04:34:40.800Z",
        "updatedAt": "2021-09-10T04:34:40.800Z"
    },
    {
        "id": 5,
        "contents": "Hahahaha life is funny",
        "UserId": 1,
        "createdAt": "2021-09-10T05:58:18.979Z",
        "updatedAt": "2021-09-10T05:58:18.979Z"
    }
]
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### POST /hiss

Request:

-   data:

```json
{
    "content": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
    "image" : "<file | optional>"
}
```

Response:

-   status: 200
-   body:
    ​

```json
{
    "id": 8,
    "content": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
    "image_url": "https://ik.imagekit.io/ay4wotu5yqh/ANON2021-10-20T16_22_59.874Zbird-thumbnail_U_d0WPuM9.jpg",
    "like": 0,
    "UserId": 1,
    "updatedAt": "2021-10-20T16:23:01.191Z",
    "createdAt": "2021-10-20T16:23:01.191Z"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### DELETE /hiss/:id

Response:

-   status: 200
-   body:
    ​

```json
{
    "message": "hiss has been deleted!"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

List of available endpoints:
​

-   `POST /transaction/midtransToken`
-   `POST /transaction`
-   `GET /transaction`
-   `PATCH /transaction/:transactionId`

## Transactions

### Request Midtrans Token

Membuat token pembayaran midtrans 

-   **URL**

    `/transaction/midtransToken`

-   **Method:**

    `post`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```
-   **Body:**

    ```json
    {
    	"price": "number"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "token": "eabb7088-72c3-43e3-af7d-5e3ad3996c07",
            "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/eabb7088-72c3-43e3-af7d-5e3ad3996c07"
        }
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Create Transaction

Menambahkan data transaksi di database 

-   **URL**

    `/transaction`

-   **Method:**

    `post`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```
-   **Body:**

    ```json
    {
    	"order_id": "<orderid midtrans>",
    	"transaction_status": "<status transaction>",
    }
    ```

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**

        ```json
        {
            "id": 13,
            "order_id": "<orderid midtrans>",
            "status": "pending",
            "userId": 1,
            "recipeId": 1,
            "updatedAt": "2021-09-10T07:01:47.870Z",
            "createdAt": "2021-09-10T07:01:47.870Z"
        }
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### View Transaction

Menampilakan data transaction user

-   **URL**

    `/transaction`

-   **Method:**

    `get`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        [
            {
                "id": 13,
                "order_id": "<orderid midtrans>",
                "status": "pending",
                "UserId": 1,
                "price": 1,
                "createdAt": "2021-09-10T07:01:47.870Z",
                "updatedAt": "2021-09-10T07:01:47.870Z",
            }
        ]
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Update status transaction

Mengupdate status transaction

-   **URL**

    `/transaction/:transactionId`

-   **Method:**

    `patch`
-   **Url Params:** `transactionId=number`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message" : "Transaction succesfully updated" 
        }
        ```
    -   **Code:** 202 <br />
        **Content:**

        ```json
        {
            "message" : "Transaction isn't payed yet" 
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Transaction Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```
    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---
