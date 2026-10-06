# Muster fortsetzen – V1-Mechanikprofil

## Spielziel

Eine visuelle Folge folgt einer erkennbaren Regel. Die spielende Person wählt das Element, das die Folge korrekt fortsetzt. Pro Aufgabe gibt es genau eine Lücke am Ende der Folge und genau eine richtige Antwort.

## Altersgruppen

Die Altersgruppe beeinflusst Motive sowie sprachliche und visuelle Komplexität innerhalb der gewählten Schwierigkeitsstufe, nicht die Grundbedienung oder deren festgelegte Positions- und Optionszahlen:

- **8–12:** klare, konkrete Motive wie einfache Formen oder vertraute Gegenstände; wenige Details und kurze, direkte Anweisungen.
- **13–17:** geometrische und alltagsnahe Motive mit reduzierter, altersneutraler Gestaltung; Regeln werden ohne unnötige Erklärungstexte dargestellt.
- **18+:** überwiegend abstrakte Formen und Symbole, sachliche Gestaltung und keine kindlich dekorativen Elemente.

Alle Motive müssen ohne Spezialwissen verständlich sein. Farbe wird nie als einziges unterscheidendes Merkmal verwendet: Form, Muster, Position oder eine Text-/Symbolkennzeichnung machen Unterschiede ebenfalls erkennbar. Kontrast und Elementgröße bleiben auch auf kleinen Bildschirmen ausreichend.

## Leicht und anspruchsvoll

| Schwierigkeit | Folge | Regelumfang | Antwortoptionen |
| --- | --- | --- | ---: |
| Leicht | 5 Positionen: 4 sichtbare Elemente und 1 Lücke | Eine einfache Regel über höchstens ein visuelles Merkmal; z. B. Wechsel, Wiederholung einer Einheit der Länge 2 oder 3 oder ein einzelner gleichmäßiger Schritt | exakt 4, davon 1 richtig |
| Anspruchsvoll | 7 Positionen: 6 sichtbare Elemente und 1 Lücke | Eine Regel mit zwei verflochtenen Folgen oder einer einfachen Kombination aus zwei Merkmalen; z. B. abwechselnde Teilfolgen oder gleichzeitiger Wechsel von Form und Position | exakt 5 oder 6, davon 1 richtig |

Erlaubte Merkmale sind Form, Füllung/Muster, Position, Größe und Drehung in klar unterscheidbaren festen Schritten. Anspruchsvoll bedeutet, dass eine Regel erkannt und verknüpft werden muss, nicht bloß, dass mehr Elemente oder feinere Details gezeigt werden. Die Folge wird links nach rechts angeordnet; notwendige Legenden und Bedienelemente zählen nicht als Folgeelemente. Jede Aufgabe vermeidet unnötige Animationen und zeitliche Begrenzungen.

## Aufgabengenerierung

Eine Aufgabe enthält die Folge, ihre zugrunde liegende Regel samt Parametern, die richtige Fortsetzung sowie die Antwortoptionen. Die Folge wird vollständig aus der Regel abgeleitet. Distraktoren entstehen durch plausible, aber regelwidrige Abweichungen, etwa das Fortsetzen nur einer der verflochtenen Teilfolgen. Optionen sind visuell eindeutig verschieden und enthalten weder Duplikate noch eine zweite gültige Fortsetzung.

Die Engine wählt nur Regeln aus einer begrenzten, geprüften Regelmenge. Schwierigkeit, Altersdarstellung, Positionszahl und Optionszahl müssen dem Profil entsprechen. Für die Erkennbarkeit muss die sichtbare Folge die vorgesehene Regel innerhalb dieser Regelmenge von den Alternativen unterscheiden; beliebige, nicht zugelassene Deutungen sind kein zusätzliches Lösungsmodell. Build-Zeit-Generierung wird bevorzugt. Handgebaute Aufgaben benötigen dieselben Strukturprüfungen und zusätzlich redaktionelle Prüfung.

## Eingabe

Die Antwort wird aus den vorgegebenen Optionen ausgewählt: durch Tippen, Mausklick oder Tastatur. Genau eine Option kann markiert sein. Die Auswahl ist vor dem Absenden änderbar; erst die ausdrückliche Bestätigung wertet sie als Antwort. Es gibt keine Freitexteingabe und kein Multi-Select. Eine nicht ausgewählte oder noch nicht bestätigte Option zählt nicht als Fehler. Die gemeinsame Aktion zum Überspringen oder Anzeigen der Lösung folgt den Regeln unter „Aufgabe abschließen“.

## Fehler

Eine falsch bestätigte Option zählt als ein Fehler. Danach wird die Auswahl aufgehoben und eine neue Antwort kann bestätigt werden; die richtige Antwort wird dabei nicht verraten. Die Aufgabe endet nach dem dritten Fehler automatisch mit null Punkten, wie in den gemeinsamen Fehlerregeln festgelegt. Richtige Bestätigungen schließen die Aufgabe ab; die erforderliche Abschlussbestätigung richtet sich nach „Aufgabe abschließen“.

## Undo / Neustart

Vor dem Absenden lässt sich die Auswahl ändern oder aufheben; dadurch wird kein Fehler zurückgenommen oder verbraucht. Eine bereits bestätigte Antwort kann nicht rückgängig gemacht werden. Ein Neustart erfordert die gemeinsame Bestätigung, zeigt dieselbe Folge erneut und setzt die Auswahl zurück. Bereits verbrauchte Fehler sowie verwendete Hinweise und deren Auswirkung auf die erreichbare Punktzahl bleiben erhalten.

## Hinweise

Es gibt höchstens zwei Hinweise pro Aufgabe. Der erste benennt die Art des relevanten Merkmals oder der Regel, ohne die Fortsetzung vorwegzunehmen. Der zweite grenzt die Regel weiter ein oder erklärt den nächsten Zusammenhang, verrät aber nicht die richtige Option. Ein Hinweis kann nicht zurückgenommen werden; ein Neustart setzt die Zahl genutzter Hinweise nicht zurück. Ob und wie stark Hinweise die Punktzahl begrenzen, folgt den gemeinsamen Hinweisregeln.

## Punkte

Eine richtige Antwort erhält die nach den gemeinsamen Hinweisregeln erreichbaren Punkte bis höchstens 100. Falsche Antworten bringen keine Teilpunkte; eine nach weiteren Versuchen richtige Antwort wird nach derselben Regel gewertet. Überspringen, angezeigte Lösung, dritter Fehler und nicht abgeschlossene Aufgabe ergeben null Punkte. Für Rundungsart, Rundungsebene und -zeitpunkt gelten die gemeinsamen Bewertungsregeln.

## Lösung und Feedback

Nach jeder bestätigten Antwort wird klar angezeigt, ob sie richtig oder falsch war; Farbe ist dabei nie das einzige Signal. Falsches Feedback nennt nicht die Lösung, solange die Aufgabe noch offen ist. Bei endgültigem Abschluss werden die richtige Fortsetzung und die zugrunde liegende Regel in einem kurzen Satz erklärt. Nach einem Abbruch, Überspringen oder Anzeigen der Lösung wird ebenfalls die korrekte Fortsetzung gezeigt. Anweisungen, Auswahlzustand, Fehlerzahl und Rückmeldung müssen auch für Tastatur- und Screenreader-Nutzung verständlich sein.

## Validierung

Jede Aufgabe wird vor der Anzeige automatisiert auf folgende Bedingungen geprüft:

- Anzahl und Reihenfolge der Positionen entsprechen der Schwierigkeit; die letzte Position ist die einzige Lücke.
- Jedes sichtbare Element und die Lösung folgen der gespeicherten Regel und deren Parametern.
- Die Regel ist mit der sichtbaren Folge innerhalb der zugelassenen Regelmenge unterscheidbar.
- Es gibt exakt eine richtige Fortsetzung; alle Antwortoptionen sind verschieden und alle Distraktoren sind nach der gespeicherten Regel falsch.
- Anzahl der Optionen, verwendete Regelkomplexität und visuelle Merkmale entsprechen der Schwierigkeitsstufe.
- Darstellung ist ohne Spezialwissen verständlich und vermittelt keinen Unterschied ausschließlich durch Farbe.

Ungültige generierte Aufgaben werden verworfen und nicht angezeigt; die Engine versucht eine andere Aufgabe. Wenn keine gültige Aufgabe verfügbar ist, wird eine redaktionell geprüfte Aufgabe verwendet. Handgebaute Aufgaben werden zusätzlich redaktionell auf Eindeutigkeit, Altersangemessenheit und korrekte Erklärung geprüft.
