# SWEC18 Creative Coding Session

## Beispielrepo

Im folgenden Beispiel Repository finden sich zu jedem Gerät ausführliche Codebeispiele, die als Referenz (und natürlich zum herum spielen) heran gezogen werden können.
https://github.com/methodpark/swec18-creative-coding

Wenn ihr Lust habt könnt ihr mit eurem Projekt einen Pull Request stellen, dann haben wir im Anschluss eine kleine Sammlung spannender Beiträge die wir im Anschluss vorstellen können!

## Systemvoraussetzungen

* node.js (z.B. version 10, download unter https://nodejs.org/en/download/)
* eine Buildumgebung (z.B. MSVS, abhängig von eurem Betriebssystem)
* Python 2.7

Eine Detailanleitung zur Installation findet ihr unter: https://github.com/nodejs/node-gyp

Natürlich könnt ihr auch jede andere Programmierumgebung nutzen!
Dieses Cheatsheet bezieht sich allerdings nur auf Node.js / JavaScript.

## Installation

````bash
git clone git@github.com:methodpark/swec18-creative-coding.git

cd swec18-creative-coding

npm install
````

## Launchpad

Zum Interfacing wird das Modul `Lunchpad` eingesetzt.

### Initialisierung
````javascript
const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

lunchpad.initialize().then(launchpad => {
  // your code here
});
````
### Get + Set

`getSquare(x, y)`: fragt die Farbe eines Feldes ab<br>
`setSqare(x, y, color)`: setzt die Farbe eiens Feldes<br>
`getFunctionX(x)`: fragt die Farbe eines horizontalen Funktionsbuttons ab<br>
`setFunctionX(x, y, color)`: setzt die Farbe eines horizontalen Funktionsbuttons<br>
`getFunctionY(x, y)`: fragt die Farbe eines vertikalen Funktionsbuttons ab<br>
`setFunctionY(x, y, color)`: setzt die Farbe eines horizontalen Funktionsbuttons<br>
`clearSquares()`: setzt alle Felder zurück<br>
`clearAll()`: setzt alle Buttons zurück<br>

### Events

`launchpad.on('input', (x, y) => ...)`
Button Event mit den Koordinaten des Buttons

`launchpad.on('functionX', x => ...)`
Button Event für die horizontalen Funktions Buttons

`launchpad.on('functionY', y => ...)`
Button Event für die vertikalen Funktions Buttons

### Farben

Launchpad unterstützt drei Farben:
`Color.RED`, `Color.Amber` und `Color.Green`

Für jeder Farbe existieren drei Helligkeitsstufen:
````javascript
const myRed = Color.RED;
const lighterRed = myRed.lighter();
````

# DMX

