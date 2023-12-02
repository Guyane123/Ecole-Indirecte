<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../stores";
    import User from "../lib/User";
    import { params } from "svelte-spa-router";
    import type { message } from "..";
    import Navbar from "../components/Navbar.svelte";


    let message: message;

    $:message;

    onMount(() => {
        
        const user = new User(
            $currentUser!.identifiant,
            $currentUser!.motdepasse
        );

        user.login().then(() => {

            console.log($params?.id!)
            user.getMessage($params?.id!).then((res) => {
                console.log(res)
                message = res
            })
        })

    })


</script>



<div>
    <Navbar />
    <p>{@html message?.content ? atob(message.content) : ""}
</div>


