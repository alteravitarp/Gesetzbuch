---
label: Bußgelder für das Beamtendienstgesetz
icon: ':bookmark_tabs:'
order: 98
hidden: true

data:
  law_book_short: 'BDG'
  fines:
    - law: '§2'
      label: 'Pflichten aller Beamten'
      url: '../Gesetze/BDG.md#2-pflichten-aller-beamten'
      items:
        - { id: 1, label: 'Verletzung der Meldepflicht', fine: '100.000', type: 'danger' }
        - { id: 2, label: 'Verletzung der Ausweispflicht', fine: '100.000' }
        - { id: 3, label: 'Verletzung der Behandlungspflicht', fine: '100.000' }
        - { id: 4, label: 'Verletzung der Folgepflicht', fine: '100.000' }
        - { id: 5, label: 'Verletzung der Schweigepflicht', fine: '100.000' }
        - { id: 6, label: 'Verletzung der Dokumentationspflicht', fine: '100.000' }
        - { id: 7, label: 'Nicht diensttaugliches Verhalten', fine: '100.000' }
        - { id: 8, label: 'Korruption', fine: '50.000', jailTime: 200 }

    - law: '§3'
      label: 'Befugnisse der Beamten'
      url: '../Gesetze/BDG.md#3-befugnisse-der-beamten'
      items:
        - { id: 1, label: 'Verletzung der Meldepflicht', fine: '100.000' }
---
{{# Table Generator }}

{{~ for fine in fines ~}}
## [{{ fine.law }} {{ fine.label }}]({{ fine.url }})

{{ fine.law }} {{ law_book_short}} | {{ fine.label }} | Strafe | Hafteinheiten | Bußgeld { class="compact thead--blue" }
---------------- | ---------------- | ------ | ------------: | --------------------------------------:
{{~ for item in fine.items ~}}
{{ if item.type ~}}
  [!badge variant="{{ item.type }}" text="{{ fine.law }} Abs. {{ item.id }} {{ law_book_short }}"] | {{ item.label }} | {{ item.punishment ?? '-' }} | {{ item.jailTime ?? 0 }} | {{ item.fine ?? 0}} €
{{ else ~}}
  {{ fine.law }} Abs. {{ item.id }} {{ law_book_short }} | {{ item.label }} | {{ item.punishment ?? '-' }} | {{ item.jailTime ?? 0 }} | {{ item.fine ?? 0}} €
{{ end ~}}
{{~ end ~}}
{{~ end ~}}

<style>
.sidebar-right {
    display: none;
}
</style>