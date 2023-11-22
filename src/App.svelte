<script lang="ts">
    import { Router, Route, Link } from "svelte-routing";
    import Login from "./routes/Login/+page.svelte";
    import Home from "./routes/Home/+page.svelte";
    import { writable } from "svelte/store";
    import User from "./lib/User";

    export let url = "";



</script>

<Router {url}>
    <div>
        <Route path="/"><Login /></Route>
        <Route path="/home"><Home /></Route>
    </div>
</Router>
