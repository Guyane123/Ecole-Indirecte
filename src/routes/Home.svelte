<script lang="ts">


    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "../lib/User";
    import Navbar from "../lib/Navbar.svelte"
    import compliments from "../assets/compliments.json"
    import { redirectTo } from "../lib/redirect";
    import Prochaincour from "../lib/prochaincour.svelte";
    if (!$currentUser) {
        redirectTo("/")
    }

    let barecode: SVGSVGElement;

    let petitmessagegentil = ""

    const rdm = Math.round(Math.random() * 100) % compliments.length

    petitmessagegentil = compliments[rdm]

    onMount(() => {
        $currentUser?.mainAccount?.profile.sexe == "F"
        
    });



    
</script>

<main>

    <Navbar />
    <h1 class="h1">
        <span>Salut !</span><br> {$currentUser?.mainAccount?.prenom}
        {$currentUser?.mainAccount?.nom}
    </h1>
    <h2 class="h2">
        {petitmessagegentil}
    </h2>

    <Prochaincour />


</main>

<style>
    #codebar {
        height: 50vh;
    }
    .h2 {
        animation-name: fromleft;
        animation-timing-function: ease-out;
        animation-delay: .3s;
        animation-duration: .3s;
        animation-fill-mode: forwards;
        opacity: 0%;
        color: black;
        font-weight: normal;
        margin-bottom: 98px;
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
        animation-duration: .3s;
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

    @keyframes fromleft{
        from {
            transform: translate(-50%);
        }to {
            transform: translateX(0%);
            opacity: 1;
        }
    }
</style>
