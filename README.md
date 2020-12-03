# JWT service for Kore public apis
This is the JWT service code to generate the JWT token for accessing public APIs of Kore.ai bots platform. The token generated is valid for 4 hours.

# Request:
body:
{
 "appId" : "app id created in kore platform"
}

headers:
apikey : "client secret of the app created"

Response:
{
    "jwt": "jwt token"
}
