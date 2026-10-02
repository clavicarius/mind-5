# Mind 5 – Projektübersicht

## Projektidentität

| Merkmal | Festlegung |
| --- | --- |
| Name | Mind 5 |
| Repository | `clavicarius/mind-5` (`mind-5`) |
| Produkt | Kostenloses, werbefreies tägliches Browser-Puzzlespiel |
| Tagesrunde | Genau fünf Denkaufgaben |
| V1-Sprache | Deutsch |
| Tageszeitzone | `Europe/Berlin` |

Der Name „Mind 5“ verweist auf die fünf Denkaufgaben einer Tagesrunde. V1 enthält weder eine Story noch soziale Funktionen oder ein Sharing-System.

## Produktprinzipien und V1-Umfang

- Die Engine wählt Aufgabenmechaniken, Reihenfolge, Schwierigkeit und konkrete Inhalte. Spielende wählen keine Mechaniken.
- Eine Tagesrunde verwendet fünf Aufgaben aus zehn Mechaniken. Eine Mechanik kommt höchstens zweimal vor; damit sind mindestens drei Mechaniken vertreten.
- Alle zehn Mechaniken stehen grundsätzlich allen drei Altersgruppen zur Verfügung: 8–12, 13–17 und 18+.
- Mind 5 ist zunächst ein backend-freies Browsergame für Mobilgeräte, Tablets und Desktop. Touch, Maus, Tastatur und teilweise Offline-Nutzung sind zu berücksichtigen.
- Die Architektur soll spätere Accounts, Synchronisierung und weitere Sprachen ermöglichen, ohne diese Funktionen in V1 umzusetzen.
- Explizit nicht Teil von V1 sind Story, Social-/Sharing-Funktionen, Ranglisten, Accounts, Cloud-Synchronisierung, Langzeitstatistiken, Newsletter, Werbung, Monetarisierung und ein komplexes Backend.

## Die zehn Mechaniken

1. **Memory Logic** – Informationen merken und daraus Fragen beantworten
2. **Zahlenfolge** – Regel erkennen und eine Zahlenfolge fortsetzen
3. **Muster fortsetzen** – ein visuelles Muster erkennen und fortsetzen
4. **Was passt nicht?** – den Regelverletzer identifizieren
5. **Raster-Logik** – ein Raster anhand von Bedingungen vervollständigen
6. **Drehen & Denken** – Formen oder Objekte gedanklich drehen
7. **Reihenfolge** – Elemente anhand von Hinweisen ordnen
8. **Visueller Vergleich** – Unterschiede oder Veränderungen erkennen
9. **Wortlogik** – Wörter anhand von Beziehungen, Bedeutungen oder Regeln zuordnen
10. **Rechenlogik** – Mathematik mit zusätzlichen logischen Bedingungen

Die Mechaniken decken Logik/Deduktion, Mustererkennung, visuelle Wahrnehmung, räumliches Denken, Zahlen/Mathematik und Text/Sprache ab.

## Altersgruppen und Schwierigkeitsstufen

Vor dem Start wird eine Altersgruppe gewählt. Sie beeinflusst Inhalte, Begriffe und Sprache, Komplexität, Darstellung und konkrete Schwierigkeit – nicht die grundsätzliche Verfügbarkeit einer Mechanik.

Jede Mechanik hat grundsätzlich die Stufen **leicht** und **anspruchsvoll**. Anspruchsvoll bedeutet mehr kognitive Verknüpfung, nicht lediglich mehr Elemente. Vor einer Runde wählt die spielende Person eines von sechs Profilen:

| Profil | Leicht | Anspruchsvoll | Bezeichnung |
| --- | ---: | ---: | --- |
| 1 | 5 | 0 | Entspannt |
| 2 | 4 | 1 | Locker |
| 3 | 3 | 2 | Ausgewogen |
| 4 | 2 | 3 | Knifflig |
| 5 | 1 | 4 | Schwer |
| 6 | 0 | 5 | Extrem |

Nach Rundenbeginn ist das Profil nicht änderbar. Beim Altersgruppenwechsel werden aktuelle Tageswertung und Streak zurückgesetzt; die Rekordführung ist altersgruppenspezifisch. Der Umgang mit bereits bestehenden Rekorden beim Wechsel ist in der Übergabe als Reset beschrieben und bei der Umsetzung entsprechend zu konkretisieren.

## Qualitätsziele

### Barrierearmut

Von Beginn an zu berücksichtigen sind vollständige Tastaturbedienung, sichtbarer Fokus, ausreichender Kontrast, verständliche Fehlermeldungen, Screenreader-Unterstützung, ausreichend große Touch-Ziele, reduzierte Bewegung, klare Zustands- und Fortschrittsanzeigen. Farbe darf nie die einzige Information vermitteln.

### Internationalisierung

V1 wird nur auf Deutsch ausgeliefert. UI-Texte sollen auslagerbar sein, Content und Darstellung getrennt bleiben und Sprache als Datenfeld vorgesehen werden. Sprachabhängige Mechaniken sollen separat behandelt werden können.

### Aufgabenqualität

Vor dem Ausbau der vollständigen Engine soll ein kleiner, validierter Aufgabenbestand für alle zehn Mechaniken vorhanden sein. Handgebaute Aufgaben werden redaktionell geprüft; generierte Aufgaben automatisiert validiert. Eine Mischung aus handgebauten, algorithmisch generierten und hybriden Aufgaben ist vorgesehen.

## Technische Leitlinien

Mind 5 soll mit JavaScript nur dort umgesetzt werden, wo es erforderlich ist. Die lokale Persistenzentscheidung (localStorage oder IndexedDB) wird erst nach Definition des Persistenzschemas getroffen. Der Datenzugriff soll abstrahiert werden, damit später IndexedDB oder Synchronisierung ergänzt werden können.

Vorgesehene persistente Daten umfassen Spielstatus, Tagesrunde und offiziellen Versuch, Rekorde, Streak, Altersgruppe, Zeitquelle, Validierungsstatus sowie Versions- und Migrationsinformationen. V1 speichert keine weitergehende Statistik-Historie. Persistenz erlaubt ausdrücklich keine Fortsetzung einer laufenden Runde nach dem Schließen des Browsers oder der App; die Runde wird verworfen und eine offizielle Runde nach den Regeln zum Tagesabbruch gewertet.
