# SWEC18 Creative Coding Session

## Beispiel Repoistory

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

`launchpad.on('input', (x, y) => ...)`<br>
Button Event mit den Koordinaten des Buttons

`launchpad.on('functionX', x => ...)`<br>
Button Event für die horizontalen Funktions Buttons

`launchpad.on('functionY', y => ...)`<br>
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

Über das `dmx` Modul wird mit dem DMX Universum interagiert.

````javascript
const DMX = require('dmx');

const Fixture = require('./lib/Fixture');
const getUniverse = require('./lib/getUniverse');

// erzeugt ein universe für das usbPro interface
getUniverse('usbPro').then(universe => {
  const fixture = new Fixture(1, universe);

  fixture.brightness(1);
  fixture.color('fuchsia');
});
````

Alternativ kann auch der Debug Treiber verwendet werden:
````javascript
getUniverse('debug').then(universe => {
  // ...
});
````

## Fixture

Die Fixture Klasse abstrahiert das Setzen von Farbwerten und der Helligkeit eines Lichtelementes.
````javascript
const fixture = new Fixture(basePort, universe);

fixture.brightness(1);    // ein Wert zwischen 0 und 1
fixture.color('fuchsia'); // ein benannter Farbwert oder Hexvalue (#f00)
````