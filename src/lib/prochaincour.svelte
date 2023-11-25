<script lang="ts">
    import { onMount } from "svelte";
    import type { matiere } from "..";
    import { currentUser } from "../stores";
    import User from "./User";

    let cours: Array<matiere> = [
        { matiere: "Tu n'as pas de cours pour le moment" } as matiere,
    ];

    let user: User | undefined;
    $: cours;
    $: user;

    const now = new Date();

    const today = new Date("November 24, 2023 00:00:00");
    const today2 = new Date("November 29, 2023 23:59:59");

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
    );
    const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        24,
        59,
        59
    );
    async function getNextCourse(user: User | undefined) {
        const res = await user?.getSchedule(startOfToday, endOfToday);

        const closest = res?.reduce(function (prev, curr) {
            return Math.abs(
                new Date(curr.start_date).getTime() - now.getTime()
            ) < Math.abs(new Date(prev.start_date).getTime() - now.getTime())
                ? curr
                : prev;
        });

        if (closest) {
            cours = [closest];
        }

        return [closest];
    }
    async function getCurrentDaySchedule(user: User | undefined) {
        const res = await user?.getSchedule(startOfToday, endOfToday);

        if (res) {
            cours = res;
        }

        return res;
    }

    if ($currentUser) {
        user = new User($currentUser.identifiant, $currentUser.motdepasse);

        onMount(() => {
            user?.login().then(() => {
                getNextCourse(user!);
            });
        });
    }
</script>

<div class="container">
    <div class="btns">
        <button
            class="btn"
            on:click={async () => await getNextCourse(user ? user : undefined)}
            >Prochain cour</button
        >
        <button
            class="btn"
            on:click={async () =>
                await getCurrentDaySchedule(user ? user : undefined)}
            >Journée</button
        >
        <!-- <button class="btn">Semaine</button> -->
    </div>

    {#each cours as cour}
        <div class="matiere">
            <div
                class="left"
                style="background-color: {cour.matiere ? cour?.color : ''}"
            ></div>
            <div class="right">
                {cour?.matiere ? cour?.matiere : "Pas de cours"}
            </div>
            <div></div>
        </div>
    {/each}
</div>

<style>

    .container {
        margin-top: 98px;
    }
    .btns {
        margin-bottom: 8px;
    }
    .btn {
        all: unset;
        color: var(--primary);
        padding: 8px;
        border: 2px solid var(--primary);
        border-radius: 98px;
        margin-bottom: 8px;
    }
    .btn:hover {
        cursor: pointer;
    }
    .matiere {
        height: 64px;
        border-radius: 8px;
        display: flex;
        border: 2px solid var(--text);
        box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
        justify-content: space-between;
        font-weight: 400;
        margin-bottom: 8px;
    }

    .left {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        width: 10%;
        max-width: 32px;
        min-width: 8px;
        background-color: var(--primary);
    }
    .right {
        display: flex;
        align-items: center;
    }
</style>
