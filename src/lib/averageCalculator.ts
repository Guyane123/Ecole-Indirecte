import type { note } from "../index";
import { strToNbr } from "./strToNbr";

export function averageCalculator(ns: Array<note>) {
    let average: number = 0;
    let coef: number = 0;
    ns.forEach((n) => {
        const nCoef = strToNbr(n.coef);
        const nValeur = strToNbr(n.valeur);
        const nSur = strToNbr(n.noteSur);

        // console.log(nCoef)
        // console.log(nValeur)
        // console.log(nSur)

        if (n.nonSignificatif == false && nSur && nValeur && nCoef) {
            average += outOf20(n.coef, n.valeur, n.noteSur)!;
            coef += nCoef;

            console.log("yes");
        }
    });

    const moyenne = Math.round((average / coef) * 100) / 100;

    return moyenne;
}

export function outOf20(coef: string, valeur: string, sur: string) {
    const nCoef = strToNbr(coef);
    const nValeur = strToNbr(valeur);
    const nSur = strToNbr(sur);

    if (nSur && nValeur && nSur && nCoef) {
        return ((nValeur * 20) / nSur) * nCoef;
    }
}
