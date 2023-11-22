import axios from "axios";
import type { devoir, loginUser, user } from '../index';

const username = encodeURIComponent("Damien Claret");
const password = encodeURIComponent("Briule@42");

const ED = "https://api.ecoledirecte.com/";
const login = "v3/login.awp";
const useragent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";

async function EDFetch(url: string, body?: {}, token: string = "") {
    const res = await fetch(ED + url, {
        headers: {
            "user-agent": useragent,
            // "X-token": token
        },
        method: "POST",
        body: `data=${JSON.stringify(body)}`,
    });

    return res;
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

    async request(url: string, args?: any, date?: string) {
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
                        "user-agent": useragent,
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

        this.XToken = await res.token

        this.mainAccount = res.data.accounts[0]

        // console.log(this.mainAccount)

    }

    async getHomework(date: Date) {
        if (!this.mainAccount) {
            return;
        }

        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`



        const cahierdetexte = `v3/Eleves/${this.mainAccount.id}/cahierdetexte/${formattedDate}.awp?verbe=get&`;

        const res = await this.request(cahierdetexte, date);

        let homework: Array<devoir> = res.data

        return homework
    }

    getUserInfo() {

        return this.mainAccount
    }
}
