<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "../lib/User";
    import Navbar from "../components/Navbar.svelte";
    import compliments from "../assets/compliments.json";
    import { redirectTo } from "../lib/redirect";
    import Prochaincour from "../components/prochaincour.svelte";
    import Prochaindevoirs from "../components/prochaindevoirs.svelte";
    import type { devoir } from "..";

    if (!$currentUser) {
        redirectTo("/");
    }

    let devoirs: Array<devoir>;
    $: devoirs = [];


    let schedulUser: User | undefined = undefined;
    $: schedulUser;


    if ($currentUser) {
        onMount(() => {
            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );

            user.login().then(() => {
                user?.getNextHomework(new Date()).then((res) => {
                    if (res) {
                        devoirs = res.matieres;
                    }
                });
                schedulUser = user
            });
        });
    }

    const petitmessagegentil =
        compliments[Math.round(Math.random() * 100) % compliments.length];
</script>

<main>
    <Navbar />
    <h1 class="h1">
        <span>Salut !</span><br />
        {$currentUser?.mainAccount?.prenom}
        {$currentUser?.mainAccount?.nom}
    </h1>
    <h2 class="h2">
        {petitmessagegentil}
    </h2>

    <p>Tu as {devoirs?.length ? devoirs.length : "?"} devoir(s) à faire.</p>

    {#if schedulUser}
        <Prochaincour user={schedulUser}/>
    {/if}

</main>

<style>
    #codebar {
        height: 50vh;
    }
    .h2 {
        animation-name: fromleft;
        animation-timing-function: ease-out;
        animation-delay: 0.3s;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        opacity: 0%;
        font-weight: normal;
    }
    .div {
        display: flex;
        justify-content: center;
    }
    .h1 {
        background: linear-gradient(120deg, var(--primary), var(--accent));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 3em;
        animation-name: fromleft;
        animation-timing-function: ease-out;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
    }
    .nomEtablissement {
        font-size: 30px;
        font-weight: 400;
    }
    .etablissement {
        margin-top: 64px;
        display: flex;
        justify-content: space-around;
    }
    .barecode {
        left: 50%;
        transform: translateX(-50%);
    }

    @keyframes fromleft {
        from {
            transform: translate(-50%);
        }
        to {
            transform: translateX(0%);
            opacity: 1;
        }
    }
</style>
