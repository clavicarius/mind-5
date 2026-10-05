# Mind 5 – Spiel- und Regelspezifikation

Dieses Dokument hält die verbindlichen Spielregeln des Übergabestands fest. Noch nicht entschiedene Details sind ausdrücklich als offen markiert.

## Tagesrunde und Auswahl

Eine Runde umfasst genau fünf Aufgaben. Die Engine bestimmt Mechanik, Reihenfolge, Schwierigkeit sowie die konkrete Aufgabe. Bei der Zusammenstellung gilt folgende Priorität:

1. Pflichtregeln einhalten: genau fünf Aufgaben, höchstens zweimal dieselbe Mechanik, mindestens drei verschiedene Mechaniken.
2. Das gewählte Schwierigkeitsprofil exakt einhalten.
3. Mindestens drei verschiedene Mechaniken sicherstellen.
4. Puzzlebereiche möglichst vielfältig abdecken.
5. Mechaniken des Vortags möglichst vermeiden.
6. Unter den verbleibenden Möglichkeiten zufällig auswählen.

Pflichtregeln haben Vorrang vor Optimierungszielen. Bereichswiederholungen sind erlaubt, wenn die übrigen Regeln sie erforderlich machen. Die Auswahl bleibt grundsätzlich zufällig.

## Offizieller Versuch und weitere Runden

- Pro Tag gibt es genau einen offiziellen Versuch.
- Er wird mit Abschluss der ersten Aufgabe festgelegt – unabhängig davon, ob sie richtig, falsch, übersprungen oder mit angezeigter Lösung beendet wurde.
- Eine Runde, die vor Abschluss der ersten Aufgabe verlassen wird, gilt als nicht-offiziell und wird verworfen. Sie kann nicht fortgesetzt werden. Vor dem nächsten Start wird auf die Verwerfung hingewiesen; eine Bestätigung ist erforderlich. Unbegrenztes Neuwürfeln vor dem offiziellen Versuch gibt es nicht.
- Nach dem offiziellen Versuch sind weitere Runden erlaubt. Sie tragen deutlich die Kennzeichnung **„Weitere Runde – ohne Wertung“** und erfordern eine Bestätigung. „Ohne Wertung“ bedeutet, dass sie weder Tagesergebnis noch Streak oder Bestwert verändern; eine gültige Zeit darf weiterhin die Bestzeit verbessern.

## Aufgabenbedienung und Fehler

Zwischen offenen Aufgaben kann nur nach Bestätigung gewechselt werden. Dabei werden ungespeicherte Eingaben verworfen, die gewählte Aufgabe vollständig neu gestartet und bereits verbrauchte Fehler beibehalten. Mehrere Neustarts sind möglich, solange Fehler verfügbar sind. Die genaue Neustartdefinition ist mechanikspezifisch.

Grundsätzlich hat jede Aufgabe höchstens drei Fehler. Ein relevanter falscher Input zählt als Fehler, wird sichtbar angezeigt und erhält eine klare visuelle Rückmeldung. Der dritte Fehler beendet die Aufgabe automatisch: Die Aufgabe erhält null Punkte und noch offene Teilfragen ebenfalls null Punkte. Was als relevanter falscher Input gilt, wird je Mechanik definiert.

### Aufgabe abschließen

- **Überspringen:** Nach Bestätigung ist die Aufgabe abgeschlossen und erhält null Punkte; eine spätere Neubewertung ist ausgeschlossen.
- **Lösung anzeigen:** Nach Bestätigung wird die Lösung gezeigt, die Aufgabe abgeschlossen und mit null Punkten gewertet; eine spätere Neubewertung ist ausgeschlossen.
- **Korrekte Lösung:** Das Ergebnis wird angezeigt. Erst nach Bestätigung durch „Weiter“ oder „Abschließen“ gilt die Aufgabe endgültig als abgeschlossen und werden Punkte festgelegt.

## Punkte, Tagesergebnis und Zeit

Jede Aufgabe liefert grundsätzlich 0–100 Punkte. Alle fünf Aufgaben sind gleichwertig; daraus wird die Tagespunktzahl auf 0–100 normalisiert. Die Rundung auf ganze Punkte erfolgt kaufmännisch. Hinweise können die maximal erreichbaren Punkte senken. Die konkreten Hinweisabzüge und Hinweisstufen sind noch festzulegen.

> **Klärungsbedarf:** Die Rundungsart (kaufmännisch) ist entschieden, aber die Rundungsebene und der Zeitpunkt noch nicht: etwa bei Teilfragen, Aufgabenpunkten oder erst bei der Tagesnormalisierung sowie das Zusammenspiel mit Hinweisabzügen.

Für die Altersgruppen 8–12 und 13–17 ist der erste Hinweis kostenlos; bei 18+ reduziert er die Punktzahl. Das Tagesergebnis ist nach Abschluss oder Beendigung der offiziellen Runde immer gültig und zeigt Gesamtpunktzahl sowie die Einzelpunkte aller fünf Aufgaben. Nicht abgeschlossene Aufgaben erhalten null Punkte.

Gemessen wird nur die aktive Gesamtzeit der fünf Aufgaben: Beginn mit der ersten Aufgabe, Ende mit deren endgültigem Abschluss (also nach der erforderlichen Bestätigung) der fünften. Reihenfolge und Zeit haben keinen Einfluss auf Punkte; Zeit zählt ausschließlich für den Bestzeitrekord. Die Merkphase von Memory Logic zählt nicht zur Spielzeit.

Bei Tabwechsel, Wechsel in den Hintergrund oder Verlassen des Spiels pausiert die Messung automatisch. Zurück im Spiel muss ausdrücklich „Fortsetzen“ gewählt werden, bevor die Zeit weiterläuft. Wird das Spiel geschlossen, ist keine Fortsetzung möglich und die aktive Zeit ist keine Bestzeit. Eine nicht-offizielle Runde wird verworfen. Bei einem bereits offiziellen Versuch gilt der Tagesabbruch: offene Aufgaben erhalten null Punkte und der Tageswert wird berechnet.

## Bestwert, Bestzeit und Streak

Rekorde werden pro Altersgruppe getrennt geführt. Es gibt keine gemeinsame Rangliste und in V1 keine Statistik-Historie. Bei einem Altersgruppenwechsel werden Tageswertung und Streak zurückgesetzt; die Rekordführung beginnt für die neue Altersgruppe separat.

> **Klärungsbedarf:** Die Übergabe fordert sowohl getrennte Rekorde je Altersgruppe als auch, dass frühere Rekorde der alten Altersgruppe beim Wechsel nicht wiederhergestellt werden. Es ist nicht eindeutig, ob diese Rekorde gelöscht oder lediglich beim Wechsel nicht angezeigt/aktiviert werden. Vor der Umsetzung festlegen, damit die altersgruppenspezifische Rekordführung nicht unbeabsichtigt verloren geht.

### Bestwert

- Nur der offizielle Versuch kann den Bestwert ändern.
- Bestwert ist die höchste offizielle Tagespunktzahl und enthält Punktzahl, Datum und Tageszeit. Zeit ist kein Bestandteil des Bestwerts.
- Auch null Punkte, Überspringen, angezeigte Lösungen, der dritte Fehler und späterer Abbruch werden für die Rekordprüfung berücksichtigt.
- Ein Ergebnis von null wird gespeichert und angezeigt, erzeugt aber keinen internen persönlichen Bestwert. Der erste echte Bestwert entsteht ab einem Punkt.
- Bei gleicher Punktzahl wird der Bestwert nicht aktualisiert. Ohne Rekord wird **„Noch kein Bestwert“** angezeigt.

### Bestzeit

Die Bestzeit ist unabhängig vom Bestwert und enthält Zeit, zugehörige Punktzahl, Datum und Tageszeit:

1. Eine kürzere Zeit aktualisiert den Rekord.
2. Bei gleicher Zeit aktualisiert eine höhere Punktzahl den Rekord.
3. Bei gleicher Zeit und gleicher oder niedrigerer Punktzahl bleibt der Rekord unverändert.

Eine gültige Bestzeit darf aus dem offiziellen Versuch oder einer weiteren Runde stammen. Null-Punkte-Ergebnisse sind zulässig. Bei Gerätewechsel entsteht keine gültige Zeit. Ohne Rekord wird **„Noch keine Bestzeit“** angezeigt.

### Streak

Ein Tag zählt, sobald die erste Aufgabe des offiziellen Tagesversuchs abgeschlossen ist – unabhängig von der erreichten Punktzahl oder davon, ob übersprungen, die Lösung angezeigt, der dritte Fehler erreicht oder die Runde später abgebrochen wurde. Nur der offizielle Versuch zählt. Genau ein verpasster Tag ist erlaubt; bei mindestens zwei aufeinanderfolgenden verpassten Tagen wird der Streak zurückgesetzt.

## Pause, Gerätewechsel und Tageswechsel

Eine laufende Runde kann nicht auf ein anderes Gerät übertragen werden:

- **Offizielle Runde:** Die Runde wird beendet, offene Aufgaben erhalten null Punkte, die Zeit ist ungültig und es gibt keine Bestzeit. Der Tageswert darf den Bestwert verbessern.
- **Weitere Runde:** Sie wird ohne Wertung beendet und beeinflusst Tageswert, Bestwert und Streak nicht. Eine spätere weitere Runde kann eine Bestzeit erzielen.

Die maßgebliche Zeitzone ist `Europe/Berlin`; der Tageswechsel ist um 00:00 Uhr. Bevorzugt wird eine externe Zeitquelle, ersatzweise die lokale Gerätezeit. Offline wird die letzte bekannte externe Zeit mit der seitdem vergangenen lokalen Zeit fortgeschrieben und bei erneutem Kontakt abgeglichen.

Bei erkannter Zeitmanipulation werden Scoring und offizieller Status gesperrt, der aktuelle Tageswert zurückgesetzt sowie Streak und Bestwert zurückgesetzt. Das Spiel bleibt grundsätzlich spielbar.

Wird Mitternacht während einer laufenden Runde erreicht, wird dies vorher angekündigt; um 00:00 Uhr wird die Runde automatisch beendet. Eine nicht-offizielle Runde wird verworfen und benötigt vor der nächsten Tagesrunde eine Bestätigung. Eine offizielle Runde wird wie ein normaler Abbruch behandelt: offene Aufgaben erhalten null Punkte und der Tageswert wird berechnet. Danach ist eine Bestätigung für die neue Tagesrunde erforderlich.

## Memory Logic – Referenzmechanik

### Informations- und Merkphase

Die Aufgabe präsentiert Einzelfakten oder Beziehungen zwischen genau zwei Objekten, zum Beispiel „Anna trägt Rot“ oder „Anna ist älter als Ben“.

| Schwierigkeit | Informationen | Fragen | Antwortoptionen |
| --- | ---: | ---: | ---: |
| Leicht | exakt 4 | 3 | exakt 4 |
| Anspruchsvoll | zufällig 6, 7 oder 8 | 5 | zufällig 5 oder 6 |

Die Informationsanzahl anspruchsvoller Aufgaben wird vor der Merkphase festgelegt. Das Verhältnis von Einzelfakten und Beziehungen ist frei. Informationen erscheinen einzeln; die spielende Person steuert jeden Wechsel. Bereits gesehene Informationen können nicht erneut aufgerufen werden. Es gibt kein Zeitlimit, und die Merkphase zählt nicht zur Spielzeit. Eine Fortschrittsanzeige (z. B. „3 von 6“) zeigt den Stand. Nach der letzten Information folgt eine eigene Bestätigung; erst danach beginnt die erste Frage.

### Fragen und Antworten

Fragen werden nacheinander gestellt und können beantwortet oder übersprungen werden. Abgeschlossene Fragen sind nicht erneut aufrufbar. Leichte Aufgaben fragen ausschließlich direkt gespeicherte Informationen ab. Anspruchsvolle Aufgaben dürfen mehrere Informationen kombinieren; jede Antwort muss vollständig aus den gezeigten Informationen ableitbar sein.

> **Klärungsbedarf:** Für das Überspringen einer einzelnen Memory-Logic-Frage ist festgelegt, dass sie null Punkte erhält, nicht aber, ob dies zugleich einen der drei Aufgabenfehler verbraucht. Das muss bei der Mechanik-Spezifikation entschieden werden.

Es gibt nur vorgegebene Antwortmöglichkeiten. Leicht hat jede Frage exakt eine richtige Antwort. Anspruchsvoll kann eine oder mehrere richtige Antworten haben; bei mehreren richtigen Antworten wird Multi-Select verwendet. Multi-Select ist nicht zwingend erforderlich. Die Zahl der richtigen Antworten wird nicht verraten. Hinweise zur Auswahl lauten „Wähle eine Antwort.“ oder „Wähle alle richtigen Antworten.“ Die Auswahl kann vor dem Absenden geändert werden; erst die ausdrückliche Bestätigung macht sie verbindlich.

### Fehler, Lösung und Punkte

Eine falsche bestätigte Antwort zählt als ein Fehler; dieselbe Frage bietet keine zweite Chance und ist danach abgeschlossen. Beim dritten Fehler endet die gesamte Aufgabe, offene Fragen erhalten null Punkte. Falsche Antworten zeigen klares „falsch“-Feedback, aber nicht sofort die Lösung. Die vollständige Lösung aller Fragen wird erst nach Aufgabenabschluss angezeigt – auch nach regulärem Abschluss, Überspringen, drittem Fehler oder anderem vorzeitigem Ende.

Alle Fragen sind gleich gewichtet: bei drei Fragen je ein Drittel, bei fünf Fragen je ein Fünftel der maximalen Aufgabenpunktzahl. Richtige Antworten erhalten ihren Anteil; falsche, übersprungene und offene Fragen null. Hinweise können die maximale Punktzahl reduzieren. Die Rundungsart ist kaufmännisch; Rundungsebene und -zeitpunkt sind noch offen (siehe Klärungsbedarf im Abschnitt „Punkte, Tagesergebnis und Zeit“).

### Generierung und Validierung

Die Engine erzeugt Objekte, Informationen, Beziehungen, Fragen, Antwortmöglichkeiten und richtige Antworten. Jede generierte Aufgabe muss automatisiert auf folgende Bedingungen geprüft werden:

- eindeutig lösbar und vollständig aus den angezeigten Informationen ableitbar
- richtige Antworten vollständig ableitbar
- falsche Optionen nicht ebenfalls korrekt
- Multi-Select eindeutig
- Schwierigkeit eingehalten

Build-Zeit-Generierung wird bevorzugt. Handgebaute Aufgaben werden redaktionell geprüft. Konkrete Inhaltsgrenzen, erlaubte Beziehungen und vollständige Altersgruppen-Beispiele sind noch auszuarbeiten.

## Zahlenfolge

Die vollständige Mechanikbeschreibung einschließlich Regeln für Altersgruppen, Schwierigkeit, Generierung, Eingabe, Fehler, Neustart, Hinweise, Punkte, Feedback und Validierung steht in der [Zahlenfolge-Spezifikation](./ZAHLENFOLGE.md).
