### About-service

# To build:

- clone file
- npm install
- npm run build
- npm start

# To see client:

Navigate to:  http://localhost:3001


## Crud Methods:

Get Requests:
Get Host information:

curl -X GET 'http://localhost:3001/api/about/hosts/:id'

Get Review Info:

curl -X GET 'http://localhost:3001/api/about/reviews/:reviewId'

Update user rating:

curl -X PUT 'http://localhost:3001/api/about/hosts/:id/:rating'

Delete user:

curl -X DELETE 'http://localhost:3001/api/about/hosts/:id'

Create user:
curl -X POST -h 'Content-Type: application/json' -d '{"first_name":<string>, "last_name":<string>, "city": <string>, "state":<string>, "country": <string>, "joined_in_date":<date>, "description":<string>, "email":<string>, "photo_url":<string>}'

Note:  Date for user join date:  yyyy-mm-dd




