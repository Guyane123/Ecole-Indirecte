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
    main: boolean; //bool | Indique si ce compte est le compte principal de la famille(il peut en avoir plusieur comme avec un parent)
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
        accessibilitéVisuelle: boolean; // bool | Pour les personnes malvoyantes, une police spéciale est mise en place
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
    isFlexible: boolean; //bool | ???
    groupeId: number; //int | ID du groupe
    icone: string; //string | Depuis quand on peut avoir des icones ?
    isModifie: boolean; //bool | ???
    contenuDeSeance: boolean; //bool | false même si du contenu est posté
    devoirAFaire: boolean; //bool | false même si un devoir est posté
    isAnnule: boolean; //bool | Si le cours est annulé (franglais dégeu)
};
