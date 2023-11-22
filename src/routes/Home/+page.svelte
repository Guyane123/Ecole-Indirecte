<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../../stores";
    import User from "../../lib/User";
    import Navbar from "../../lib/Navbar.svelte";

    if(!$currentUser) {
        window.location.href = '/';
    }


    onMount(() => {
        console.log($currentUser)
        

        // if(!$currentUser || !$currentUser.identifiant || !$currentUser.motdepasse) {
        //     window.location.href = '/home';
        //     return;
        // }

        // const user = new User($currentUser?.identifiant, $currentUser?.motdepasse)
        // user.login().then(() => {
        //     console.log(user.getUserInfo())
        // })

    })



    
</script>



<main>
    <Navbar />
    <h1 class="h1">
        Salut ! {$currentUser?.mainAccount?.prenom} {$currentUser?.mainAccount?.nom}
    </h1>

    <div class="etablissement">
        <img width="225px" src={`https://api.ecoledirecte.com/v3/telechargement.awp?cToken=MDU2MDA5OEM=&verbe=get&fichierId=${$currentUser?.mainAccount?.logoEtablissement}&leTypeDeFichier=IMPORT_FTP`} alt="votre établissement">
        <p class="nomEtablissement">{$currentUser?.mainAccount?.nomEtablissement}</p>
    </div>

</main>

<style>

    .h1 {
        text-align: center;
    }
    .nomEtablissement {
        font-size: 30px;
        font-weight: 400;
    }
    .etablissement {
        margin-top: 64px;
        display: flex;
        justify-content: space-around;
    }
</style>
