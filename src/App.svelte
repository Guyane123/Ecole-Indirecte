<script lang="ts">
    import { Router, Route, Link } from "svelte-routing";
    import Login from "./routes/Login.svelte";
    import Home from "./routes/Home.svelte";
    import Cantine from "./routes/Cantine.svelte";

</script>

<Router>
    <div>
        <Route path="/ecoleindirecte/" component={Login}/>
        <Route path="/ecoleindirecte/*" component={Login}/>
        <Route path="/ecoleindirecte/home" component={Home}/>
        <Route path="/ecoleindirecte/cantine" component={Cantine}/>
    </div>
</Router>