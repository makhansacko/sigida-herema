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

export const CRIT =[
 {id:"pert",name:"Pertinence",qs:[
   {t:"Le projet a-t-il amélioré la perception de la légitimité des acteurs clés (institutions, médias, OSC), en renforçant leur redevabilité et leur représentativité ?",tags:["legit","agency"],x:true},
   {t:"Les interventions choisies (dialogues, campagnes, plaidoyer) étaient-elles les plus adaptées aux contraintes sécuritaires et politiques ?",tags:[],x:false},
   {t:"Le projet a-t-il répondu aux attentes de l'URTEL, des OSC, des services étatiques, des médias, des autorités coutumières et des communautés ?",tags:["agency","legit"],x:true}]},
 {id:"effi",name:"Efficacité",qs:[
   {t:"Les résultats sont-ils atteints, y compris les cibles revues à la hausse en janvier 2026 sur la confiance envers les médias et le plaidoyer des OSC ?",tags:["legit","agency"],x:true},
   {t:"Le projet a-t-il renforcé à la fois les compétences techniques et les capacités relationnelles et stratégiques des OSC et des médias ?",tags:["polar"],x:false},
   {t:"Les stratégies ont-elles renforcé la capacité des acteurs de l'espace civique à jouer leur rôle ?",tags:["agency"],x:true}]},
 {id:"effc",name:"Efficience",qs:[
   {t:"Le recours aux 383 radios de l'URTEL a-t-il amélioré le rapport coût-efficacité par rapport à l'approche prévue en octobre 2025 ?",tags:["invest"],x:false},
   {t:"L'optimisation logistique et la gestion des partenariats ont-elles amélioré le rapport coût-résultats ?",tags:[],x:false},
   {t:"Les ressources financières, humaines et techniques ont-elles été utilisées de manière efficiente ?",tags:[],x:false}]},
 {id:"imp",name:"Impact",qs:[
   {t:"Les émissions, réseaux sociaux et activités ont-ils transformé les perceptions, discours et pratiques : confiance envers les médias, participation, collaboration entre OSC ?",tags:["polar"],x:true},
   {t:"Quels changements qualitatifs dans la relation entre la population, les médias et les OSC ?",tags:["legit"],x:false},
   {t:"La collaboration OSC-URTEL-gouvernement s'est-elle améliorée pour l'accès à une information vérifiée et sensible aux conflits ?",tags:["polar"],x:true},
   {t:"(Proposée) Les attitudes envers l'usage de la violence ont-elles évolué, et différemment selon les groupes ?",tags:["violence"],x:false}]},
 {id:"dur",name:"Durabilité",qs:[
   {t:"Les mécanismes de collaboration, outils et partenariats vont-ils perdurer et produire des effets après le projet ?",tags:["invest"],x:true},
   {t:"Quelles perspectives de pérennité institutionnelle (forums OSC-Gouvernement) et de viabilité financière ?",tags:["invest","legit"],x:false},
   {t:"L'URTEL et les forums garantissent-ils une meilleure pérennité que le modèle initial ?",tags:["invest"],x:false},
   {t:"Les capacités renforcées (plaidoyer, fact-checking, animation de débats) sont-elles ancrées dans les pratiques des partenaires ?",tags:["agency"],x:true}]},
 {id:"eq",name:"Équité, inclusion, protection",qs:[
   {t:"Les dynamiques de genre et de jeunesse ont-elles été intégrées dans le choix des cibles et l'adaptation des activités ?",tags:["agency"],x:false},
   {t:"Quels mécanismes d'intersectionnalité ont permis d'atteindre les plus marginalisés (femmes rurales, jeunes déplacés) ?",tags:["polar"],x:false},
   {t:"Les participants se sont-ils sentis en sécurité, connaissent-ils les mécanismes de signalement, leur avis est-il pris en compte ?",tags:["violence","agency"],x:false},
   {t:"Comment la sensibilité aux conflits et l'intersectionnalité ont-elles été appliquées tout au long du cycle ?",tags:[],x:false}]}
];

export const IND =[
 {code:"Ind. 0.1 · Objectif général",t:"% d'acteurs médias et OSC estimant que la protection des défenseurs des droits et des journalistes s'est améliorée",b:33,c:50,dims:["violence","legit"]},
 {code:"Ind. 0.2 · Objectif général",t:"% de la population faisant confiance aux médias et aux OSC comme sources fiables sur l'espace civique",b:45,c:60,dims:["legit"],note:"Cible revue à la hausse en janvier 2026 ; complétée par un score de confiance envers les médias (Likert 1 à 5)."},
 {code:"Ind. 1 · OS1",t:"% de membres d'OSC indiquant une meilleure collaboration entre médias et OSC pour le plaidoyer",b:57,c:70,dims:["polar","invest"]},
 {code:"Ind. 2.1 · OS2",t:"% de la population pensant que ses opinions et intérêts sont pris en compte dans la décision publique",b:22,c:50,dims:["legit"],match:"≈ ODD 16.7.2",note:"Le plus gros écart à combler : +28 points."},
 {code:"Ind. 2.2 · OS2",t:"% de la population se sentant informée de ses droits et devoirs de citoyen",b:51,c:70,dims:["agency"]},
 {code:"Ind. 2.3 · OS2",t:"% d'auditeurs déclarant que les émissions sur la paix favorisent le dialogue constructif dans leur communauté",b:null,c:60,dims:["polar"],note:"Pas de valeur de base : la comparaison base/finale est impossible en l'état."},
 {code:"Matrice de définition",t:"% d'OSC estimant avoir la capacité de mener un plaidoyer constructif sur des questions sensibles",dims:["agency"]},
 {code:"Matrice de définition",t:"% d'acteurs médias et OSC dont la participation aux processus décisionnels sur l'espace civique s'est améliorée",dims:["agency","legit"]},
 {code:"Matrice · co-créé",t:"% d'acteurs de la société civile ayant participé à des dialogues inclusifs sur la gouvernance avec les autorités",dims:["polar","legit"]},
 {code:"Matrice · co-créé",t:"% d'acteurs médias et OSC ayant accès à des sources d'information diverses, sans restriction et à temps",dims:["legit"]},
 {code:"Matrice · co-créé",t:"% d'acteurs de la société civile déclarant que l'espace civique est diversifié",dims:["agency"]},
 {code:"Safeguarding",t:"% de participants se sentant en sécurité lors des activités",dims:["violence"],match:"Proche ODD 16.1.4"},
 {code:"Safeguarding",t:"% de participants connaissant les mécanismes de signalement",dims:["violence"]},
 {code:"Safeguarding",t:"% de participants estimant que leur voix est prise en compte dans le projet",dims:["agency"]},
 {code:"MEAL global Search",t:"% de la population qui mène des actions pour influencer les choses qui lui tiennent à cœur",dims:["agency"],match:"Mesure alignée PIF"},
 {code:"MEAL global Search",t:"% de la population satisfaite des services demandés aux autorités",dims:["legit"],match:"Mesure alignée PIF"},
 {code:"MEAL global Search",t:"Écart entre groupes : confiance dans l'information et dans les interactions, conviction que la violence est parfois nécessaire",dims:["polar","violence"],match:"≈ Indice SCORE"}
];

export const PILLARS =[
 {name:"Expérience vécue",sub:"Indicateurs locaux, redevabilité",
  intro:"Les personnes qui vivent le conflit savent ce que la sécurité et la paix signifient pour elles. Le Modèle de Redevabilité Ancrée Localement (GAM) leur permet de définir ces concepts tels qu'elles les perçoivent.",
  force:["Favorise la redevabilité envers les personnes affectées par les conflits","Encourage l'humilité et la remise en question des hypothèses","Reconnaît la dynamique propre des conflits dans leur contexte"],
  here:["12 FGD homogènes (femmes, jeunes, leaders), à Bamako, Mopti et Gao","Récits du Changement le Plus Significatif (MSC) auprès des participants","Indicateurs « co-créés » de la matrice, à reprendre avec les mots des communautés","Questions de safeguarding : la voix des participants est-elle prise en compte ?"]},
 {name:"Mesures alignées",sub:"Langage commun, suivi long terme",
  intro:"Dix indicateurs retenus après consultation dans plus de 90 pays, à suivre comme des signes vitaux de la paix pour raconter une histoire collective et comparer les résultats.",
  force:["Offre un langage commun pour comparer les résultats","Suit les mêmes données pour analyser le changement dans le temps","Permet des décisions et des priorités fondées sur les données"],
  here:["Enquête ménages représentative, comparable à la base (n = 384)","Enquête OSC et médias (80 + 40), mêmes formulations qu'à la base","3 indicateurs MEAL de Search déjà alignés sur le PIF","Tests de différence, tendances et intervalles de confiance base/finale"]},
 {name:"Observations d'experts",sub:"Changements inattendus, adaptation",
  intro:"Les praticiens observent leur contexte tous les jours. Leurs observations systématiques captent des changements progressifs et imprévus que les indicateurs classiques ratent.",
  force:["Tire parti de l'expertise concrète des praticiens","Permet l'adaptation en temps réel quand le contexte évolue vite","Capture des résultats inattendus en matière de paix et de conflit"],
  here:["KII avec l'URTEL, les radios, les autorités, les OSC et les experts (base : 33)","Récolte des résultats (Outcome Harvesting) pour remonter des changements vers la contribution du projet","Documentation exigée des effets inattendus, positifs ou négatifs","Analyse de l'adaptation de la théorie du changement (URTEL, forums)"]}
];

export const ORDER = ['violence', 'agency', 'polar', 'legit', 'invest'];
export const SEGCOL = { agency: '#64c2b0', polar: '#fbb960', legit: '#a157ab', invest: '#4d7fc5', violence: '#f8d27d' };
