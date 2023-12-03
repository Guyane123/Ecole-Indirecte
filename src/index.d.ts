export type devoir = {
    matiere: string; // Nom d'affichage ("FRANCAIS" / "ENSEIGN.SCIENTIFIQUE")
    codeMatiere: string; // Code ("FRANC" / "G-SCI")
    aFaire: any; // ?
    idDevoir: number;
    documentsAFaire: booleanean; // ?
    donneLe: string;
    effectue: booleanean; // Si marqué par l'élève comme tel ?
    interrogation: booleanean;
    rendreEnLigne: booleanean; // Si présence d'un formulaire pour rendre un fichier ?
};

interface devoirWithInfo extends devoir {
    id: number;
    nomProf: string;
    aFaire: {
        contenu: string; // Détail du travail à faire
        rendreEnLigne: boolean;
        donneLe: string;
        effectue: boolean;
        ressource: string; // ?, vide jusqu'ici
        ressourceDocuments: []; // ?, vide jusqu'ici
        documents: Array<{
            // Pièces jointes
            id: number; // Pour la télécharger via la route de téléchargement
            libelle: string; // Nom
            date: string;
            taille: number; // En octets
            type: "FICHIER_CDT"; // Autres valeurs ?
            signatureDemandee: boolean; // ?
            signature: {}; // ?
        }>;
        commentaires: Array<{
            id: number; // identifiant du commentaire
            idAuteur: number; // identifiant de l'auteur
            profilAuteur: "E"; // E = Elève, autres valeurs ?
            auteur: string; // Nom de l'auteur
            date: string;
            message: string; // Encodé en base64
            supprime: boolean; // Si le commentaire a été supprimé ? (semble stupide)
        }>;
        elementsProg: []; // ?
        liensManuel: []; // URL des manuels associés à la matière ?
        documentsRendus: []; // Fichiers rendus lorsque le formulaire est présent ?
        contenuDeSeance: {
            contenu: string;
            documents: [];
            commentaires: [];
        };
    };
    contenuDeSeance: {
        idDevoir: number; // Systématiquement le même identifiant que id plus haut
        contenu: string;
        documents: []; // Pièces jointes ?
        commentaires: []; // Même structure que commentaires sur travail à faire ?
        elementsProg: [];
        liensManuel: [];
    };
}

export type user = {
    idLogin: number; //int | Paramètre de cookie pour savoir si l'utilisateur est connecté via login/password
    id: number; //int | Numéro de compte
    uid: number; //string | Il ne sert à rien lui aussi
    identifiant: string; //string | Username du compte
    typeCompte: string; //string | Voir Type de compte dans la référence
    codeOgec: string; //string | Code RNE de l'établissement scolaire du compte
    main: booleanean; //booleanean | Indique si ce compte est le compte principal de la famille(il peut en avoir plusieur comme avec un parent)
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
    dicoEnLigneLeRobert: booleanean;
    socketToken: string; //string | Websocket, à priori il n'est pas prit en compte concernant l'authentification (si on le change on ne sera pas déconnecté)
    modules: [];
    parametresIndividuels: {
        lsuPoilDansLaMainBorne1: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne2: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne3: number; // int | Paramètre parcoursup
        modeCalculLSU: string; // ??? | Paramètre de recommandation parcoursup
        isQrcode: boolean; // ???
        accessibilitéVisuelle: booleanean; // booleanean | Pour les personnes malvoyantes, une police spéciale est mise en place
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
        changementdeMDP: booleanean;
    };
};

export type matiere = {
    id: number; //int | Semble être un identifiant unique du cours
    text: string; //string | Nom du cours (peut diférer de la matière)
    matiere: string;
    codeMatiere: string; //string | Code matière interne au service ED
    typeCours: string; //string | Semble varier (COURS / PERMANENCE)
    start_date: string;
    end_date: Date;
    color: string; //string | Couleur hex du cours sur l'edt
    dispensable: booleanean; //string | Si l'élève doit se rendre en cours
    dispense: string; //int | Rhalala, le sport (:
    prof: string;
    salle: string;
    classe: string; //string | vide si est dispensé dans plusieures classes
    classeId: number; //int | ID de la classe dans laquelle le cours est dispensé (0 si est dispensé dans plusieures classes)
    classeCode: string; //int | Code de la classe (je pense qu'on a compris avec le temps que c'était vide si la cours était dispensé dans plusieures classes)
    groupe: string; //string | Nom du groupe (si dispensé dans plusieures classes)
    groupeCode: string; //string | Code du groupe
    isFlexible: booleanean; //booleanean | ???
    groupeId: number; //int | ID du groupe
    icone: string; //string | Depuis quand on peut avoir des icones ?
    isModifie: booleanean; //booleanean | ???
    contenuDeSeance: booleanean; //booleanean | booleanean même si du contenu est posté
    devoirAFaire: booleanean; //booleanean | booleanean même si un devoir est posté
    isAnnule: booleanean; //booleanean | Si le cours est annulé (franglais dégeu)
};

export type note = {
    id: number; // Identifiant de la note j'imagine
    devoir: string; // Nom du contrôle
    codePeriode: "A001" | "A002" | "A003";
    codeMatiere: string; // Nom abbrégé
    libelleMatiere: string; // Nom de la matière
    codeSousMatiere: string;
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
};

export type notes = {
    foStat: string; // Une sorte d'identifiant bizarre
    periodes: Array<{
        idPeriode: "A001" | "A002" | "A003" | "A999Z";
        codePeriode: "A001" | "A002" | "A003" | "A999Z";
        periode:
            | "1er Trimestre"
            | "2ème Trimestre"
            | "3ème Trimestre"
            | "Année";
        annuel: booleanean; // booleanean pour A001..A003, booleanean pour A999Z
        dateDebut: string;
        dateFin: string;
        examenBlanc: booleanean;
        cloture: booleanean; // booleanean si la période est terminée, sinon booleanean (cloturée)
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
            nomCE: string; // ?
            decisionDuConseil: string; // Probablement une fonctionnalité de bulletin en ligne
            disciplines: Array<{
                id: number;
                codeMatiere: string;
                codeSousMatiere: string;
                discipline: string; // = matière
                moyenne: string;
                moyenneClasse: string;
                moyenneMin: string;
                moyenneMax: string;
                coef: 1;
                effectif: number; // Nombre de notes dans la moyenne ?
                rang: number; // Rang de l'élève dans la classe ?
                groupeMatiere: booleanean;
                idGroupeMatiere: 0;
                option: 0;
                sousMatiere: booleanean;
                saisieAppreciationSSMAT: booleanean;
                professeurs: Array<{ id: number; nom: string }>;
            }>;
            disciplinesSimulation: [];
        };
    }>;
    notes: Array<note>;
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
        affichageMoyenne: booleanean;
        affichageMoyenneDevoir: booleanean;
        affichagePositionMatiere: booleanean;
        affichageNote: booleanean;
        affichageCompetence: booleanean;
        affichageEvaluationsComposantes: booleanean;
        affichageGraphiquesComposantes: booleanean;
        modeCalculGraphiquesComposantes: "eval";
        affichageCompNum: booleanean;
        libelleEvalCompNum1: "Tm9uIGF0dGVpbnQ="; // Non atteint
        libelleEvalCompNum2: "UGFydGllbGxlbWVudCBhdHRlaW50"; // Partiellement atteint
        libelleEvalCompNum3: "QXR0ZWludA=="; // Atteint
        affichageAppreciation: booleanean;
        appreciationsProf: booleanean;
        appreciationProfPrinc: booleanean;
        affichageMention: booleanean;
        affichageAppreciationCE: booleanean;
        affichageAppreciationVS: booleanean;
        affichageAppreciationCN: booleanean;
        affichageAppreciationClasse: booleanean;
        affichageAppreciationPeriodeCloturee: booleanean;
        moyenneUniquementPeriodeCloture: booleanean;
        moyennePeriodeReleve: booleanean;
        moyennePeriodeAnnuelle: booleanean;
        moyennePeriodeHorsP: booleanean;
        moyenneEleveDansNotes: booleanean;
        moyenneEleve: booleanean;
        moyenneEleveDansMoyenne: booleanean;
        moyenneGenerale: booleanean;
        moyenneCoefMatiere: booleanean;
        moyenneClasse: booleanean;
        moyenneMin: booleanean;
        moyenneMax: booleanean;
        moyenneRang: booleanean;
        moyenneSur: 20;
        moyenneGraphique: booleanean;
        moyennesSimulation: booleanean;
        coefficientNote: booleanean;
        colonneCoefficientMatiere: booleanean;
        noteGrasSousMoyenne: booleanean;
        noteGrasAudessusMoyenne: booleanean;
        libelleDevoir: booleanean;
        dateDevoir: booleanean;
        typeDevoir: booleanean;
        noteUniquementPeriodeCloture: booleanean;
        notePeriodeReleve: booleanean;
        notePeriodeAnnuelle: booleanean;
        notePeriodeHorsP: booleanean;
        libellesAppreciations: Array<"Appréciation générale">;
        appreciationsParametrage: Array<{
            code: string;
            id: 1;
            nbMaxCaractere: 400;
            libelle: "Appréciation générale";
        }>;
    };
};

export type messages = {
    classeurs: [];
    messages: {
        received: Array<message>;
        draft: [];
        archived: [];
    };
    parametrage: {
        isActif: boolean;
        canParentsLireMessagesEnfants: boolean;
        destAdmin: boolean;
        destEleve: boolean;
        destFamille: boolean;
        destProf: boolean;
        destEspTravail: boolean;
        disabledNotification: boolean;
        notificationEmailEtablissement: boolean;
        choixMailNotification: number;
        autreMailNotification: string;
        mailPro: string;
        mailPerso: string;
        messagerieApiVersion: "v3";
        blackListProfActive: boolean;
        estEnBlackList: boolean;
        afficherToutesLesClasses: boolean;
    };
    pagination: {
        messagesRecusCount: number;
        messagesEnvoyesCount: number;
        messagesArchivesCount: number;
        messagesRecusNotReadCount: number;
        messagesDraftCount: number;
    };
};

export type message = {
    id: string;
    responseId: number;
    forwardId: number;
    mtype: "received" | "sent";
    read: boolean;
    idDossier: number;
    idClasseur: number;
    transferred: boolean;
    answered: boolean;
    to_cc_cci: "cci";
    brouillon: boolean;
    canAnswer: boolean;
    subject: string;
    content: string;
    date: string;
    to: [];
    files: [
        {
            id: number;
            libelle: number;
            date: number;
            type: number;
            signatureDemandee: boolean;
            signature: {};
        }
    ];
    from: {
        name: string;
        nom: string;
        prenom: string;
        particule: string;
        civilite: string;
        role: string;
        listeRouge: boolean;
        id: number;
        read: boolean;
        fonctionPersonnel: string;
    };
};


type senders = {
    name: string;
    id: string;
    messages: Array<{
        content: string;
        createdAt: Date;
        id: string;
        isReaded: boolean;
    }>;
};