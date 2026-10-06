# Visueller Vergleich – V1-Standardprofil

## Spielziel und Aufgabenaufbau

Die Aufgabe zeigt zwei Abbildungen derselben Anordnung. Die spielende Person findet alle Gegenstandspaare, bei denen sich der Gegenstand verändert hat, und wählt die entsprechenden Positionen in der linken Abbildung aus. Eine Veränderung zählt nur, wenn sich ein sichtbares Merkmal eines Gegenstands unterscheidet. Jede Aufgabe hat eine eindeutige Menge veränderter Positionen.

## Altersgruppen

Die Grundregel, Anzahl der Antwortmöglichkeiten und Bedienung sind für alle Altersgruppen gleich. Altersgerecht angepasst werden Motive, Merkmale und Gestaltung:

- **8–12:** vertraute Gegenstände und leicht unterscheidbare Formen oder Muster; kurze, konkrete Anweisung.
- **13–17:** neutrale geometrische oder alltagsnahe Motive; knappe, altersneutrale Anweisung.
- **18+:** abstrakte Formen und sachliche Gestaltung; Unterschiede bleiben ohne Spezialwissen direkt erkennbar.

Farbe ist nie das einzige Merkmal, durch das eine Veränderung erkennbar wird. Größe, Kontrast und Abstände bleiben auch auf kleinen Bildschirmen ausreichend. Unnötige Dekoration, Animationen und Zeitlimits sind ausgeschlossen.

## Leicht und anspruchsvoll

| Schwierigkeit | Vergleichspaare | Veränderungen |
| --- | ---: | --- |
| Leicht | exakt 6 | exakt 2 Gegenstände, je eine Veränderung an einem Merkmal |
| Anspruchsvoll | exakt 8 | exakt 3 Gegenstände, je eine oder zwei Veränderungen an Merkmalen |

Jedes Gegenstandspaar befindet sich an derselben Position in beiden Abbildungen. Erlaubte veränderliche Merkmale sind Form, Füllung oder Muster, eine Orientierung in festen unterscheidbaren Schritten sowie eine klar unterscheidbare Größe. Die Position und Anordnung der Gegenstände, ihre Anzahl und ihre Zuordnung zueinander bleiben gleich. Farbe allein ist kein zulässiger Unterschied. Anspruchsvoll verlangt den Vergleich mehrerer Paare und gegebenenfalls das Prüfen mehrerer Merkmale, nicht bloß feinere Details.

## Darstellung und relevante Unterschiede

Die beiden Abbildungen zeigen dieselbe Anordnung in gleicher Größe und Ausrichtung. Gegenstände und Abstände sind klar voneinander getrennt; ihre korrespondierenden Positionen sind durch ein gleiches Raster oder eine gleichbleibende Anordnung erkennbar. Die linke Abbildung ist die Antwortfläche. Auf kleinen Bildschirmen dürfen die Abbildungen untereinander angeordnet werden, sofern die Zuordnung jeder Position weiterhin eindeutig bleibt.

Als relevante Unterschiede gelten ausschließlich sichtbare Änderungen eines erlaubten Merkmals an einem Gegenstand. Bei unveränderten Positionen stimmen alle Merkmale überein. Nicht als Unterschiede gewertet werden Darstellungsartefakte, abweichende Kanten durch Skalierung, Schatten, zufällige Farbabweichungen oder Änderungen an Hintergrund und Dekoration. Hinzufügen, Entfernen, Verschieben oder Vertauschen von Gegenständen ist in V1 nicht erlaubt.

## Aufgabengenerierung und Eindeutigkeit

Eine Aufgabe speichert Altersgruppe, Schwierigkeit, beide Abbildungen, die korrespondierenden Positionen, veränderte Merkmale, die Menge richtiger Positionen und eine kurze Erklärung jeder Veränderung. Die zweite Abbildung wird aus der ersten durch gezielte Änderungen an der festgelegten Anzahl von Gegenständen erzeugt. Alle übrigen Gegenstände und Merkmale bleiben identisch.

Die zulässige Menge der Veränderungen ist abschließend durch die oben genannten Merkmale und festen Schritte bestimmt. Die Lösung besteht genau aus den Positionen aller Gegenstände, bei denen mindestens ein erlaubtes Merkmal verändert wurde. Die Zahl der Veränderungen wird in der Aufgabe nicht angezeigt. Optionen oder Bildgestaltung dürfen die Lösung nicht anderweitig verraten.

Build-Zeit-Generierung wird bevorzugt. Handgebaute Aufgaben durchlaufen dieselben Strukturprüfungen und zusätzlich eine redaktionelle Prüfung auf Verständlichkeit, altersgerechte Darstellung und eindeutige Lösung.

## Eingabe

Die Antwort wird als Mehrfachauswahl der veränderten Positionen in der linken Abbildung gegeben: durch Tippen, Mausklick oder Tastatur. Jede Position lässt sich auswählen oder abwählen; die Auswahl kann vor dem Absenden geändert werden. Es gibt keine Freitext- oder Einzelauswahlantwort. Erst „Prüfen“ macht die Auswahl verbindlich. Eine leere oder nicht bestätigte Auswahl zählt nicht als Fehler. Auswahlzustand und Bedienelemente müssen auch mit Tastatur und Screenreader verständlich sein.

## Fehler

Eine bestätigte Auswahl zählt genau dann als richtig, wenn sie der vollständigen Menge veränderter Positionen entspricht. Fehlende oder zusätzlich ausgewählte Positionen machen den gesamten Versuch falsch und zählen zusammen als ein Fehler. Danach wird die Auswahl aufgehoben; klares Feedback zeigt „falsch“, verrät aber weder betroffene Positionen noch Lösung. Eine neue Auswahl kann bestätigt werden, solange die Aufgabe offen ist. Nach dem dritten Fehler endet sie automatisch mit null Punkten.

## Undo und Neustart

Vor dem Absenden kann jede Auswahl geändert oder aufgehoben werden. Eine bestätigte Antwort kann nicht rückgängig gemacht werden. Ein Neustart erfordert die gemeinsame Bestätigung und zeigt dieselbe Aufgabenstellung erneut. Auswahl und Rückmeldung werden zurückgesetzt; verbrauchte Fehler sowie verwendete Hinweise und deren Auswirkung auf die erreichbare Punktzahl bleiben erhalten.

## Hinweise

Es gibt höchstens zwei aufeinander aufbauende Hinweise. Der erste lenkt auf die Art der zu vergleichenden Merkmale, ohne Gegenstände oder Positionen zu nennen. Der zweite erklärt, auf welche zulässigen Merkmale genauer zu achten ist, ohne eine veränderte Position offenzulegen. Hinweise können nicht zurückgenommen werden; ein Neustart setzt ihre Zahl nicht zurück. Für Kosten und Punktabzüge gelten die gemeinsamen Hinweisregeln.

## Punkte

Nur eine vollständig richtige bestätigte Auswahl erhält Punkte; es gibt keine Teilpunkte. Gewertet werden die nach den gemeinsamen Bewertungs- und Hinweisregeln erreichbaren Punkte bis höchstens 100. Falsche Versuche verändern die Punktzahl nicht zusätzlich, solange die Aufgabe noch erfolgreich abgeschlossen werden kann. Überspringen, angezeigte Lösung, dritter Fehler und nicht abgeschlossene Aufgabe ergeben null Punkte. Für Rundungsart, Rundungsebene und -zeitpunkt gelten die gemeinsamen Bewertungsregeln.

## Lösung und Feedback

Nach jeder bestätigten Auswahl wird klar und nicht allein durch Farbe angezeigt, ob sie richtig oder falsch war. Eine falsche Auswahl verrät die Lösung nicht, solange die Aufgabe offen ist. Nach endgültigem Abschluss werden beide Abbildungen mit den veränderten Positionen markiert; zu jedem Unterschied wird kurz benannt, welches Merkmal sich verändert hat. Die Lösung wird auch nach Überspringen, Anzeigen der Lösung oder Aufgabenende durch den dritten Fehler gezeigt. Rückmeldung, Auswahlzustand und Fehlerzahl müssen für Tastatur- und Screenreader-Nutzung verständlich sein.

## Validierung

Jede Aufgabe wird vor der Anzeige automatisiert geprüft:

1. Anzahl der Vergleichspaare, Anzahl veränderter Positionen und Anzahl geänderter Merkmale entsprechen Altersgruppe und Schwierigkeitsstufe.
2. Jeder Gegenstand ist in beiden Abbildungen genau einer Position zugeordnet; Anordnung und Positionen sind unverändert.
3. Die gespeicherten Unterschiede entsprechen exakt den tatsächlich veränderten, erlaubten Merkmalen.
4. Nicht als verändert gespeicherte Gegenstände sind in allen relevanten Merkmalen identisch; es gibt keine unbeabsichtigten oder durch Darstellung entstandenen Unterschiede.
5. Die Antwortmenge enthält genau alle und nur die veränderten Positionen; die Aufgabe hat damit genau eine richtige Antwort.
6. Änderungen beschränken sich auf erlaubte Merkmale und enthalten weder reine Farbunterschiede noch Verschieben, Hinzufügen, Entfernen oder Vertauschen von Gegenständen.
7. Abbildungen und Antwortfläche sind ausreichend kontrastreich, unterscheidbar, altersgerecht und auch bei responsiver Darstellung eindeutig bedienbar; die Lösung wird nicht durch Position, Reihenfolge, Größe oder Dekoration verraten.
8. Gespeicherte Merkmale, Lösung und Lösungserklärung stimmen überein.

Die formale Prüfung belegt die Unterschiede innerhalb des festgelegten Merkmalsmodells, nicht automatisch deren visuelle Erkennbarkeit oder altersgerechte Verständlichkeit. Handgebaute Aufgaben benötigen deshalb zusätzlich eine redaktionelle Prüfung. Ungültige Aufgaben werden verworfen und nicht angezeigt; falls keine gültige generierte Aufgabe verfügbar ist, wird eine redaktionell geprüfte Aufgabe verwendet.
