# Branching Model

## Branches und Pull Requests

`main` ist der Integrations- und Release-Branch. Änderungen erfolgen über Pull Requests
nach `main`; direkte Pushes auf `main` sind nicht vorgesehen. Pull Requests werden vor dem
Merge geprüft.

Quell-Branches für Pull Requests nach `main` verwenden das Format
`<prefix>/<name>`.

| Präfix | Verwendung |
| --- | --- |
| `feature/` | Neue Funktion |
| `enhancement/` | Verbesserung |
| `bugfix/` | Fehlerbehebung |
| `hotfix/` | Dringende Fehlerbehebung |
| `release/` | Vorbereitung eines Releases |
| `chore/` | Wartung und technische Aufgaben |
| `copilot/` | Von KI-Agenten erstellte Änderungen |

Der Name nach dem Präfix darf nur Kleinbuchstaben, Ziffern, Punkte, Unterstriche und
Bindestriche enthalten. Die vollständige Regel lautet:

```regex
^(feature|enhancement|bugfix|hotfix|release|chore|copilot)/[a-z0-9._-]+$
```

Beispiele: `feature/daily-round`, `bugfix/score-reset`,
`copilot/update-gameplay-docs`.

Der Workflow `Validate Branch Name` prüft die Quell-Branch-Namen von Pull Requests
nach `main`, außer bei PRs von Dependabot und Copilot. Dieser Workflow sollte in den
Branch-Protection-Regeln für `main` als erforderlicher Status-Check eingetragen werden.

## Release-Ablauf

Nach dem Merge nach `main` berechnet der Versionierungs-Workflow den nächsten
semantischen Versionstag und veröffentlicht ihn. Die Veröffentlichung löst anschließend
das Deployment der GitHub-Pages-App aus.

```text
Arbeits-Branch → Pull Request nach main → Review und Merge → Versionstag → Deployment
```

## KI-Agenten

KI-Agenten müssen dieselben Branch-Regeln einhalten. Für agentenerstellte Pull Requests
ist `copilot/` vorgesehen. Die verbindlichen Repository-Anweisungen stehen in
[`AGENTS.md`](../AGENTS.md) und [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).
