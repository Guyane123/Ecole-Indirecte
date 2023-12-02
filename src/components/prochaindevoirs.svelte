<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "../lib/User";
    import type { devoir } from "../index";

    export let devoirs : Array<devoir>;

    console.log(devoirs)
</script>

<p>Tu as {devoirs?.length ? devoirs.length : "?"} devoir(s) à faire.</p>