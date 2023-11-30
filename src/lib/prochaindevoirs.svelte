<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "./User";
    import type { devoir } from "../index";

    let devoirs: Array<devoir> = [];

    $: devoirs;

    if ($currentUser) {
        onMount(() => {
            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );

            user.login().then(() => {
                user.getNextHomework(new Date()).then((res) => {
                    if (res) {
                        devoirs = res.matieres;       
                    }
                });
            });
        });
    }
</script>

<p>Tu as {devoirs?.length ? devoirs.length : "?"} devoir(s) à faire.</p>