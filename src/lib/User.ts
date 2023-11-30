import axios from "axios";
import type {
    devoir,
    devoirWithInfo,
    loginUser,
    matiere,
    note,
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
    homeworks: undefined | Array<string | Array<devoir | devoirWithInfo | unknown>>;

    constructor(id: string, mdp: string) {
        (this.identifiant = id),
            (this.motdepasse = mdp),
            (this.XToken = ""),
            (this.homeworks = undefined);
        // this.login()
    }

    async request(url: string, args?: any) {
        console.log("fetch");
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

        // console.log(this.mainAccount)
    }

    async getNextHomework(date: Date) {
        let i: number = 0;
        let res;
        let nextDate = date;
        let homework: {
            [key: string]: Array<devoirWithInfo>;
        };

        do {
            res = await this.getHomework(date);
            console.log(res.data);
            nextDate = addDays(nextDate, 1);
        } while (!res);

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

    async getSchedule(startDate: Date, stopDate: Date) {
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

            console.log(formattedStartDate);
            console.log(formattedStopDate);

            const body = {
                dateDebut: formattedStartDate,
                dateFin: formattedStopDate,
                avecTrous: false,
            };

            res = await this.request(cahierdetexte, body);
            i++;
            console.log(res.data);
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

        let notes: note = res.data;

        return notes;
    }

    getUserInfo() {
        return this.mainAccount;
    }
}
