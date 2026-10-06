# Mind 5 – Roadmap und offene Entscheidungen

## Verbindlich entschieden

- Mind 5, Repository `mind-5`; backend-freie V1.
- Genau fünf Aufgaben je Tagesrunde, zehn Mechaniken, drei Altersgruppen und zwei Mechanik-Schwierigkeitsstufen.
- Sechs feste Schwierigkeitsprofile; die Engine wählt Mechaniken und Aufgaben.
- Höchstens zwei Aufgaben mit derselben Mechanik und mindestens drei verschiedene Mechaniken pro Runde.
- Regeln für offiziellen Tagesversuch, weitere Runden, Fehler, Überspringen, Hinweise, Tageswert, Rekorde, Streak, aktive Zeit und `Europe/Berlin` sind in der [Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md) festgehalten.
- Memory Logic ist die erste vollständig auszuarbeitende Referenzmechanik.

## Nächster fachlicher Arbeitsschritt

**Mechanik 2 – Zahlenfolge vollständig spezifizieren**, bevor die nächste Mechanik bearbeitet wird. Dabei dieselbe Struktur wie bei Memory Logic verwenden:

1. Spielziel
2. Altersgruppen
3. leicht / anspruchsvoll
4. Aufgabengenerierung
5. Eingabe
6. Fehler
7. Undo / Neustart
8. Hinweise
9. Punkte
10. Lösung / Feedback
11. Validierung

Muster fortsetzen und Was passt nicht? sind vollständig spezifiziert. Aktuell stehen sieben Mechanikprofile aus: Zahlenfolge und sechs weitere Mechaniken. Nach der vollständigen Spezifikation der Zahlenfolge werden die übrigen sechs Mechaniken jeweils mit einem vollständigen Standardprofil für den V1-Kernumfang beschrieben; Memory Logic bleibt die Referenzmechanik.

## Priorisierte weitere Arbeit

Die Arbeitsweise bleibt schrittweise und entscheidungsorientiert: möglichst genau eine offene Entscheidung pro Schritt; verbindliche Festlegungen, offene Punkte und für V1 ausgeschlossene Themen getrennt halten. Technische Lösungen werden nicht vorweggenommen, solange die fachlichen Anforderungen offen sind.

| Priorität | Arbeitspaket | Ergebnis |
| ---: | --- | --- |
| 1 | Mechaniken | Sieben verbleibende Mechaniken vollständig spezifizieren, jeweils nur V1-Kernumfang. |
| 2 | Gemeinsames Bewertungsmodell | Einheitliches Modell für Aufgabenpunkte 0–100, Fehler, Überspringen, Lösung, Abschluss, Hinweise, Rundung und Tagesnormalisierung definieren; mindestens drei Mechaniktypen konkret durchrechnen. |
| 3 | Memory Logic finalisieren | Erlaubte Themen/Begriffe, Satzlänge, Abstraktionsgrad und Ausschlüsse; Objekt-, Fakten- und Beziehungsmodell; Ableitungen und Fragearten; mindestens fünf Beispiele je Altersgruppe und Schwierigkeit; Aktionen, Zeit, Fehler, Punkte und Abbruch für jeden Zustand definieren. |
| 4 | Generierung und Validierung | Handgebaut/generiert/hybrid je Mechanik, Parameter, Lösbarkeit, Eindeutigkeit, Schwierigkeitsprüfung, redaktionelle Prüfung und Verhalten bei fehlgeschlagener Validierung festlegen. |
| 5 | Rundengenerierung | Gewichtung der Puzzlebereiche konkretisieren; Pflichtregeln und Schwierigkeitsverteilung bleiben vorrangig. |
| 6 | Content-Menge | Mindestzahlen, Wiederholung, inhaltliche Gleichheit und Verhalten bei erschöpftem Content bestimmen. |
| 7 | Persistenz | Zuerst Persistenzschema entwerfen, danach localStorage oder IndexedDB entscheiden. |
| 8 | Zeit und Tageswechsel | Zustandsmodell und Tests für aktive Zeit, Pause, Tabwechsel, Offline, Mitternacht, Gerätewechsel, Zeitquellen, Manipulation sowie offizielle/weitere/verwarfene Runde festlegen. |
| 9 | UI/UX | Gemeinsames Grundgerüst entwerfen, danach mechanikspezifische Oberflächen darauf aufbauen. |
| 10 | Barrierearmut | Parallel zur UI-Entwicklung berücksichtigen, nicht nachträglich ergänzen. |
| 11 | QA und Redaktion | Je Aufgabe Mechanik, Altersgruppe, Schwierigkeit, Lösung, Validierungsstatus, Version und Änderungsverlauf erfassen; technische und redaktionelle Prüfung kombinieren. |
| 12 | Internationalisierung | Technisch vorbereiten, ohne vollständige Mehrsprachigkeit in V1 umzusetzen. |
| 13 | Statistik | Langzeitstatistiken bewusst ausschließen; nur für Tagesrunde, Bestwert, Bestzeit, Streak und technische Persistenz erforderliche Daten speichern. |

## Noch offene Entscheidungen

- Konkrete Hinweisstufen und Punktabzüge sowie Rundungsebene und -zeitpunkt (die Rundungsart ist kaufmännisch festgelegt).
- Vollständiges gemeinsames Bewertungsmodell einschließlich Beispielen verschiedener Mechaniktypen.
- Detaillierte Inhalts- und Zustandsregeln der Memory Logic sowie vollständige Profile der übrigen Mechaniken.
- Ob übersprungene Memory-Logic-Fragen einen der drei Aufgabenfehler verbrauchen.
- Ob Rekorde einer Altersgruppe beim Wechsel gelöscht oder nur nicht wiederhergestellt/angezeigt werden.
- Rundengenerator-Gewichtung, Mindestumfang und Erschöpfungsregeln für Inhalte.
- Persistenzschema und darauf basierende Wahl zwischen localStorage und IndexedDB.
- Zeitquelle, Offline-Abgleich und Zustandsübergänge für Mitternacht und Zeitmanipulation im Detail.
- Konkrete technische Ausgestaltung des UI-Grundgerüsts, QA-Prozesses und der Internationalisierungsvorbereitung.

## V1 ausdrücklich ausgeschlossen

Story, Social-/Sharing-System, Ranglisten, Accounts, Cloud-Synchronisierung, Langzeitstatistiken, Newsletter, Monetarisierung, Werbung und komplexe Backend-/CMS-Strukturen.
