<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    import { currentUser } from "../stores";
    import type { note, notes } from "../index";
    import User from "../lib/User";
    import Navbar from "../components/Navbar.svelte";
    import { strToNbr } from "../lib/strToNbr";
    import { addDays, startOfDay } from "../lib/date";
    import { averageCalculator, outOf20 } from "../lib/averageCalculator";
    import ChartAverage from "../components/ChartAverage.svelte";

    let info: notes;

    let moyenne = 0;

    let notes: Array<note> | undefined;

    $: notes;

    $: moyenne;
    $: info = {
        periodes: [
            {
                ensembleMatieres: {
                    disciplines: [],
                    moyenneGenerale: "?",
                },
            },
        ],
        notes: [],
    };

    function show(el: HTMLElement | null) {
        if (el) {
            el.classList.toggle("hidden");
        }
    }

    if ($currentUser) {
        onMount(() => {
            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );
            user.login().then(() => {
                user.getNotes(new Date()).then(function (res) {
                    if (res) {
                        info = res;

                        notes = res.notes;
                        const average: number = averageCalculator(notes);
                        moyenne = average;
                    }
                });
            });
        });
    }
</script>

<main>
    <Navbar />

    <div class="matiere">
        <div class="top">
            <p class="codeMatiere">
                {info?.periodes[0].ensembleMatieres ? "Moyenne Générale" : "?"}
            </p>
            <p>
                {info?.periodes[0].ensembleMatieres ? moyenne : ""}
            </p>
        </div>
    </div>
    {#each info?.periodes[0].ensembleMatieres.disciplines as matiere}
        <div class="matiere">
            <button
                class="top"
                on:click={() =>
                    show(
                        document.getElementById(
                            `${matiere.codeMatiere}${matiere.codeSousMatiere}List`
                        )
                    )}
            >
                <p class="codeMatiere">
                    {matiere.codeMatiere}
                    {matiere.codeSousMatiere}
                </p>
                <p>
                    {matiere.moyenne}
                </p>
            </button>
            <ul
                class="bottom hidden"
                id={`${matiere.codeMatiere}${matiere.codeSousMatiere}List`}
            >
                {#each info?.notes as note}
                    {#if matiere.codeMatiere == note.codeMatiere}
                        <li class="li">
                            {`${note.valeur}/${note.noteSur}`}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    {/each}
    {#if notes}
        <ChartAverage {notes} />
        {/if}
</main>

<style>
    /* .container {
        width: 100%;
        height: 40vh;
    } */
    .li::before {
        content: "\2022";
        color: var(--primary);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }
    .matiere {
        margin-bottom: 8px;
    }
    .top {
        all: unset;
        background-color: var(--secondary);
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 16px;
        width: 100%;
    }
    .top:hover {
        cursor: pointer;
    }
    .bottom {
        list-style: none;
        /* transition: transform .3s ease-out, position .3s ease-out; */
    }
    .hidden {
        position: absolute;
        transform: scaleY(0);
    }
</style>
