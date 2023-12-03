<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "../lib/User";
    import type { message } from "..";
    import Navbar from "../components/Navbar.svelte";
    import { fetchMessages } from "../lib/fetchMessages";
    import { params } from "svelte-spa-router";

    let messages: Array<message>;

    onMount(() => {
        const user = new User(
            $currentUser!.identifiant,
            $currentUser!.motdepasse
        );

        user.login().then(() => {
            user.getMessages().then((res) => {
                if (res) {
                    let conversations = fetchMessages(res);

                    console.log(conversations)

                    const sender = conversations.filter((c) => c.id == $params?.id)[0];

                    Promise.all(
                        sender.messages.map(async (m) => {
                            return await user.getMessage(m.id);
                        })
                    ).then((res) => {
                        messages = res;
                    });
                }
            });
        });
    });
</script>

<main>
    <Navbar />

    {#if messages}
        {#each messages as message}
            <div class="container">
                <div class="left">
                    <img
                        class="pfp"
                        src="https://cataas.com/cat/gif?height=64&width=64"
                        alt="profile"
                    />
                </div>
                <div class="right">
                    <p class="name">
                        {message.from.name ? message.from.name : "..."}

                        <span class="createdAt">
                            {new Date(message.date).toLocaleDateString("fr", {
                                day: "numeric",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute:"2-digit"
                            }) ?? "..."}
                        </span>
                    </p>
                    <p>{@html atob(message.content) ?? "..."}</p>
                </div>
            
            </div>
            <div class="hr"><div class="hrLine"></div><p class="hrDate">{new Date(message.date).toLocaleDateString("fr", {month:"long", day:"2-digit", year:"numeric"})}</p><div class="hrLine"></div></div>
        {/each}
    {/if}
</main>

<style>
    .container {
        display: flex;
    }
    .createdAt {
        font-weight: 200;
        color: var(--text);
        font-size: 11px;
    }
    .name {
        margin-top: 0px;
        color: var(--primary);
        /* margin-left: 16px;
        margin-right: 16px; */
        font-weight: 600;
    }
    .right {
        margin: 0px 16px;
    }
    .pfp {
        border-radius: 64px;
        width: 48px;
        height: 48px;
    }

    .hr {
        margin: 32px 0px;
        display: flex;
        align-items: center;
    }
    .hrLine {
        width: 30%;
        height: 2px;
        background-color: gray;
    }
    .hrDate {
        margin: 0px 8px;
        text-align: center;
        background-color: var(--bg);
    }
</style>
