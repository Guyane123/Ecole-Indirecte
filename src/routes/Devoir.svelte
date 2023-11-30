<script lang="ts">
    import { params } from "svelte-spa-router";
    import { currentUser } from "../stores";
    import { onMount } from "svelte";
    import User from "../lib/User";
    import type { devoir, devoirWithInfo } from "../index";
    import Navbar from "../lib/Navbar.svelte";




    let devoir: devoirWithInfo = {
        aFaire: {
            contenu: ""
        }
    }

    $:devoir;
    
    if ($currentUser) {
        onMount(() => {


            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );

            user.login().then(() => {
                user.getHomework(new Date()).then((res) => {
                    if (res) {
                        console.log(res.matieres)
                        console.log(res.matieres[1].id)
                        console.log($params?.id)
                        devoir = res.matieres.filter((d) => {
                            return d.id == Number($params?.id)
                        })[0]

                        console.log(devoir)
                    }
                });
            });
        });
    }
</script>


<main>
    <Navbar />
    <div>
        <h3>
            {devoir.matiere ? devoir.matiere : ""}
        </h3>
        {devoir.nomProf ? devoir.nomProf : ""}
        {@html atob(devoir.aFaire.contenu)}
    </div>
</main>