<script lang='ts'>
    import Login from './routes/Login.svelte';
    import Home from './routes/Home.svelte';
    import Cantine from './routes/Cantine.svelte';
    import Notes from './routes/Notes.svelte';
    import CahierDeTexte from './routes/CahierDeTexte.svelte';
    import Router from 'svelte-spa-router';

    const routes = {
        // Exact path
        '/': Login,

        // Using named parameters, with last being optional
        '/home/': Home,

        // Wildcard parameter
        '/notes/': Notes,

        '/cantine/': Cantine,
        '*': Login,
        // '/': Login,
    };
</script>

<Router {routes} />
