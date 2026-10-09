# Raster-Logik – V1-Standardprofil

## Spielziel und Aufgabenaufbau

Die Aufgabe zeigt ein 3×3-Raster aus Kacheln, bei dem genau eine Kachel fehlt. Die spielende Person wählt aus vorgegebenen Kacheln diejenige aus, die das Raster regelgerecht vervollständigt. Jede Kachel besteht aus einem oder zwei klar unterscheidbaren Merkmalen, zum Beispiel Form und Füllung. Die Regeln werden in der Aufgabe nicht vorab genannt.

Für jedes verwendete Merkmal gelten dieselben Rasterregeln: In jeder Zeile und jeder Spalte kommt jeder der drei Merkmalswerte genau einmal vor. Bei zwei Merkmalen gelten die Regeln unabhängig voneinander. Das fehlende Feld wird aus den jeweils fehlenden Werten seiner Zeile und Spalte bestimmt. Es gibt genau eine richtige Kachel, die alle Regeln erfüllt.

## Altersgruppen

Die Grundregeln, Rastergröße und Bedienung sind für alle Altersgruppen gleich. Altersgerecht angepasst werden Motive, Kontrast und Bezeichnungen:

- **8–12:** vertraute, deutlich unterscheidbare Formen und Muster; kurze, konkrete Anweisung.
- **13–17:** neutrale geometrische Symbole und reduzierte Gestaltung; knappe, altersneutrale Anweisung.
- **18+:** abstrakte, sachlich gestaltete Symbole; gleiche klare Unterscheidbarkeit ohne dekorative Hinweise.

Farbe ist nie das einzige unterscheidende Merkmal. Jeder Wert ist zusätzlich durch Form, Muster, Symbol oder Text erkennbar; Spezialwissen ist nicht erforderlich.

## Leicht und anspruchsvoll

| Schwierigkeit | Regeln | Antwortoptionen |
| --- | --- | ---: |
| Leicht | Ein Merkmal; jede Zeile und Spalte enthält jeden der drei Werte genau einmal. | exakt 4, davon 1 richtig |
| Anspruchsvoll | Zwei unabhängige Merkmale; die Zeilen- und Spaltenregel gilt für beide Merkmale. | exakt 5 oder 6, davon 1 richtig |

Anspruchsvoll erfordert, die fehlenden Werte beider Merkmale zu verknüpfen; größere Zahlen, kleinere Symbole oder zusätzliche Rasterfelder sind keine Schwierigkeitssteigerung. Das Raster bleibt in beiden Stufen 3×3 und enthält genau eine Lücke.

## Beispiele

Die folgenden Beispiele zeigen die Regel in der Aufgabe nicht vorab; sie wird hier nur zur Erklärung benannt. `□` markiert die Lücke.

**Leicht – Formen:** In jeder Zeile und Spalte kommt Kreis, Dreieck und Quadrat je einmal vor.

|  |  |  |
| --- | --- | --- |
| Kreis | Dreieck | Quadrat |
| Dreieck | Quadrat | Kreis |
| Quadrat | Kreis | □ |

In der letzten Zeile fehlt das Dreieck; auch in der letzten Spalte fehlt das Dreieck. Die vier Antwortoptionen sind Dreieck, Kreis, Quadrat und Raute; nur Dreieck passt. Ein nicht im Raster verwendeter, aber zur Symbolfamilie gehörender Wert darf als plausibler Distraktor dienen.

**Anspruchsvoll – Form und Füllung:** Beide Merkmale erfüllen unabhängig dieselbe Zeilen- und Spaltenregel.

|  |  |  |
| --- | --- | --- |
| Kreis, voll | Dreieck, gestreift | Quadrat, leer |
| Dreieck, leer | Quadrat, voll | Kreis, gestreift |
| Quadrat, gestreift | Kreis, leer | □ |

In der letzten Zeile und Spalte fehlen Form „Dreieck“ sowie Füllung „voll“. Die fünf Antwortoptionen sind „Dreieck, voll“, „Kreis, voll“, „Dreieck, leer“, „Quadrat, voll“ und „Dreieck, gestreift“. Nur „Dreieck, voll“ erfüllt beide Regeln; jede andere Option verletzt mindestens eine.

## Aufgabengenerierung

Die Engine erzeugt für jedes Merkmal ein vollständiges 3×3-Raster, in dem jeder Wert pro Zeile und Spalte genau einmal auftritt. Die Merkmale werden zu Kacheln kombiniert; anschließend wird eine Position entfernt und als Lücke dargestellt. Die Position der Lücke wird variiert und darf die Lösung nicht verraten.

Die Antwortoptionen enthalten die richtige Kachel und plausible Distraktoren. Ein Distraktor darf einen anderen Wert aus einer geeigneten Symbolfamilie oder eine abweichende Kombination der Rastermerkmale verwenden; er muss mindestens eine der für die Lücke geltenden Regeln verletzen. Die Optionen sind verschieden; weder Reihenfolge noch Position, Farbe, Größe oder Darstellung geben die richtige Antwort preis. Schwierigkeit, Altersdarstellung, Merkmalszahl und Optionszahl müssen dem Standardprofil entsprechen.

## Eingabe

Die Antwort wird aus den vorgegebenen Kacheln gewählt: durch Tippen, Mausklick oder Tastatur. Genau eine Option kann ausgewählt werden. Die Auswahl kann vor dem Absenden geändert oder aufgehoben werden; erst „Prüfen“ wertet sie als Antwort. Eine leere oder nicht bestätigte Auswahl zählt nicht als Fehler. Es gibt keine Freitexteingabe und kein Multi-Select. Auswahl und Rückmeldung müssen ohne alleinige Farbcodierung sowie per Tastatur und Screenreader verständlich sein.

## Fehler

Eine falsch bestätigte Kachel zählt als ein Fehler. Die Auswahl wird aufgehoben und eine weitere Antwort ist möglich; die Lösung wird nicht verraten. Eine bereits falsch gewählte Option kann erneut ausgewählt werden, zählt bei erneuter Bestätigung aber erneut als Fehler. Nach dem dritten Fehler endet die Aufgabe automatisch mit null Punkten. Es gelten außerdem die allgemeinen Regeln für Überspringen und Anzeigen der Lösung.

## Undo und Neustart

Vor dem Absenden kann die Auswahl geändert oder aufgehoben werden. Eine bestätigte Antwort kann nicht rückgängig gemacht werden. Ein Neustart erfordert die gemeinsame Bestätigung, zeigt dasselbe Raster erneut und hebt die Auswahl sowie die Rückmeldung auf. Bereits verbrauchte Fehler, verwendete Hinweise und deren Punktabzüge bleiben erhalten.

## Hinweise

Es gibt höchstens zwei aufeinander aufbauende Hinweise. Der erste weist darauf hin, dass Zeilen und Spalten betrachtet werden sollen. Der zweite nennt, welche Merkmale jeweils geprüft werden sollen, ohne fehlende Werte oder Lösung zu nennen. Ein Hinweis kann nicht zurückgenommen werden; ein Neustart setzt die Zahl genutzter Hinweise nicht zurück. Für Kosten und Punktabzüge gelten die gemeinsamen Hinweisregeln.

## Punkte

Eine richtige Antwort erhält die nach den gemeinsamen Hinweisregeln erreichbaren Punkte bis höchstens 100. Falsche Antworten bringen keine Teilpunkte; eine nach weiteren Versuchen richtige Antwort wird nach derselben Regel gewertet. Überspringen, angezeigte Lösung, dritter Fehler und nicht abgeschlossene Aufgabe ergeben null Punkte. Für Rundungsart, Rundungsebene und -zeitpunkt gelten die gemeinsamen Bewertungsregeln.

## Lösung und Feedback

Nach jeder bestätigten Antwort wird klar und nicht allein durch Farbe angezeigt, ob sie richtig oder falsch war. Falsches Feedback verrät die Lösung nicht, solange die Aufgabe offen ist. Nach endgültigem Abschluss erklärt die Lösung für jedes Merkmal knapp, welcher Wert in der betreffenden Zeile und Spalte noch fehlt und warum die gewählte Kachel passt. Die Erklärung wird auch nach Überspringen, Anzeigen der Lösung oder Aufgabenende durch den dritten Fehler gezeigt.

## Validierung

Jede Aufgabe wird vor der Anzeige automatisiert geprüft:

- Das Raster hat exakt drei Zeilen und drei Spalten, genau eine Lücke und acht sichtbare Kacheln.
- Es werden ein Merkmal bei leicht und zwei unabhängige Merkmale bei anspruchsvoll verwendet; jedes Merkmal hat genau drei verschiedene Werte.
- Nach Einsetzen der Lösung kommt in jeder Zeile und Spalte jeder Wert jedes Merkmals genau einmal vor.
- Für jedes Merkmal lässt sich der fehlende Wert aus der Lückenzeile und -spalte eindeutig bestimmen; beide Bestimmungen stimmen mit der Lösungskachel überein.
- Die Lösung ist die einzige angebotene Kachel, die alle geltenden Regeln erfüllt; sämtliche Optionen sind verschieden und jeder Distraktor verletzt mindestens eine Regel.
- Anzahl der Optionen, Merkmalszahl, Darstellungsparameter und Lückenposition entsprechen dem Profil; Darstellung und Optionen verraten die Lösung nicht anderweitig.
- Die gespeicherten Regeln, Rasterwerte, Lösung und Erklärung stimmen überein.

Die Lösbarkeit und Eindeutigkeit beziehen sich auf die oben definierte Regelgrammatik, nicht auf beliebige alternative Deutungen. Ungültige Aufgaben werden verworfen und neu erzeugt; sie dürfen nicht angezeigt werden. Wenn keine gültige generierte Aufgabe verfügbar ist, wird eine redaktionell geprüfte Aufgabe verwendet. Handgebaute Aufgaben durchlaufen dieselben automatisierten Prüfungen und zusätzlich eine redaktionelle Prüfung auf Eindeutigkeit, Altersangemessenheit und korrekte Erklärung.
