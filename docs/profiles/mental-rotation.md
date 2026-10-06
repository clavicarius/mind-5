# Drehen & Denken – V1-Standardprofil

## Spielziel

Die Aufgabe zeigt eine Vorlage und nennt eine Drehung. Die spielende Person stellt sich vor, wie die Vorlage nach dieser Drehung aussieht, und wählt die passende Abbildung aus genau vier Antwortoptionen. Eine Aufgabe hat genau eine richtige Antwort.

## Altersgruppen

Die Grundregel, erlaubten Drehungen und Bedienung sind in allen Altersgruppen gleich. Angepasst werden visuelle Komplexität und Gestaltung:

| Altersgruppe | Leicht | Anspruchsvoll |
| --- | --- | --- |
| 8–12 | Vertraute, einfache Silhouetten aus 3–5 Rasterfeldern; kurze Anweisung | Zwei einfache Silhouetten in einer Anordnung; ihre relative Position bleibt wichtig |
| 13–17 | Geometrische Silhouetten aus 4–6 Rasterfeldern, neutral gestaltet | Zwei oder drei geometrische Silhouetten in einer Anordnung |
| 18+ | Abstrakte Silhouetten aus 5–7 Rasterfeldern, sachliche Gestaltung | Zwei oder drei asymmetrische Silhouetten mit dichterer, aber übersichtlicher Anordnung |

Alle Unterschiede müssen direkt in der Abbildung erkennbar sein. Spezialwissen, Farbe als einziges Unterscheidungsmerkmal und unnötige Details sind ausgeschlossen. Die Elemente müssen auf kleinen Bildschirmen kontrastreich und ausreichend groß bleiben.

## Darstellung und erlaubte Transformationen

- Vorlagen bestehen aus einer oder mehreren klar abgegrenzten 2D-Silhouetten auf einem quadratischen Raster. Eine Silhouette wird aus zusammenhängenden gleich großen Rasterfeldern gebildet; mehrere Silhouetten sind einzeln unterscheidbar.
- Jede Aufgabe nennt eine Drehung um den Mittelpunkt der Vorlage: **90°, 180° oder 270° im Uhrzeigersinn**. Alle Teile einer Vorlage werden gemeinsam und starr gedreht. Bei mehreren Silhouetten bleiben ihre Form und ihre relative Anordnung erhalten.
- Die Drehung ist die einzige gesuchte Transformation. Spiegeln, Kippen, Verformen, Skalieren, perspektivische Änderungen und das unabhängige Drehen einzelner Teile sind nicht erlaubt. Die Drehung erfolgt exakt in Vierteldrehungen; Zwischenwinkel kommen nicht vor.
- Vorlage und Optionen verwenden dasselbe Raster, dieselbe Größe und dieselbe Strichstärke. Die Optionen dürfen an unterschiedlichen Stellen innerhalb ihres gleich großen Rahmens stehen; ihre Position im Antwortfeld hat keine Bedeutung. Farbe wird nie als einziges Unterscheidungsmerkmal verwendet.

## Leicht und anspruchsvoll

| Schwierigkeit | Vorlage und Drehung | Antwortoptionen |
| --- | --- | ---: |
| Leicht | Eine asymmetrische Silhouette; eine einzelne Drehung um 90°, 180° oder 270° | exakt 4, davon 1 richtig |
| Anspruchsvoll | Eine Anordnung aus zwei oder drei unterscheidbaren Silhouetten; die gesamte Anordnung wird um 90°, 180° oder 270° gedreht | exakt 4, davon 1 richtig |

Anspruchsvoll erfordert, sowohl die Ausrichtung der Formen als auch ihre räumliche Beziehung zueinander gedanklich mitzudrehen. Die Zahl der Antwortoptionen bleibt gleich; zusätzliche Elemente allein begründen keine höhere Schwierigkeit.

## Aufgabengenerierung und Eindeutigkeit

Eine Aufgabe speichert Altersgruppe, Schwierigkeit, Rastervorlage, Drehwinkel, vier Antwortoptionen, richtige Option, Regelparameter und kurze Erklärung. Optionen werden aus der korrekten Drehung und plausiblen Abweichungen gebildet, zum Beispiel einer Spiegelung, einem falschen Drehwinkel oder einer veränderten relativen Position. Die Reihenfolge der Optionen wird gemischt.

Die Vorlage muss asymmetrisch sein, sodass die geforderte Drehung nicht mit einer anderen erlaubten Ausrichtung verwechselt werden kann. Antwortoptionen müssen sich sichtbar unterscheiden. Insbesondere darf eine Spiegelung nicht mit der korrekten Drehung identisch sein. Es darf weder ein Duplikat noch eine zweite richtige Option geben.

Es gilt genau eine Lösung innerhalb des festgelegten Modells: dieselbe unveränderte Vorlage, gemeinsam um den angegebenen Winkel um ihren Mittelpunkt gedreht. Ein anderes Aussehen, das durch Spiegelung, Größenänderung oder unabhängige Bewegung von Teilen entsteht, zählt nicht als gleichwertige Lösung. Die Aufgabe darf keine Information erfordern, die nicht in der Darstellung oder Anweisung enthalten ist.

Build-Zeit-Generierung wird bevorzugt. Handgebaute Aufgaben durchlaufen dieselben Strukturprüfungen und zusätzlich eine redaktionelle Prüfung auf Verständlichkeit, Darstellung und eindeutige Lösung. Ungültige Aufgaben werden verworfen und nicht angezeigt.

## Eingabe

Die Antwort wird aus den vier Optionen ausgewählt: durch Tippen, Mausklick oder Tastatur. Genau eine Option kann markiert sein. Die Auswahl ist vor dem Absenden änderbar; erst die ausdrückliche Bestätigung wertet sie als Antwort. Es gibt keine Freitexteingabe und kein Multi-Select. Eine nicht ausgewählte oder nicht bestätigte Option zählt nicht als Fehler.

## Fehler

Eine falsch bestätigte Auswahl zählt als ein Fehler. Danach wird die Auswahl aufgehoben, es wird klar „falsch“ angezeigt und die richtige Option nicht verraten. Die Aufgabe bleibt für weitere Versuche offen, solange sie nach den gemeinsamen Fehlerregeln nicht beendet ist. Der dritte Fehler beendet sie automatisch und ergibt null Punkte.

## Undo / Neustart

Vor dem Absenden lässt sich eine Auswahl ändern oder aufheben; dadurch wird kein Fehler zurückgenommen oder verbraucht. Eine bestätigte Antwort kann nicht rückgängig gemacht werden.

Ein Neustart erfordert die gemeinsame Bestätigung und zeigt dieselbe Aufgabe erneut; die Auswahl wird zurückgesetzt. Bereits verbrauchte Fehler sowie verwendete Hinweise und deren Auswirkung auf die erreichbare Punktzahl bleiben erhalten.

## Hinweise

Es gibt höchstens zwei Hinweise pro Aufgabe. Der erste lenkt auf die Ausrichtung einer einzelnen Silhouette oder – bei anspruchsvollen Aufgaben – auf die gemeinsame Drehung aller Teile. Der zweite lenkt auf eine konkrete Orientierung beziehungsweise die relative Position der Teile, ohne die richtige Option zu nennen. Hinweise können nicht zurückgenommen werden; Neustart setzt die Zahl genutzter Hinweise nicht zurück. Punktabzüge richten sich nach den gemeinsamen Hinweisregeln.

## Punkte und Abschluss

Eine richtige Antwort erhält die nach den gemeinsamen Bewertungs- und Hinweisregeln erreichbaren Punkte bis höchstens 100. Falsche Antworten bringen keine Teilpunkte. Überspringen, Lösung anzeigen, dritter Fehler und nicht abgeschlossene Aufgaben ergeben null Punkte. Nach einer richtigen Auswahl wird das Ergebnis angezeigt; die Aufgabe wird erst mit der gemeinsamen Abschlussbestätigung endgültig abgeschlossen.

Bei endgültigem Abschluss wird die korrekte Abbildung zusammen mit der Vorlage, dem Drehwinkel und einer kurzen Erklärung gezeigt. Nach Überspringen, Anzeigen der Lösung oder sonstigem vorzeitigem Aufgabenende wird ebenfalls die korrekte Drehung erklärt. Rückmeldung, Auswahlzustand und Fehlerzahl müssen auch für Tastatur- und Screenreader-Nutzung verständlich sein; Farbe darf nicht das einzige Feedback sein.

## Validierung

Jede Aufgabe wird vor der Anzeige automatisiert geprüft:

1. Vorlage, Drehwinkel und Anzahl sowie Art der Antwortoptionen entsprechen Altersgruppe und Schwierigkeitsstufe.
2. Die richtige Option entspricht exakt einer starren Drehung der vollständigen Vorlage um deren Mittelpunkt und den angegebenen Winkel.
3. Keine andere Option entspricht dieser Drehung; es gibt keine Duplikate und keine zweite richtige Antwort.
4. Die Vorlage ist ausreichend asymmetrisch; erlaubte Drehungen und Antwortoptionen sind visuell unterscheidbar.
5. Distraktoren verletzen mindestens eine festgelegte Eigenschaft, etwa Drehwinkel, Händigkeit oder relative Anordnung; sie sind keine weiteren gültigen Lösungen.
6. Darstellung, Kontrast und Verständlichkeit erfüllen die Anforderungen für die Altersgruppe; Unterschiede sind nicht ausschließlich farblich codiert.

Automatische Prüfungen belegen die formale Lösbarkeit, nicht die altersgerechte Verständlichkeit. Handgebaute Aufgaben benötigen deshalb zusätzlich eine redaktionelle Prüfung. Vor V1-Freigabe wird jede Altersgruppe-/Schwierigkeitskombination mit einer geprüften Beispielaufgabe abgedeckt.
