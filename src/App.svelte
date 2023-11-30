<script lang='ts'>
    import Login from './routes/Login.svelte';
    import Home from './routes/Home.svelte';
    import Cantine from './routes/Cantine.svelte';
    import Notes from './routes/Notes.svelte';
    import Router from 'svelte-spa-router';
    import Devoirs from './routes/Devoirs.svelte';
    import Devoir from './routes/Devoir.svelte';

    const routes = {
        '/': Login,

        '/home/': Home,

        '/notes/': Notes,

        '/devoirs/': Devoirs,
        '/devoir/:id': Devoir,

        '/cantine/': Cantine,

        '*': Login,
    };
</script>

<Router {routes} />
