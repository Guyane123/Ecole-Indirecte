import axios from "axios";
import type { devoir, loginUser, matiere, note, user } from "../index";

const username = encodeURIComponent("Damien Claret");
const password = encodeURIComponent("Briule@42");

const ED = "https://api.ecoledirecte.com/";
const login = "v3/login.awp";
const useragent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export default class User {
    identifiant: string;
    motdepasse: string;
    mainAccount: user | undefined;
    XToken: string;
    homeworks: Array<devoir> | undefined;

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

        // console.log(this.mainAccount)
    }

    async getHomework(date: Date) {
        if (!this.mainAccount) {
            return;
        }

        let i: number = 0;
        let res;
        let homework: {
            [key: string]: Array<devoir>;
        };
        do {
            const formattedDate = formatDate(addDays(date, i));

            const cahierdetexte = `v3/Eleves/${this.mainAccount.id}/cahierdetexte.awp?verbe=get&v=4.45.0`;

            const body = {
                dateDebut: formattedDate,
                dateFin: formattedDate,
                avecTrous: false,
            };

            res = await this.request(cahierdetexte, body);
            i++;

            homework = res.data;
        } while (!!!res.data);

        return homework;
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

            const body = {
                dateDebut: formattedStartDate,
                dateFin: formattedStopDate,
                avecTrous: false,
            };

            res = await this.request(cahierdetexte, body);
            i++;

            schedule = res.data;
        } while (!!!res.data[0]);

        return schedule.sort(
            (a, b) =>
                new Date(a.start_date).getTime() -
                new Date(b.start_date).getTime()
        );
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
