# Anon

## Users​

List of available endpoints:
​

-   `POST /register`
-   `POST /login`

### POST /register

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
    "username": "blablabla",
    "id": 8,
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

### POST /login

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
    "contents": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
    "image": "url"
}
```

Response:

-   status: 200
-   body:
    ​

```json
{
    "id": 1,
    "contents": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
    "image": "url",
    "UserId": 2,
    "updatedAt": "2021-09-10T04:27:26.382Z",
    "createdAt": "2021-09-10T04:27:26.382Z"
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

## Payment


List of available endpoints:
​

-   `POST /create-payment-token`
-   `POST /create-transaction`
-   `GET /show-all-transaction`
-   `PATCH /update-status`

####
required: 

Headers: {
    access_token
}