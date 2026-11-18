// Thèmes, piliers, questions d'évaluation et indicateurs.
// Sources : PIF Packet (Lemon, A. et al., version française juin 2023) et TDR Search n° SFCG ML 03-172026.

export const DIMS =[
 {id:"agency",name:"Pouvoir d'agir",opp:"Sentiment d'impuissance",
  def:"Le lien que les gens entretiennent avec leur société et le fait qu'ils croient avoir le pouvoir de la changer positivement. Ceux qui n'y parviennent pas peuvent chercher ailleurs un pouvoir et un but, et c'est l'un des principaux outils de recrutement de nombreux groupes violents.",
  tdr:"Le pouvoir d'agir des acteurs locaux",
  m:[["% de la population qui pense pouvoir faire une différence positive dans la zone où elle vit","Mercy Corps, Eirene"],["% de la population qui mène des actions pour influencer les choses qui lui tiennent à cœur","Aussi dans le MEAL global de Search"]],
  here:["Capacité des OSC à mener un plaidoyer constructif sur des questions sensibles","Participation des médias et OSC aux processus de décision","Population informée de ses droits et devoirs (indicateur 2.2)","Ancrage des capacités dans les pratiques quotidiennes (durabilité)"]},
 {id:"polar",name:"Polarisation",opp:"Solidarité",
  def:"Le degré de confiance que les gens ont les uns envers les autres pour partager un contrat social : les mêmes règles, les mêmes opportunités, et compter les uns sur les autres. Quand cette confiance se perd, d'autres groupes sont souvent vus comme une menace pour son humanité et sa dignité.",
  tdr:"La polarisation",
  m:[["% de personnes qui pensent être perçues comme moins qu'humaines en raison de leur groupe","Dehumanization Index"],["% prêts à recourir à la violence pour faire avancer les intérêts de leur groupe","Indice SCORE, WVS"]],
  here:["Collaboration entre médias et OSC pour le plaidoyer (indicateur 1)","Émissions favorisant le dialogue constructif (indicateur 2.3)","Écart entre groupes sur la confiance et la violence (MEAL global)","Transformation des discours et des pratiques (questions d'impact)"]},
 {id:"legit",name:"Légitimité",opp:"Corruption",
  def:"La manière dont les institutions conservent la confiance des personnes qu'elles servent, selon qu'elles leur sont redevables et les représentent ou non. Cela couvre la sécurité et la justice, mais aussi les médias, les structures traditionnelles et culturelles et les institutions religieuses.",
  tdr:"La légitimité des acteurs et des institutions",
  m:[["% qui estiment que la prise de décision est inclusive et responsable","ODD 16.7.2"],["% de la population satisfaite des services qu'elle demande aux autorités","Aussi dans le MEAL global de Search"]],
  here:["Confiance dans les médias et OSC comme sources fiables (indicateur 0.2)","Opinions prises en compte dans les politiques publiques (indicateur 2.1)","Redevabilité et représentativité des acteurs (pertinence)","Forums OSC-Gouvernement et relations avec les régulateurs"]},
 {id:"invest",name:"Investissements",opp:"Investir dans le conflit",
  def:"Ce qui indique si une société dispose des ressources pour soutenir la paix ou les conflits à long terme. On regarde souvent les armes, mais la demande pour des médias libres et indépendants, ou la valeur du temps que les jeunes investissent dans leurs communautés, dit aussi si la paix va durer.",
  tdr:"L'investissement durable dans des pratiques de paix",
  m:[["Valeur en dollars du temps et des ressources investis dans des priorités de paix","Retour social sur investissement"],["Importations et exportations d'armes","SIPRI"]],
  here:["Maintien des mécanismes, outils et partenariats après le projet","Institutionnalisation des forums OSC-Gouvernement","Viabilité financière des réseaux Sigida Herema et URTEL","Piste : valoriser le temps bénévole des OSC et le temps d'antenne des radios"]},
 {id:"violence",name:"Violence",opp:"Sécurité",
  def:"L'expérience personnelle et directe des individus avec la violence : être face à la mort ou à des attaques, ou au contraire se sentir en sécurité en rentrant chez soi.",
  tdr:"La prévention de la violence",
  m:[["% de la population qui se sent en sécurité en se déplaçant seule dans la zone où elle vit","ODD 16.1.4"],["Nombre de décès liés aux conflits pour 100 000 habitants","ODD 16.1.2"]],
  here:["Sécurité ressentie des participants (safeguarding)","Conviction que « la violence est parfois nécessaire » (MEAL global)","Protection des défenseurs des droits et des journalistes (indicateur 0.1)","Aucune question d'évaluation ne lui est rattachée dans les TDR"]}
];
export const D =Object.fromEntries(DIMS.map(d=>[d.id,d]));

export const ORDER = ['violence', 'agency', 'polar', 'legit', 'invest'];
export const SEGCOL = { agency: '#64c2b0', polar: '#fbb960', legit: '#a157ab', invest: '#4d7fc5', violence: '#f8d27d' };
