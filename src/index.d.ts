export type devoir = {
    matiere: string; // Nom d'affichage ("FRANCAIS" / "ENSEIGN.SCIENTIFIQUE")
    codeMatiere: string; // Code ("FRANC" / "G-SCI")
    aFaire: boolean; // ?
    idDevoir: number;
    documentsAFaire: boolean; // ?
    donneLe: string;
    effectue: boolean; // Si marqué par l'élève comme tel ?
    interrogation: boolean;
    rendreEnLigne: boolean; // Si présence d'un formulaire pour rendre un fichier ?
};

export type user = {
    idLogin: number; //int | Paramètre de cookie pour savoir si l'utilisateur est connecté via login/password
    id: number; //int | Numéro de compte
    uid: number; //string | Il ne sert à rien lui aussi
    identifiant: string; //string | Username du compte
    typeCompte: string; //string | Voir Type de compte dans la référence
    codeOgec: string; //string | Code RNE de l'établissement scolaire du compte
    main: boolean; //boolean | Indique si ce compte est le compte principal de la famille(il peut en avoir plusieur comme avec un parent)
    lastConnexion: Date; //string | Date de dernière connexion à l'api via l'endpoint login (multiples connexions possibles)
    civilite: string;
    prenom: string;
    particule: string;
    nom: string;
    email: string;
    anneeScolaireCourante: string;
    nomEtablissement: string;
    logoEtablissement: string;
    couleurAgendaEtablissement: string;
    dicoEnLigneLeRobert: boolean;
    socketToken: string; //string | Websocket, à priori il n'est pas prit en compte concernant l'authentification (si on le change on ne sera pas déconnecté)
    modules: [];
    parametresIndividuels: {
        lsuPoilDansLaMainBorne1: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne2: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne3: number; // int | Paramètre parcoursup
        modeCalculLSU: string; // ??? | Paramètre de recommandation parcoursup
        isQrcode: boolean; // ???
        accessibilitéVisuelle: boolean; // boolean | Pour les personnes malvoyantes, une police spéciale est mise en place
        typeSaisieNotesDefaut: string;
        nbJoursMaxRenduDevoirCDT: string;
        typeViewCDTDefaut: string;
    };
    profile: {
        sexe: string;
        infoEDT: string;
        nomEtablissement: string;
        idEtablissement: number;
        rneEtablissement: number;
        telPortable: number;
        idReelEtab: number;
        photo: string; //doc1.ecoledirecte.com/PhotoEleves/x/y.jpg,
        classe: {
            id: number;
            code: string;
            libelle: string;
            estNote: number;
        };
    };
};

export type loginUser = {
    code: number;
    token: string;
    mesaage: string;

    data: {
        accounts: Array<user>;
        changementdeMDP: boolean;
    };
};

export type matiere = {
    id: 46234; //int | Semble être un identifiant unique du cours
    text: string; //string | Nom du cours (peut diférer de la matière)
    matiere: string;
    codeMatiere: string; //string | Code matière interne au service ED
    typeCours: string; //string | Semble varier (COURS / PERMANENCE)
    start_date: Date;
    end_date: Date;
    color: string; //string | Couleur hex du cours sur l'edt
    dispensable: boolean; //string | Si l'élève doit se rendre en cours
    dispense: string; //int | Rhalala, le sport (:
    prof: string;
    salle: string;
    classe: string; //string | vide si est dispensé dans plusieures classes
    classeId: number; //int | ID de la classe dans laquelle le cours est dispensé (0 si est dispensé dans plusieures classes)
    classeCode: string; //int | Code de la classe (je pense qu'on a compris avec le temps que c'était vide si la cours était dispensé dans plusieures classes)
    groupe: string; //string | Nom du groupe (si dispensé dans plusieures classes)
    groupeCode: string; //string | Code du groupe
    isFlexible: boolean; //boolean | ???
    groupeId: number; //int | ID du groupe
    icone: string; //string | Depuis quand on peut avoir des icones ?
    isModifie: boolean; //boolean | ???
    contenuDeSeance: boolean; //boolean | boolean même si du contenu est posté
    devoirAFaire: boolean; //boolean | boolean même si un devoir est posté
    isAnnule: boolean; //boolean | Si le cours est annulé (franglais dégeu)
};

type note = {
    foStat: string; // Une sorte d'identifiant bizarre
    periodes: Array<{
        idPeriode: "A001" | "A002" | "A003" | "A999Z";
        codePeriode: "A001" | "A002" | "A003" | "A999Z";
        periode:
            | "1er Trimestre"
            | "2ème Trimestre"
            | "3ème Trimestre"
            | "Année";
        annuel: boolean; // boolean pour A001..A003, boolean pour A999Z
        dateDebut: string;
        dateFin: string;
        examenBlanc: boolean;
        cloture: boolean; // boolean si la période est terminée, sinon boolean (cloturée)
        dateConseil?: string; // Présent pour les trimestres
        heureConseil?: "HH:MM";
        heureFinConseil?: "HH:MM";
        moyNbreJoursApresConseil: 0; // moyenne du nombre de jours après le conseil, mais quels jours ?
        ensembleMatieres: {
            dateCalcul: string;
            moyenneGenerale: string; // C'est-à-dire une chaîne de caractère qui contient un nombre à virgule
            moyenneClasse: string;
            moyenneMin: string;
            moyenneMax: string;
            nomPP: string; // Prof principal
            nomCE: ""; // ?
            decisionDuConseil: ""; // Probablement une fonctionnalité de bulletin en ligne
            disciplines: Array<{
                id: number;
                codeMatiere: string;
                codeSousMatiere: "";
                discipline: string; // = matière
                moyenne: string;
                moyenneClasse: string;
                moyenneMin: string;
                moyenneMax: string;
                coef: 1;
                effectif: number; // Nombre de notes dans la moyenne ?
                rang: number; // Rang de l'élève dans la classe ?
                groupeMatiere: boolean;
                idGroupeMatiere: 0;
                option: 0;
                sousMatiere: boolean;
                saisieAppreciationSSMAT: boolean;
                professeurs: Array<{ id: number; nom: string }>;
            }>;
            disciplinesSimulation: [];
        };
    }>;
    notes: Array<{
        id: number; // Identifiant de la note j'imagine
        devoir: string; // Nom du contrôle
        codePeriode: "A001" | "A002" | "A003";
        codeMatiere: string; // Nom abbrégé
        libelleMatiere: string; // Nom de la matière
        codeSousMatiere: "";
        typeDevoir:
            | "CONTROLE"
            | "INTERROGATION ORALE"
            | "TRAVAUX PRATIQUES"
            | "DEVOIR SUR TABLE"
            | "INTERROGATION ECRITE"
            | "EXERCICE"
            | "ENSEIGNEMENTS PRATIQUES DISCIPLINAIRES"
            | "DEVOIR MAISON"; // Probablement pas renseigné par le professeur donc liste probablement fixe
        enLettre: boolean;
        commentaire: string; // Probablement un truc écrit par le prof
        uncSujet: string; // UNC = chemin de fichier, probablement un lien vers le fichier sujet / corrigé
        uncCorrige: string;
        coef: string;
        noteSur: string;
        valeur: string; // Note, enfin
        nonSignificatif: boolean;
        date: string; // Date du contrôle
        dateSaisie: string; // Date de l'ajout de la note, souvent les deux sont égaux (mais pas trjs)
        valeurisee: boolean; // ?
        moyenneClasse: string;
        minClasse: string;
        maxClasse: string;
        elementsProgramme: []; // Liste de compétences ou qqch du genre j'imagine
    }>;
    parametrage: {
        // Différents paramètres d'affichage, de ce qui s'affiche ou non
        couleurEval1: string; // Couleurs des compétences
        couleurEval2: string;
        couleurEval3: string;
        couleurEval4: string;
        libelleEval1: string; // Non atteints (base64)
        libelleEval2: string; // Partiellement atteints
        libelleEval3: string; // Atteints
        libelleEval4: string; // Dépassés
        affichageMoyenne: boolean;
        affichageMoyenneDevoir: boolean;
        affichagePositionMatiere: boolean;
        affichageNote: boolean;
        affichageCompetence: boolean;
        affichageEvaluationsComposantes: boolean;
        affichageGraphiquesComposantes: boolean;
        modeCalculGraphiquesComposantes: "eval";
        affichageCompNum: boolean;
        libelleEvalCompNum1: "Tm9uIGF0dGVpbnQ="; // Non atteint
        libelleEvalCompNum2: "UGFydGllbGxlbWVudCBhdHRlaW50"; // Partiellement atteint
        libelleEvalCompNum3: "QXR0ZWludA=="; // Atteint
        affichageAppreciation: boolean;
        appreciationsProf: boolean;
        appreciationProfPrinc: boolean;
        affichageMention: boolean;
        affichageAppreciationCE: boolean;
        affichageAppreciationVS: boolean;
        affichageAppreciationCN: boolean;
        affichageAppreciationClasse: boolean;
        affichageAppreciationPeriodeCloturee: boolean;
        moyenneUniquementPeriodeCloture: boolean;
        moyennePeriodeReleve: boolean;
        moyennePeriodeAnnuelle: boolean;
        moyennePeriodeHorsP: boolean;
        moyenneEleveDansNotes: boolean;
        moyenneEleve: boolean;
        moyenneEleveDansMoyenne: boolean;
        moyenneGenerale: boolean;
        moyenneCoefMatiere: boolean;
        moyenneClasse: boolean;
        moyenneMin: boolean;
        moyenneMax: boolean;
        moyenneRang: boolean;
        moyenneSur: 20;
        moyenneGraphique: boolean;
        moyennesSimulation: boolean;
        coefficientNote: boolean;
        colonneCoefficientMatiere: boolean;
        noteGrasSousMoyenne: boolean;
        noteGrasAudessusMoyenne: boolean;
        libelleDevoir: boolean;
        dateDevoir: boolean;
        typeDevoir: boolean;
        noteUniquementPeriodeCloture: boolean;
        notePeriodeReleve: boolean;
        notePeriodeAnnuelle: boolean;
        notePeriodeHorsP: boolean;
        libellesAppreciations: Array<"Appréciation générale">;
        appreciationsParametrage: Array<{
            code: string;
            id: 1;
            nbMaxCaractere: 400;
            libelle: "Appréciation générale";
        }>;
    };
};
