# Sigida Herema · PIF

Application SvelteKit (Svelte 5) pour préparer et visualiser l'évaluation finale du projet Sigida Herema de Search for Common Ground, menée par Sahel Analytics, à travers le Cadre d'Impact pour la Paix (PIF).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # site statique dans build/
npm run preview
```

## Structure

```
src/
  app.html                 polices Google (Anton, Permanent Marker, Montserrat, Lato)
  app.css                  styles globaux, palette du PIF Packet
  routes/+page.svelte      assemble les sections
  lib/
    data/pif.js            thèmes, piliers, questions OCDE × PIF, indicateurs
    data/projet.js         parties prenantes (STAKE) et interventions (INTER)
    iso/iso.js             primitives isométriques (box, roof, house, tower, person, tree…)
    iso/scene.js           composition de la scène Bamako / Mopti / Gao
    components/
      Cover.svelte         couverture et navigation
      Ecosysteme.svelte    scène isométrique interactive et panneau acteur / intervention
      Loupe.svelte         loupe pentagonale des 5 thèmes
      ThemeIcon.svelte     pictos au trait des thèmes
      Piliers.svelte       escalier isométrique des 3 piliers
      Matrice.svelte       critères OCDE × thèmes du PIF
      Indicateurs.svelte   jauges base / cible, filtres par thème
      Mission.svelte       déroulé, notation des offres, points de vigilance
      Shapes.svelte        rend les descripteurs de formes en SVG
      Pill.svelte          étiquette de thème
```

## Faire évoluer

- **Ajouter une valeur finale** : dans `data/pif.js`, ajoutez un champ `f` aux entrées de `IND`, puis affichez-le dans `Indicateurs.svelte` (à la place de « à mesurer »).
- **Ajouter un acteur** : une entrée dans `STAKE` (`data/projet.js`), un ou plusieurs objets dans `OBJECTS` (`iso/scene.js`) avec la même clé `sh`, et un libellé dans `LABELS`.
- **Ajouter une intervention** : une entrée dans `INTER` avec la liste des acteurs (`sh`) et des thèmes (`dims`).
- **Bilingue FR/EN** : les textes sont regroupés dans `data/`, ce qui facilite une version anglaise.

## Sources

- *The Peace Impact Framework*, Lemon, A. et al., version française juin 2023 : https://cnxus.org/peace-impact-framework/ (outil en libre accès, attribution requise).
- TDR de l'appel d'offres Search for Common Ground n° SFCG ML 03-172026 (août 2026).

Les rattachements marqués « proposé » ou « lecture proposée » sont une analyse de Sahel Analytics à valider au cadrage.
