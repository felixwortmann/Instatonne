# Backend Tricks
### Running the Backend
1. Make sure, that the directory `/var/tmp/instatonne` exists. `mkdir /var/tmp/instatonne`
1. On the maven tab in Idea click on `reimport all maven projects`, that's the refresh button on the left.
1. Execute the maven goal `mvn clean install`.
1. Execute the maven goal `mvn clean compile`.
1. Build and run the project.

If errors occur, in the menu click on `File → Invalidate caches` and choose accordingly.
