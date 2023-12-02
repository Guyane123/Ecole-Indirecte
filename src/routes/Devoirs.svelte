<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import type { devoir, devoirWithInfo } from "../index";
    import User from "../lib/User";
    import Navbar from "../components/Navbar.svelte";
    import { link } from "svelte-spa-router";
    // import { base64Decode } from "../lib/base64";

    const d = ["", []];

    let devoirs = $currentUser?.homeworks;

    if (devoirs) {
        devoirs = devoirs
            ? (Object.entries(devoirs) as (
                  | string
                  | (devoir | devoirWithInfo | unknown)[]
              )[])
            : [];
    }

    $: devoirs;

    console.log(devoirs);

    if ($currentUser && !devoirs) {
        onMount(() => {
            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );

            user.getHomework(undefined).then((res) => {
                if (res) {
                    console.log(devoirs);
                }
            });
        });
    }
</script>

<main>
    <Navbar />

    {#if devoirs}
        {#each devoirs as t}
            <div>
                {t[0]}

                {#if Array.isArray(t[1])}
                    {#each t[1] as d}
                        <a href={`/devoir/${d.idDevoir}/${t[0]}`} use:link class="devoir">
                            <p class="matiere p">{d.matiere}</p>
                            <p class="interrogation p">
                                {d.interrogation ? "Contrôle" : ""}
                            </p>
                            <!-- <p class="date p">
                    Donné le {new Date(d.aFaire.donneLe).toLocaleDateString(
                        "fr",
                        { weekday: "long", day: "2-digit", month: "long" }
                    )}
                </p> -->
                        </a>
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}

    <!-- {#each devoirs as temps}
        {temps}
        <a href={`/devoir/${d.id}`} use:link class="devoir">
            <p class="matiere p">{d.}</p>
            <p class="interrogation p">
                {d.interrogation ? "Contrôle" : ""}
            </p>
            <p class="date p">
                Donné le {new Date(devoir.aFaire.donneLe).toLocaleDateString(
                    "fr",
                    { weekday: "long", day: "2-digit", month: "long" }
                )}
            </p>
        </a>
    {/each} -->
</main>

<style>
    .p {
        all: unset;
    }

    .interrogation {
        color: var(--primary);
    }
    .devoir {
        padding: 16px;
        background-color: var(--secondary);
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 16px;
    }
</style>
