import axios from "axios";
import type {
    devoir,
    devoirWithInfo,
    loginUser,
    matiere,
    notes,
    user,
} from "../index";
import { addDays, formatDate } from "./date";

const username = encodeURIComponent("Damien Claret");
const password = encodeURIComponent("Briule@42");

const ED = "https://api.ecoledirecte.com/";
const login = "v3/login.awp";
const useragent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";

export default class User {
    identifiant: string;
    motdepasse: string;
    mainAccount: user | undefined;
    XToken: string;
    homeworks:
        | undefined
        | Array<string | Array<devoir | devoirWithInfo | unknown>>;

    constructor(id: string, mdp: string) {
        (this.identifiant = id),
            (this.motdepasse = mdp),
            (this.XToken = ""),
            (this.homeworks = undefined);
        // this.login()
    }

    async request(url: string, args?: any) {
        try {
            const response = await axios.post(
                ED + url,
                `data=${JSON.stringify({
                    ...args,
                    token: this.XToken,
                })}`,
                {
                    headers: {
                        "X-token": this.XToken,
                        // "user-agent": useragent,
                    },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async login() {
        if (!this.identifiant || !this.motdepasse) {
            throw new Error("Pas de mdp ou d'identifiant.");
        }
        const body = {
            identifiant: this.identifiant,
            motdepasse: this.motdepasse,
        };

        const res = await this.request("v3/login.awp?verbe=get&", body);

        this.XToken = await res.token;

        this.mainAccount = res.data.accounts[0];
        this.homeworks = await this.getHomework(undefined);
    }

    async getNextHomework(date: Date) {
        let res;
        let nextDate = date;

        do {
            res = await this.getHomework(nextDate);
            nextDate = addDays(nextDate, 1);
        } while (res.matieres.length == 0);

        return await res;
    }
    async getHomework(date: Date | undefined) {
        if (!this.mainAccount) {
            return;
        }

        const formattedDate = date ? formatDate(date) : "";

        const cahierdetexte = `v3/Eleves/${this.mainAccount.id}/cahierdetexte${
            date ? `/${formattedDate}` : ""
        }.awp?verbe=get&`;

        const res = await this.request(cahierdetexte);

        return await res.data;
    }

    async getSchedule(startDate: Date, stopDate: Date, mode: "+" | "-" = "+") {
        if (!this.mainAccount) {
            return;
        }
        const cahierdetexte = `/v3/E/${this.mainAccount.id}/emploidutemps.awp?verbe=get&`;

        let res;
        let i: number = 0;
        let schedule: Array<matiere>;

        do {
            const formattedStartDate = formatDate(addDays(startDate, i));
            const formattedStopDate = formatDate(addDays(startDate, i));

            const body = {
                dateDebut: formattedStartDate,
                dateFin: formattedStopDate,
                avecTrous: false,
            };

            res = await this.request(cahierdetexte, body);
            if (mode == "+") {
                i++;
            } else {
                i--;
            }
            schedule = res.data.sort(
                (a: matiere, b: matiere) =>
                    new Date(a.start_date).getTime() -
                    new Date(b.start_date).getTime()
            );
        } while (!schedule[0]);

        return schedule;
    }
    async getNotes(anneeScolaire: Date) {
        if (!this.mainAccount) {
            return;
        }

        const body = {
            anneeScolaire: ``,
        };

        const notesPath = `/v3/eleves/${this.mainAccount.id}/notes.awp?verbe=get&`;

        const res = await this.request(notesPath, body);

        let notes: notes = res.data;

        return notes;
    }

    async getMessages() {
        if (!this.mainAccount) {
            return;
        }
        const messagesPath = `/v3/eleves/${this.mainAccount.id}/messages.awp?force=false&typeRecuperation=received&idClasseur=0&orderBy=date&order=desc&query=&onlyRead=&page=0&itemsPerPage=100&getAll=0&verbe=get&v=4.46.0`;

        const res = await this.request(messagesPath);

        console.log(res);
        return res.data;
    }

    async getMessage(id: string) {
        if (!this.mainAccount) {
            return;
        }
        const messagesPath = `/v3/eleves/${this.mainAccount.id}/messages/${id}.awp?verbe=get&mode=destinataire&v=4.46.0`;

        const res = await this.request(messagesPath);

        return res.data;
    }

    getUserInfo() {
        return this.mainAccount;
    }
}
