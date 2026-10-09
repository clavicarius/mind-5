# Zahlenfolge – Mechanikspezifikation

## Spielziel

Die spielende Person erkennt die Regel einer Zahlenfolge und trägt genau die nächste Zahl ein. Die Folge enthält nur ganze, nicht negative Zahlen. Die Regel muss aus allen gezeigten Zahlen ableitbar sein; bloßes Raten oder eine externe Rechenkenntnis ist nicht erforderlich.

## Altersgruppen

Regelarten und Bedienung sind für alle Altersgruppen gleich. Angepasst werden Zahlenraum, Wortwahl und Darstellung:

| Altersgruppe | Höchster Folgenterm | Darstellung |
| --- | ---: | --- |
| 8–12 | 100 | kurze Anweisung, übersichtliche Ziffern |
| 13–17 | 1.000 | neutrale Anweisung, Zahlen bis einschließlich 1.000 |
| 18+ | 10.000 | neutrale Anweisung, Zahlen bis einschließlich 10.000 |

Die Altersgruppe verändert nicht die geforderte Regel oder die Zahl der Folgenglieder. Es werden keine Dezimalzahlen, Brüche, Variablen oder kontextabhängigen Einheiten verwendet.

## Leicht und anspruchsvoll

| Schwierigkeit | Gezeigte Zahlen | Erlaubte Regelarten |
| --- | ---: | --- |
| Leicht | exakt 5 | konstante Differenz oder Multiplikation mit einem konstanten ganzzahligen Faktor |
| Anspruchsvoll | exakt 6 | abwechselnde Differenzen oder konstante zweite Differenz |

Leichte Folgen verwenden eine von null verschiedene konstante Differenz oder einen Faktor von 2 bis 4. Anspruchsvolle Folgen verwenden zwei verschiedene, abwechselnde ganzzahlige Differenzen oder eine von null verschiedene konstante zweite Differenz. Die generierte Folge und ihre Lösung müssen innerhalb des Zahlenraums der Altersgruppe bleiben. Anspruchsvoll verlangt eine mehrschrittige Regel, nicht lediglich größere Zahlen.

## Aufgabengenerierung

Die Engine erzeugt die Folge aus einer Regelvorlage mit explizit gespeicherten Parametern und der korrekten nächsten Zahl. Es werden nur die fünf beziehungsweise sechs bekannten Folgenglieder gezeigt; das nächste Glied bleibt leer. Die unterstützte Regelgrammatik ist auf die oben aufgeführten Regelarten beschränkt. Als Standard wird Build-Zeit-Generierung bevorzugt; handgebaute Folgen sind redaktionell zu prüfen.

Die Engine darf nur Folgen ausgeben, bei denen alle sichtbaren Glieder und die Lösung ganzzahlig, nicht negativ und im Altersgruppen-Zahlenraum sind. Parameter, Folge, Regelbeschreibung und Lösung werden gemeinsam gespeichert, damit Feedback und Validierung dieselbe Regelgrundlage verwenden.

## Eingabe

Die Antwort erfolgt als frei eingegebene ganze Zahl, ohne Antwortoptionen. Ein optionales führendes Pluszeichen ist zulässig; Leerzeichen am Anfang oder Ende werden entfernt. Dezimaltrennzeichen, Tausendertrennzeichen, Buchstaben und leere Eingaben sind ungültig und können nicht abgesendet werden. Die Eingabe muss im Zahlenraum der Altersgruppe liegen.

Vor dem Absenden kann die Eingabe geändert werden. Erst die ausdrückliche Schaltfläche „Prüfen“ macht sie verbindlich. Tastatur- und Touch-Bedienung müssen gleichermaßen möglich sein; eine Fehlermeldung darf nicht allein durch Farbe vermittelt werden.

## Fehler

Eine gültige, aber falsche Zahl zählt als ein Fehler und wird mit klarer visueller und textlicher Rückmeldung markiert. Ungültige oder leere Eingaben zählen nicht als Fehler. Nach einer falschen Antwort bleibt die Aufgabe mit leerem Eingabefeld für einen weiteren Versuch offen; dieselbe Folge wird nicht verändert. Der dritte Fehler beendet die Aufgabe gemäß den allgemeinen Aufgabenregeln und ergibt null Punkte.

## Undo und Neustart

Vor dem Absenden kann „Rückgängig“ die zuletzt eingegebene Ziffer löschen; bei einer führenden Null oder einem Vorzeichen wird die Eingabe entsprechend geleert. Eine bereits geprüfte Antwort kann nicht zurückgenommen werden.

Ein Neustart ist nur nach Bestätigung möglich. Er leert die Eingabe und entfernt die aktuelle Rückmeldung, zeigt aber dieselbe Folge erneut. Bereits verbrauchte Fehler sowie verwendete Hinweise und deren Punktabzüge bleiben erhalten. Neustarts sind möglich, solange die Aufgabe nicht abgeschlossen ist und noch Fehler verfügbar sind.

## Hinweise

Es gibt höchstens zwei aufeinander aufbauende Hinweise. Der erste benennt die Regelart, ohne einen Folgenterm zu nennen. Der zweite erläutert die wiederkehrende Veränderung, nennt aber nicht ausdrücklich die gesuchte nächste Zahl.

Für 8–12 und 13–17 ist der erste Hinweis kostenlos. Für 18+ reduziert er die erreichbaren Punkte um 10. Der zweite Hinweis reduziert die erreichbaren Punkte für alle Altersgruppen zusätzlich um 20. Die Abzüge werden gemäß dem gemeinsamen Bewertungsmodell vom ungerundeten Aufgaben-Ausgangswert abgezogen und können die erreichbare Punktzahl nicht unter null senken.

## Punkte

Bei richtiger Antwort erhält die Aufgabe die nach dem gemeinsamen Bewertungsmodell erreichbaren Punkte. Falsche Versuche bringen keine Teilpunkte und ziehen keine zusätzlichen Punkte ab; die dritte falsche Antwort beendet die Aufgabe mit null Punkten. Überspringen, Lösung anzeigen und sonstiger vorzeitiger Abbruch werden gemäß den allgemeinen Aufgabenregeln mit null Punkten gewertet. Die Aufgabenpunkte werden erst bei endgültigem Abschluss kaufmännisch gerundet.

## Lösung und Feedback

Nach einer falschen Antwort wird nur mitgeteilt, dass die Eingabe falsch ist; die richtige Zahl und Regel werden nicht verraten. Bei richtiger Antwort wird zunächst „Richtig“ angezeigt. Nach der erforderlichen Bestätigung zum Abschließen zeigt die Lösung die vollständige Folge, die Regelbeschreibung mit ihren Parametern und die Berechnung des nächsten Glieds. Die vollständige Lösung wird ebenfalls nach Überspringen, angezeigter Lösung oder Aufgabenende durch den dritten Fehler gezeigt. Diese Fälle bleiben gemäß den allgemeinen Regeln bei null Punkten.

## Validierung

Jede generierte Folge wird automatisiert geprüft:

- sichtbare Anzahl der Folgenglieder und Regelart entsprechen der Schwierigkeit;
- sämtliche sichtbaren Glieder und die nächste Zahl sind ganzzahlig, nicht negativ und innerhalb des Altersgruppen-Zahlenraums;
- die gespeicherte Regel erzeugt alle sichtbaren Glieder und die angegebene Lösung;
- mindestens eine Regel aus der unterstützten Regelgrammatik passt zur Folge;
- alle passenden Regeln aus der unterstützten Grammatik ergeben dieselbe nächste Zahl;
- die Regelbeschreibung und die in der Lösung angezeigte Berechnung stimmen mit den gespeicherten Parametern überein.

Eindeutigkeit bezieht sich ausdrücklich auf die unterstützte Regelgrammatik, nicht auf beliebige mathematische Funktionen. Bei fehlgeschlagener Validierung wird die Folge verworfen und neu erzeugt; sie darf nicht im Spiel erscheinen. Handgebaute Folgen durchlaufen dieselben automatisierten Prüfungen und zusätzlich eine redaktionelle Prüfung.
