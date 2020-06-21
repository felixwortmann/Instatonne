# Instatonne 🗑️

## Testen & lokal ausführen

Im Hauptverzeichnis `docker-compose up --build` ausführen und warten, bis abgeschlossen.
Dann im Browser (idealerweise Chrome) auf http://localhost gehen. Wichtig: Nicht manuell den Port 80 angeben, da sonst Sign In With Google nicht funktioniert.

Zum Anmelden oben rechts auf der Nutzer-Icon klicken. Falls die automatische Weiterleitung nicht klappt, manuell auf http://localhost/login gehen und dort mit Google-Profil anmelden.
Dann können Beiträge gepostet werden und andere Nutzer gefunden (zum Testen 'a' in die Suchleiste eingeben, mit diesem Namen gibt es einige Nutzer). Beiträge können über den Plus-Button
gepostet werden.
Um mehrere Benutzer zu testen entweder mit mehreren Google-Accounts anmelden, dann funktionieren auch die Echtzeitnachrichten.
Alternativ auf it.timgrohmann.de in der live deployten Version der Seite testen.


[instatonne.openapi.yml](https://github.com/felixwortmann/Instatonne/blob/master/instatonne.openapi.yml) is the single source of API-trust.
Frontend and backend will be generated from this spec.
Please do not add stuff to the API without adding to the spec :)

## Node & NPM versions
- npm: 6.9.0
- node: v10.16.3

[Readme](https://github.com/felixwortmann/Instatonne/blob/master/CONTRIBUTING.md)

## Spring Profile

Für Testdaten und ein verändertes Anmeldeverhalten (keine Registrierung notwendig, angemelteder Nutzer ist automatisch "dev"),
kann das Spring-Profil `dev` aktiviert werden.
