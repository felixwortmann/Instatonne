# Backend Tricks

### Different Profiles and how to use them

For development purposes, the `dev` profile can be used. This effects the behavior
of the application in the following ways:
- If you visit the web frontend while developing, you do not always need to create a new profile
at Instatonne. Instead, using Sign In With Google automatically signs you in to the `dev` profile
in the application. Click the user icon in the top right to verify your currently logged in account.
- If you decide to test the API directly by using Postman or similar, Authentication is simplified.
Simply using a bearer token containing the username you want to impersonate is enough.
For example, setting the HTTP-Header `Authorization: Bearer anna` enables you to make API
requests on behalf of the user _anna_. For possible users and other initial testing data, see the file 
`src/main/kotlin/de/instatonne/backend/core/DBTestInit.kt`.

### Running the Backend

1. Make sure, that the directory `/var/tmp/instatonne` exists. `mkdir /var/tmp/instatonne`
1. On the maven tab in Idea click on `reimport all maven projects`, that's the refresh button on the left.
1. Execute the maven goal `mvn clean install`.
1. Execute the maven goal `mvn clean compile`.
1. Build and run the project.

If errors occur, in the menu click on `File → Invalidate caches` and choose accordingly.
