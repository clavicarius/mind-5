# Was passt nicht? – V1-Standardprofil

## Spielziel und Aufgabenaufbau

Die Aufgabe zeigt genau fünf auswählbare Elemente. Vier Elemente erfüllen eine erkennbare gemeinsame Regel; genau ein Element verletzt sie. Die Regel wird nicht vorab genannt. Die spielende Person wählt genau ein Element als Regelverletzer aus und bestätigt die Auswahl. Vor der Bestätigung ist die Auswahl änderbar. Eine falsche bestätigte Auswahl zählt als Fehler, wird als falsch markiert und kann nicht erneut gewählt werden; die Lösung wird dabei nicht verraten. Nach einer richtigen Auswahl oder einem vorzeitigen Aufgabenende wird die Regel samt Lösung erklärt. Es gelten die allgemeinen Regeln für drei Fehler, Überspringen, Lösung anzeigen und Aufgabenabschluss.

Die fünf Elemente bleiben in beiden Schwierigkeitsstufen gleich zahlreich. **Leicht** verwendet eine konkrete, unmittelbar erkennbare Regel mit einem Merkmal. **Anspruchsvoll** erfordert eine gedankliche Verknüpfung, etwa das Prüfen einer Gleichheit oder einer allgemeinen Beziehung; mehr Elemente allein machen eine Aufgabe nicht anspruchsvoller. In beiden Stufen muss die Regel aus der Aufgabe selbst erschließbar sein und darf kein Spezialwissen voraussetzen.

Die Aufgabe hat genau eine Antwort und keine Teilpunkte: Eine richtige bestätigte Auswahl erhält die nach den allgemeinen Regeln erreichbaren Punkte; falsche, übersprungene und offene Aufgaben erhalten null Punkte.

## Altersgruppen und Beispielaufgaben

Die Altersgruppe verändert Darstellung, Wortschatz und Komplexität des Inhalts, nicht die Zahl der Elemente oder das Lösungsprinzip. Beispiele zeigen jeweils vier passende Elemente und den Regelverletzer in **Fettdruck**.

| Altersgruppe | Leicht: Regel und Elemente | Anspruchsvoll: Regel und Elemente |
| --- | --- | --- |
| 8–12 | **Regel:** Die Form ist ein Kreis. Elemente: roter Kreis, blauer Kreis, grüner Kreis, gelber Kreis, **rotes Dreieck**. Vertraute, bildlich darstellbare Einzelmerkmale; kurze, konkrete Bezeichnungen. | **Regel:** Beide Seiten der Rechnung haben denselben Wert. Elemente: 8 + 7 = 10 + 5, 9 + 6 = 10 + 5, 14 − 4 = 5 + 5, 6 + 8 = 7 + 7, **18 − 7 = 6 + 6**. Zahlen und Rechenschritte bleiben im vertrauten Zahlenraum; die falsche Gleichung ist ein plausibler Rechenfehler. |
| 13–17 | **Regel:** Das Element bezeichnet einen Wochentag. Elemente: Montag, Donnerstag, Samstag, Sonntag, **April**. Vertraute Begriffe, aber weniger bildhafte oder stärker kategorische Unterscheidungen als bei der jüngsten Gruppe. | **Regel:** Beide Terme sind für jeden Wert von x gleich. Elemente: 2(x + 3) = 2x + 6, 3(x − 2) = 3x − 6, 4(x + 1) = 4x + 4, x + x = 2x, **5(x − 1) = 5x − 1**. Der falsche Term ist nahe an der richtigen Umformung. |
| 18+ | **Regel:** Die Zahl ist durch 2 teilbar. Elemente: 12, 18, 24, 30, **35**. Zahlen werden so gewählt, dass die Regel nicht bloß durch eine auffällige Darstellung verraten wird. | **Regel:** Die Gleichheit gilt für alle Mengen A und B. Die Aufgabe erklärt die verwendeten Symbole (∩: gemeinsame Elemente, ∪: Elemente aus mindestens einer Menge, ∅: leere Menge) an einem Beispiel. Elemente: A ∩ B = B ∩ A, A ∪ B = B ∪ A, A ∩ A = A, A ∪ ∅ = A, **A ∩ ∅ = A**. Der Regelverletzer lässt sich durch ein Gegenbeispiel prüfen; die Notation wird in der Aufgabe erklärt. |

## Regeln, Distraktoren und Eindeutigkeit

- Jede Aufgabe hat eine explizit im Aufgabensatz gespeicherte, überprüfbare Regel und eine kurze Begründung für jedes Element. Regeln beziehen sich nur auf dargestellte Merkmale, mitgelieferte Angaben oder im Aufgabentext erklärte Begriffe und Symbole.
- Die vier passenden Elemente müssen die Regel erfüllen; das fünfte muss sie verletzen. Die Lösung ist genau dieses eine Element. Ein bloß anderer Geschmack, eine subjektive Assoziation oder externes Faktenwissen darf keine alternative Lösung begründen.
- Alle fünf Elemente sind plausible Auswahlkandidaten: Die vier passenden Elemente teilen einzelne Merkmale mit dem Regelverletzer, und dieser ist ein plausibler Beinahe-Treffer statt eines offensichtlich sachfremden Elements. Position, Farbe oder Textlänge dürfen die Lösung nicht systematisch verraten; die Position wird gemischt.
- Eine Aufgabe wird verworfen, wenn ein Element mehrere relevante Regelverletzungen aufweist, mehr oder weniger als vier Elemente die Regel erfüllen oder eine andere zugelassene Regel zu einem anderen einzelnen Regelverletzer führt. Bei semantischen Regeln ist zusätzlich eine redaktionelle Prüfung nötig, da reine Merkmalsprüfung Mehrdeutigkeit nicht ausschließt.

## Generierung und Validierung

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
