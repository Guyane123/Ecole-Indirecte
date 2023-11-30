<script lang="ts">
    import { currentUser } from "../stores";
    import { onMount } from "svelte";
    import { clickOutside } from "./clickOutside";


    let listContainer: HTMLElement;
    let burgerContainer: SVGSVGElement;

    let b1: SVGPathElement;
    let b2: SVGPathElement;
    let b3: SVGPathElement;

    function handleClick() {
        listContainer.classList.toggle("hidden");
        burgerContainer.classList.toggle("cross");

        b1.classList.toggle("c1");
        b2.classList.toggle("c2");
        b3.classList.toggle("c3");
    }

    function handleSignOut() {
        console.log("signed out !");
        currentUser.set(null);
        redirectTo("/");
    }

    import burger from "../assets/burger.svg";
    import { redirectTo } from "./redirect";
    import { link } from "svelte-spa-router";
    import Devoirs from "../routes/Devoirs.svelte";
</script>

<nav class="nav">
    <button class="btn" on:click={() => handleClick()}>
        <svg
            bind:this={burgerContainer}
            id="burger"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                bind:this={b1}
                class="burgerB b1"
                d="M4 18L20 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
            />
            <path
                bind:this={b2}
                class="burgerB b2"
                d="M4 12L20 12"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
            />
            <path
                bind:this={b3}
                class="burgerB b3"
                d="M4 6L20 6"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    </button>
    <button class="signout" on:click={() => handleSignOut()}> Sign Out </button>
    <div
        class="list_container hidden"
        bind:this={listContainer}
        use:clickOutside
        on:click_outside={() => listContainer.classList.add("hidden")}
    >
        <div class="info">
            <img
                src={`https://api.ecoledirecte.com/v3/telechargement.awp?cToken=MDU2MDA5OEM=&verbe=get&fichierId=${$currentUser?.mainAccount?.logoEtablissement}&leTypeDeFichier=IMPORT_FTP`}
                class="logoEtablissement"
                alt="Logo etablissement"
            />
            <div>
                <p>
                    <span>Mon espace Elève</span><span
                        >{$currentUser?.mainAccount?.prenom}
                        {$currentUser?.mainAccount?.nom}</span
                    ><span>{$currentUser?.mainAccount?.nomEtablissement}</span>
                </p>
            </div>
        </div>
        <ul class="list">
            <li class="li">
                <a href={`/home`} use:link>Accueil</a>
            </li>
            <li class="li">
                <a href={`/cantine`} use:link>Badge cantine</a>
            </li>
            <li class="li">
                <a href={`/notes`} use:link>Notes</a>
            </li>
            <li class="li">
                <a href={`/devoirs`} use:link>Devoirs</a>
            </li>
        </ul>
    </div>
</nav>

<style>
    .list {
        margin-top: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .signout {
        all: unset;
        padding: 16px;
        border-radius: 98px;
        background-color: var(--secondary);
        cursor: pointer;
    }
    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .logoEtablissement {
        width: 48px;
        height: 48px;
        border-radius: 100%;
        margin-right: 16px;
        margin-left: 16px;
    }
    :global(a) {
        all: unset;
        text-decoration: none;
        cursor: pointer;
    }

    .li {
        all: unset;
        color: black;
        list-style-type: none;
        margin-bottom: 16px;
        cursor: pointer;
        margin-bottom: 16px;
        font-weight: 800;
    }
    p {
        display: flex;
        flex-direction: column;
    }
    .burgerB {
        display: block;
        position: absolute;
        height: 9px;
        width: 100%;
        background: #d3531a;
        border-radius: 9px;
        opacity: 1;
        left: 0;

        transform: rotate(0deg);

        transition: 0.25s ease-in-out;
    }

    .btn {
        all: unset;
        cursor: pointer;
    }
    .burger {
        width: 60px;
        height: 45px;
        position: relative;
        margin: 50px auto;

        transform: rotate(0deg);

        transition: 0.5s ease-in-out;
        cursor: pointer;
    }
    .nav {
        /* background-color: var(--secondary); */
        display: flex;
        justify-content: space-between;
        margin-bottom: 12%;
    }
    .list_container {
        z-index: 10;
        margin: 0;
        left: 0;
        top: 0px;
        padding: 0;
        position: absolute;
        width: 75%;
        height: 100%;
        transition: transform 0.3s ease-out;
        background-color: var(--secondary);
    }

    .hidden {
        scale: 0 !important;
        transform: translateX(-50%);
    }

    @keyframes toright {
        from {
            transform: translateX(-50%);
        }
        to {
            transform: translateX(0%);
        }
    }
</style>
