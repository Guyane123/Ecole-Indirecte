<script lang="ts">
    import User from "../lib/User";
    import { currentUser } from "../stores";
    import Navbar from "../components/Navbar.svelte";
    import { onMount } from "svelte";
    import type { message, senders } from "..";
    import { link } from "svelte-spa-router";
    import { fetchMessages } from "../lib/fetchMessages";
    import axios from "axios";


    let conversations: Array<senders> = [];
    $: conversations;

    function generateRandomCat() {
        return "https://cataas.com/cat/gif?height=64&width=64"
    }


    onMount(() => {
        const user = new User(
            $currentUser!.identifiant,
            $currentUser!.motdepasse
        );


        user.login().then(() => {
            user.getMessages().then((res) => {

                if(res) {
                    conversations = fetchMessages(res)
                }

            });
        });
    });
</script>

<main>
    <Navbar />

    {#if conversations}
        {#each conversations as c}
            <a class="message" use:link href="/message/{c.id}">
                <img class="left" src={generateRandomCat()} alt="profile"/>
                <div class="middle">
                    <p class="name">{c.name}</p>
                    <p class={`${c.messages[0].isReaded ? "" : "notreaded" }`}>{c.messages[0].content ?? ""}</p>
                </div>
                <div class="right">{c.messages[c.messages?.length - 1].createdAt.toLocaleDateString("fr", {day: "numeric", month: "numeric"})}</div>
            </a>
        {/each}
    {/if}
</main>

<style>
    .name {
        font-weight: 600;
    }
    .message {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        border-radius: 64px;
        align-items: center;
        box-sizing: border-box;
    }
    .notreaded {
        font-weight: 600;
    }
    .left {
        margin-right: 16px;
        min-width: 48px;
        min-height: 48px;
        max-height: 48px;
        max-width: 48px;
        border-radius: 64px;
        background-color: gray;
        width: 20%;
    }
    .middle {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    p {
        all: unset;
    }
    .right {
        width: 10%;
        margin-left: 16px;
    }
</style>
