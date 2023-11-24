<script lang="ts">
    import { onMount } from "svelte";
    import type { matiere } from "..";
    import { currentUser } from "../stores";
    import User from "./User";

    let prochaincour: matiere;

    $: prochaincour;

    if ($currentUser) {
        const user = new User(
            $currentUser.identifiant,
            $currentUser.motdepasse
        );

        const now = new Date();

        const today = new Date('November 24, 2023 00:00:00');
        const today2 = new Date('November 29, 2023 23:59:59');

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
        onMount(() => {
            user.login().then(() => {
            user.getSchedule(today, today2).then((res) => {
                if (res) {
                    const closest = res.reduce(function (prev, curr) {
                        return Math.abs(new Date(curr.start_date).getTime() - now.getTime()) < Math.abs(new Date(prev.start_date).getTime() - now.getTime())
                            ? curr
                            : prev;
                    });
                    prochaincour = closest
                    console.log(prochaincour)
                }
            });
        });
        })
    }
</script>



<div>
    <p>Ton prochain cours</p>
    <div class="matiere">
        <div class="left" style="background-color: {prochaincour?.color}">

        </div>
        <div class="right">
                    {prochaincour?.matiere ?  prochaincour?.matiere :"Tu n'as pas de cours maintenant"}
        </div>
        <div>

        </div>
    

    
    
    
    </div>
</div>


<style>
    .matiere {
        height: 64px;
        border-radius: 8px;
        display: flex;
        border: 2px solid var(--text);
        box-shadow: 0 3px 10px rgb(0,0,0,0.2);
        justify-content: space-between;
        font-weight: 400;
    }

    .left {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px ;
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
