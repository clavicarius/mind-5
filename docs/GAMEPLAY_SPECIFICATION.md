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

## Was passt nicht? – V1-Standardprofil

### Spielziel und Aufgabenaufbau

Die Aufgabe zeigt genau fünf auswählbare Elemente. Vier Elemente erfüllen eine erkennbare gemeinsame Regel; genau ein Element verletzt sie. Die Regel wird nicht vorab genannt. Die spielende Person wählt genau ein Element als Regelverletzer aus und bestätigt die Auswahl. Vor der Bestätigung ist die Auswahl änderbar. Eine falsche bestätigte Auswahl zählt als Fehler, wird als falsch markiert und kann nicht erneut gewählt werden; die Lösung wird dabei nicht verraten. Nach einer richtigen Auswahl oder einem vorzeitigen Aufgabenende wird die Regel samt Lösung erklärt. Es gelten die allgemeinen Regeln für drei Fehler, Überspringen, Lösung anzeigen und Aufgabenabschluss.

Die fünf Elemente bleiben in beiden Schwierigkeitsstufen gleich zahlreich. **Leicht** verwendet eine konkrete, unmittelbar erkennbare Regel mit einem Merkmal. **Anspruchsvoll** erfordert eine gedankliche Verknüpfung, etwa das Prüfen einer Gleichheit oder einer allgemeinen Beziehung; mehr Elemente allein machen eine Aufgabe nicht anspruchsvoller. In beiden Stufen muss die Regel aus der Aufgabe selbst erschließbar sein und darf kein Spezialwissen voraussetzen.

Die Aufgabe hat genau eine Antwort und keine Teilpunkte: Eine richtige bestätigte Auswahl erhält die nach den allgemeinen Regeln erreichbaren Punkte; falsche, übersprungene und offene Aufgaben erhalten null Punkte.

### Altersgruppen und Beispielaufgaben

Die Altersgruppe verändert Darstellung, Wortschatz und Komplexität des Inhalts, nicht die Zahl der Elemente oder das Lösungsprinzip. Beispiele zeigen jeweils vier passende Elemente und den Regelverletzer in **Fettdruck**.

| Altersgruppe | Leicht: Regel und Elemente | Anspruchsvoll: Regel und Elemente |
| --- | --- | --- |
| 8–12 | **Regel:** Die Form ist ein Kreis. Elemente: roter Kreis, blauer Kreis, grüner Kreis, gelber Kreis, **rotes Dreieck**. Vertraute, bildlich darstellbare Einzelmerkmale; kurze, konkrete Bezeichnungen. | **Regel:** Beide Seiten der Rechnung haben denselben Wert. Elemente: 8 + 7 = 10 + 5, 9 + 6 = 10 + 5, 14 − 4 = 5 + 5, 6 + 8 = 7 + 7, **18 − 7 = 6 + 6**. Zahlen und Rechenschritte bleiben im vertrauten Zahlenraum; die falsche Gleichung ist ein plausibler Rechenfehler. |
| 13–17 | **Regel:** Das Element bezeichnet einen Wochentag. Elemente: Montag, Donnerstag, Samstag, Sonntag, **April**. Vertraute Begriffe, aber weniger bildhafte oder stärker kategorische Unterscheidungen als bei der jüngsten Gruppe. | **Regel:** Beide Terme sind für jeden Wert von x gleich. Elemente: 2(x + 3) = 2x + 6, 3(x − 2) = 3x − 6, 4(x + 1) = 4x + 4, x + x = 2x, **5(x − 1) = 5x − 1**. Der falsche Term ist nahe an der richtigen Umformung. |
| 18+ | **Regel:** Die Zahl ist durch 2 teilbar. Elemente: 12, 18, 24, 30, **35**. Zahlen werden so gewählt, dass die Regel nicht bloß durch eine auffällige Darstellung verraten wird. | **Regel:** Die Gleichheit gilt für alle Mengen A und B. Die Aufgabe erklärt die verwendeten Symbole (∩: gemeinsame Elemente, ∪: Elemente aus mindestens einer Menge, ∅: leere Menge) an einem Beispiel. Elemente: A ∩ B = B ∩ A, A ∪ B = B ∪ A, A ∩ A = A, A ∪ ∅ = A, **A ∩ ∅ = A**. Der Regelverletzer lässt sich durch ein Gegenbeispiel prüfen; die Notation wird in der Aufgabe erklärt. |

### Regeln, Distraktoren und Eindeutigkeit

- Jede Aufgabe hat eine explizit im Aufgabensatz gespeicherte, überprüfbare Regel und eine kurze Begründung für jedes Element. Regeln beziehen sich nur auf dargestellte Merkmale, mitgelieferte Angaben oder im Aufgabentext erklärte Begriffe und Symbole.
- Die vier passenden Elemente müssen die Regel erfüllen; das fünfte muss sie verletzen. Die Lösung ist genau dieses eine Element. Ein bloß anderer Geschmack, eine subjektive Assoziation oder externes Faktenwissen darf keine alternative Lösung begründen.
- Alle fünf Elemente sind plausible Auswahlkandidaten: Die vier passenden Elemente teilen einzelne Merkmale mit dem Regelverletzer, und dieser ist ein plausibler Beinahe-Treffer statt eines offensichtlich sachfremden Elements. Position, Farbe oder Textlänge dürfen die Lösung nicht systematisch verraten; die Position wird gemischt.
- Eine Aufgabe wird verworfen, wenn ein Element mehrere relevante Regelverletzungen aufweist, mehr oder weniger als vier Elemente die Regel erfüllen oder eine andere zugelassene Regel zu einem anderen einzelnen Regelverletzer führt. Bei semantischen Regeln ist zusätzlich eine redaktionelle Prüfung nötig, da reine Merkmalsprüfung Mehrdeutigkeit nicht ausschließt.

### Generierung und Validierung

Jede Aufgabe enthält mindestens Altersgruppe, Schwierigkeit, Elemente mit ihren relevanten Merkmalen, Regelkennung bzw. Regeltext, erwartete Lösung, Begründung je Element und Inhaltsversion. Automatische Prüfungen müssen bestätigen:

1. genau fünf Elemente liegen vor und genau vier erfüllen die gespeicherte Regel;
2. genau ein Element verletzt sie und entspricht der gespeicherten Lösung;
3. jede Begründung stimmt mit den Merkmalen und der Regel überein;
4. innerhalb des für diese Aufgabe zugelassenen Regelkatalogs entsteht keine zweite Lösung mit einem anderen Regelverletzer;
5. die Schwierigkeit und Altersgruppe werden anhand der festgelegten Inhaltsparameter eingehalten:
   - **8–12, leicht:** eine konkrete, bildlich erkennbare Regel mit einem Merkmal und vertrauten Begriffen;
   - **8–12, anspruchsvoll:** Rechenaufgaben mit Ergebnissen im Zahlenraum bis 20; vier Gleichheiten sind rechnerisch korrekt, die fünfte ist falsch;
   - **13–17, leicht:** eine klare, alltagsnahe Kategorie ohne regionales, zeitabhängiges oder spezielles Vorwissen;
   - **13–17, anspruchsvoll:** Terme mit einer überschaubaren algebraischen Umformung; die Gleichheit der vier richtigen Terme gilt für alle x;
   - **18+, leicht:** eine direkt prüfbare Eigenschaft einfacher Zahlen ohne kontextabhängiges Vorwissen;
   - **18+, anspruchsvoll:** eine allgemeine Beziehung; benötigte Begriffe und Notation werden erklärt, und ein Gegenbeispiel muss den Regelverletzer prüfbar machen.

Automatische Prüfungen belegen die formale Lösbarkeit, nicht die altersgerechte Verständlichkeit oder semantische Eindeutigkeit. Handgebaute Aufgaben sowie neue Regeltypen benötigen daher zusätzlich eine redaktionelle Prüfung; vor V1-Freigabe wird jede Altersgruppe-/Schwierigkeitskombination mit einer geprüften Beispielaufgabe abgedeckt.
