<script lang="ts">
    import { onMount } from "svelte";
    import type { matiere } from "..";
    import { currentUser } from "../stores";
    import { addDays, formatHours, formatMinutes } from "./date";
    import User from "../lib/User";
    let cours: Array<matiere> = [
        {
            matiere: "Pas de cours",
            start_date: "2050-01-01 8:00",
        } as matiere,
    ];

    let user: User | undefined;

    let i = 0;

    $: cours;
    $: user;

    const now = new Date();

    let notNow = addDays(now, 1);

    $: notNow;

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

    console.log(endOfToday.getDate());
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
    async function getDaySchedule(user: User | undefined, date: Date) {
        const startOfToday = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0,
            0,
            0
        );
        const endOfToday = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            24,
            59,
            59
        );
        const res = await user?.getSchedule(startOfToday, endOfToday);

        if (res) {
            console.log(res);
            notNow = new Date(res[0].start_date);
        }

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
        <div class="l">
            <button
                class="btn"
                on:click={async () =>
                    await getNextCourse(user ? user : undefined)}
                >Prochain cour</button
            >
            <button
                class="btn"
                on:click={async () =>
                    await getDaySchedule(user ? user : undefined, now)}
                >Journée</button
            >
        </div>
        <div class="r">
            {#if cours.length > 1}
                <button
                    class="btn"
                    on:click={async () => {
                        const nn = addDays(notNow, -1);

                        notNow = nn;

                        await getDaySchedule(user ? user : undefined, notNow);
                    }}>&lt;</button
                >
                <button
                    class="btn"
                    on:click={async () => {
                        const nn = addDays(notNow, 1);

                        notNow = nn;

                        await getDaySchedule(user ? user : undefined, notNow);
                    }}>&gt;</button
                >
            {/if}
        </div>
        <!-- <button class="btn">Semaine</button> -->
    </div>

    {#if cours.length > 1}
        <div class="weekday">
            {new Date(cours[0].start_date).toLocaleDateString("fr", {
                weekday: "long",
                day: "2-digit",
                month: "long",
            })}
        </div>
    {/if}

    {#each cours as cour}
        <div class="matiere">
            <div
                class="left"
                style="background-color: {cour.matiere ? cour?.color : ''}"
            ></div>
            <div class="right">
                <p class="p time">
                    {cour?.start_date
                        ? `${formatHours(
                              new Date(cour.start_date)
                          )}:${formatMinutes(new Date(cour.start_date))}`
                        : "?"}
                </p>
                <p class="p">
                    {cour?.matiere ? cour?.matiere : "Pas de cours"}
                </p>
            </div>
            <div></div>
        </div>
    {/each}
</div>

<style>
    .weekday {
        text-transform: capitalize;
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 8px;
    }
    .container {
        margin-top: 98px;
        animation-name: fromright;
        animation-duration: 1s;
        animation-timing-function: ease-out;
    }
    .btns {
        margin-bottom: 32px;
        display: flex;
        justify-content: space-between;
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

        animation-name: fromright;
        animation-duration: 1s;
        animation-timing-function: ease-out;
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
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @keyframes fromright {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .p {
        all: unset;
    }

    .time {
        font-weight: 600;
    }
</style>
