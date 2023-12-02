<script lang="ts">
    import User from "../lib/User";
    import { currentUser } from "../stores";
    import Navbar from "../components/Navbar.svelte";
    import { onMount } from "svelte";
    import type { message } from "..";
    import { link } from "svelte-spa-router";
    let messages: Array<message>;

    type senders = {
        name: string;
        id: string,
        messages: Array<{
            content: string;
            createdAt: Date;
        }>;
    };

    let conversations: Array<senders> = [];
    $: conversations;

    onMount(() => {
        const user = new User(
            $currentUser!.identifiant,
            $currentUser!.motdepasse
        );

        let senders: Array<senders> = [];

        user.login().then(() => {
            user.getMessages().then((res) => {
                if (res) {
                    messages = res.messages.received.sort(
                        (a: message, b: message) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                    );

                    messages.forEach((m) => {
                        const newSender = {
                            name: m.from.prenom + `${m.from.particule ? " " + m.from.particule: ""}` +  " " + m.from.nom,
                        };

                        let isDuplicate = false;
                        for (let i = 0; i < senders.length; i++) {
                            if (senders[i].name == newSender.name) {
                                isDuplicate = true;
                            }
                        }

                        if (!isDuplicate) {
                            senders.push(newSender as senders);
                        }
                    });

                    messages.forEach((m) => {
                        // let index = senders.filter((s, k) => {
                        //     if(s.name == m.from.prenom + `${m.from.particule ? " " + m.from.particule: ""}` +  "" + m.from.nom){
                        //         return k;
                        //     }
                        // })[0]

                        const name = m.from.prenom + `${m.from.particule ? " " + m.from.particule: ""}` +  " " + m.from.nom
                        const index = senders.findIndex(i => i.name ==  name)

                        const oldMessages = senders[index].messages? senders[index].messages : []
                        
                        const newSender = {
                            name: senders[index].name,
                            id: m.id,
                            messages: [...oldMessages, {content: m.subject, createdAt: new Date(m.date)}]
                        }

                        senders[index] = newSender

                    });

                    conversations = senders;

                    console.log(conversations)
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
                <img class="left" src={"http://placekitten.com/64/64"} alt="profile"/>
                <div class="middle">
                    <p class="name">{c.name}</p>
                    <p>{c.messages[c.messages?.length - 1].content ?? ""}</p>
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
