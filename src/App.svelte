<script lang='ts'>
    import Login from './routes/Login.svelte';
    import Home from './routes/Home.svelte';
    import Cantine from './routes/Cantine.svelte';
    import Notes from './routes/Notes.svelte';
    import Router from 'svelte-spa-router';
    import Devoirs from './routes/Devoirs.svelte';
    import Devoir from './routes/Devoir.svelte';
    import Messages from './routes/Messages.svelte';
    import Message from './routes/Message.svelte';

    const routes = {
        '/': Login,

        '/home/': Home,

        '/notes/': Notes,

        '/devoirs/': Devoirs,
        '/devoir/:id/:date': Devoir,

        '/cantine/': Cantine,

        '/messages/': Messages,
        '/message/:id': Message,

        '*': Login,
    };
</script>

<Router {routes} />
