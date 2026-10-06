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

### Gemeinsames Bewertungsmodell

Die folgenden Regeln gelten für alle Mechaniken und haben Vorrang vor abweichenden älteren Formulierungen in Mechanikprofilen. Profile legen nur fest, welche Antwort- oder Teilaufgabeneinheiten gewertet werden und was eine gültige Antwort beziehungsweise ein Fehler ist.

- **Ausgangswert:** Eine Aufgabe hat höchstens 100 Punkte. Ihre vorher festgelegten Wertungseinheiten sind gleich gewichtet. Eine vollständig richtige Einheit zählt als richtig; eine falsch abgeschlossene, übersprungene oder offene Einheit zählt als falsch. Der ungerundete Ausgangswert ist `100 × richtige Einheiten ÷ alle Einheiten`. Eine Mechanik mit nur einer Wertungseinheit ist damit ganz oder gar nicht richtig; es gibt keine Teilpunkte innerhalb einer Einheit.
- **Fehler:** Eine gültige, ausdrücklich bestätigte falsche Antwort verbraucht genau einen der höchstens drei Aufgabenfehler. Ungültige, unvollständige, nicht bestätigte oder noch änderbare Eingaben verbrauchen keinen Fehler. Fehlversuche ziehen für sich allein keine Punkte ab; eine nachfolgend richtige Antwort kann die Einheit noch retten, sofern das Mechanikprofil sie nicht bereits endgültig schließt. Ein übersprungener Teil zählt null, aber nicht als Fehler. Der dritte Fehler beendet die Aufgabe sofort mit null Punkten, auch wenn bereits Teilpunkte erzielt wurden.
- **Aufgabe beenden:** Bestätigtes Überspringen der ganzen Aufgabe, bestätigtes Anzeigen der Lösung und ein Abbruch vor dem regulären Ende schließen die Aufgabe mit null Punkten ab; spätere Neubewertung ist ausgeschlossen. Regulär erzielte Punkte werden erst mit der erforderlichen Bestätigung („Weiter“ oder „Abschließen“) endgültig. Bis dahin ist das Ergebnis vorläufig; wird die offene Aufgabe verlassen, erhält sie null Punkte. Eine abgeschlossene Aufgabe behält ihre Punkte, auch wenn die offizielle Runde später abgebrochen wird.
- **Hinweise:** Pro Aufgabe gibt es höchstens zwei aufeinander aufbauende Hinweisstufen. Stufe 1 kostet für 8–12 und 13–17 **0 Punkte**, für 18+ **10 Punkte**. Stufe 2 kostet für alle Altersgruppen **weitere 20 Punkte**. Die Kosten sind feste Abzüge vom ungerundeten Ausgangswert, werden pro Stufe genau einmal berechnet und bleiben nach Neustart bestehen. Hinweise werden nur angeboten, wenn die jeweilige Mechanik sie inhaltlich ausarbeiten kann. Der resultierende Aufgabenwert ist `max(0, Ausgangswert − Hinweisabzüge)`; er kann 100 nicht überschreiten.
- **Rundung und Abschlusszeitpunkt:** Fehler- und Hinweisregeln sowie die Anzahl richtiger Einheiten werden bei der endgültigen Aufgabenbestätigung ausgewertet. Erst dann wird der Aufgabenwert kaufmännisch auf ganze Punkte gerundet (positive halbe Punkte aufwärts) und auf 0–100 begrenzt. Vorläufige Werte und zwischenzeitliche Einheiten werden nicht einzeln gerundet.
- **Tagesnormalisierung:** Das offizielle Tagesergebnis ist der gleich gewichtete Mittelwert der fünf endgültigen Aufgabenwerte: `Summe der fünf Aufgabenpunkte ÷ 5`. Eine nicht abgeschlossene Aufgabe zählt als null. Der Mittelwert wird erst beim Abschluss oder der Beendigung der offiziellen Runde kaufmännisch auf ganze Punkte gerundet und auf 0–100 begrenzt. Es gibt keine zusätzliche Gewichtung nach Mechanik, Reihenfolge, Schwierigkeit oder Zeit. Weitere Runden ohne Wertung verändern das Tagesergebnis nicht.

Damit bleibt die Tageswertung nach Abschluss oder Beendigung der offiziellen Runde immer gültig und zeigt Gesamtpunktzahl sowie die Einzelpunkte aller fünf Aufgaben. Die Zeit beeinflusst keine Punkte.

### Rechenbeispiele

Die Beispiele verwenden die Regeln oben; ein bestätigter Fehlversuch kostet keine zusätzlichen Punkte, solange er nicht den dritten Fehler auslöst.

| Mechaniktyp und Altersgruppe | Wertung | Berechnung der Aufgabenpunkte |
| --- | --- | --- |
| **Memory Logic**, drei gleich gewichtete Fragen, 13–17 | Zwei richtige Fragen, eine bestätigte falsche Antwort; Hinweisstufe 1 und 2 genutzt | Die falsche Antwort schließt diese Frage mit null und zählt als ein Fehler. Stufe 1 kostet 0, Stufe 2 kostet 20. `100 × 2 ÷ 3 − 20 = 46,666…`; bei endgültigem Abschluss kaufmännisch gerundet: **47 Punkte**. |
| **Zahlenfolge**, eine Antwort, 18+ | Zwei gültige falsche Antworten, dann richtige Antwort; beide Hinweisstufen genutzt | Die falschen Versuche zählen als zwei Fehler, aber ziehen keine weiteren Punkte ab. Hinweise kosten zusammen 30. `100 − 30 =` **70 Punkte**. Bei einem dritten Fehler wäre die Aufgabe stattdessen sofort **0 Punkte**. |
| **Reihenfolge**, eine vollständige Ordnung, 8–12 | Erst eine falsche bestätigte Ordnung, dann richtige Ordnung; beide Hinweisstufen genutzt | Die falsche Ordnung zählt als ein Fehler; die vollständige Ordnung ist eine Wertungseinheit und erhält keine Teilpunkte. Stufe 1 kostet 0, Stufe 2 kostet 20. `100 − 20 =` **80 Punkte**. |

Beispiel für die Tagesnormalisierung: Aufgabenwerte **47, 70, 80, 100 und 0** ergeben `297 ÷ 5 = 59,4`, also **59 Tagespunkte**. Das Ergebnis einer offenen oder nicht abgeschlossenen Aufgabe würde als 0 in denselben Mittelwert eingehen.

Gemessen wird nur die aktive Gesamtzeit der fünf Aufgaben: Beginn mit der ersten Aufgabe, Ende mit deren endgültigem Abschluss (also nach der erforderlichen Bestätigung) der fünften. Reihenfolge und Zeit haben keinen Einfluss auf Punkte; Zeit zählt ausschließlich für den Bestzeitrekord. Die Merkphase von Memory Logic zählt nicht zur Spielzeit.

Bei Tabwechsel, Wechsel in den Hintergrund oder Verlassen des Spiels pausiert die Messung automatisch. Zurück im Spiel muss ausdrücklich „Fortsetzen“ gewählt werden, bevor die Zeit weiterläuft. Wird das Spiel geschlossen, ist keine Fortsetzung möglich und die aktive Zeit ist keine Bestzeit. Eine nicht-offizielle Runde wird verworfen. Bei einem bereits offiziellen Versuch gilt der Tagesabbruch: offene Aufgaben erhalten null Punkte und der Tageswert wird berechnet.

## Bestwert, Bestzeit und Streak

Bestwert und Bestzeit werden getrennt pro Altersgruppe dauerhaft gespeichert. Ein Altersgruppenwechsel löscht diese Rekorde nicht: Es werden nur die Rekorde der aktuell gewählten Altersgruppe angezeigt; bei der Rückkehr zu einer Altersgruppe erscheinen deren bisherige Rekorde wieder. Beim Wechsel werden die aktuelle Tageswertung und der Streak zurückgesetzt. Es gibt keine gemeinsame Rangliste und in V1 keine Statistik-Historie.

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

Das verbindliche Referenzprofil mit Alters- und Inhaltsgrenzen, Datenmodell, zulässigen Schlussfolgerungen, Zuständen, Wertung, Validierung und mindestens fünf Beispielen je Altersgruppe und Schwierigkeit steht in der [Memory-Logic-Spezifikation](./profiles/memory-logic.md).

## Muster fortsetzen

Das vollständige V1-Mechanikprofil mit Spielziel, Altersgruppen, Schwierigkeitsstufen, Aufgabengenerierung, Eingabe, Fehlerbehandlung, Neustart, Hinweisen, Punkten, Feedback und Validierung steht in der [Spezifikation „Muster fortsetzen“](./profiles/pattern-completion.md).

## Was passt nicht?

Das vollständige V1-Standardprofil mit Spielregeln, Altersgruppen- und Schwierigkeitsbeispielen sowie Anforderungen an Eindeutigkeit und Validierung steht in der [Mechanikspezifikation „Was passt nicht?“](./profiles/odd-one-out.md).

## Drehen & Denken

Das vollständige V1-Standardprofil mit erlaubten Transformationen, Darstellung, Eingabe, Aufgabengenerierung und eindeutiger Lösung steht in der [Mechanikspezifikation „Drehen & Denken“](./profiles/mental-rotation.md).

## Zahlenfolge

Die vollständige Mechanikbeschreibung einschließlich Regeln für Altersgruppen, Schwierigkeit, Generierung, Eingabe, Fehler, Neustart, Hinweise, Punkte, Feedback und Validierung steht in der [Zahlenfolge-Spezifikation](./profiles/number-sequence.md).

## Reihenfolge

Das vollständige V1-Standardprofil mit Eingabe, Hinweisen, eindeutiger Ordnung und Validierung steht in der [Spezifikation „Reihenfolge“](./profiles/ordering.md).

## Raster-Logik

Das vollständige V1-Standardprofil mit Rasterregeln, Eingabe, Lösbarkeit, Eindeutigkeit und Validierung steht in der [Raster-Logik-Spezifikation](./profiles/grid-logic.md).

## Visueller Vergleich

Das vollständige V1-Standardprofil mit zulässigen Unterschieden, Darstellung, Mehrfachauswahl und Validierung steht in der [Mechanikspezifikation „Visueller Vergleich“](./profiles/visual-comparison.md).

## Rechenlogik

Das vollständige V1-Standardprofil mit mathematischen Voraussetzungen, zusätzlichen Bedingungen, Lösbarkeit und Validierung steht in der [Rechenlogik-Spezifikation](./profiles/arithmetic-logic.md).

## Wortlogik

Das vollständige V1-Standardprofil mit Wortbeziehungen, Altersgruppen, Schwierigkeit, Eingabe, Hinweisen, Punkten und Validierung steht in der [Wortlogik-Spezifikation](./profiles/word-logic.md).
