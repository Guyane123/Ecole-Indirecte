<script lang="ts">
    import { Router, Route, Link } from "svelte-routing";
    import Login from "./routes/Login/+page.svelte";
    import Home from "./routes/Home/+page.svelte";
    import Cantine from "./routes/Cantine/+page.svelte";

    let baseUrl = `${window.location.protocol}//${window.location.host}`;

    export let url = "";
</script>

<Router url={url}>
    <Route path={``}><Login /></Route>
    <Route path={`*`}><Login /></Route>
    <Route path={`/home`}><Home /></Route>
    <Route path={`/cantine`}><Cantine /></Route>
</Router>
