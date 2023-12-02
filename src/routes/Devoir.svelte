<script lang="ts">
    import { params } from "svelte-spa-router";
    import { currentUser } from "../stores";
    import { onMount } from "svelte";
    import User from "../lib/User";
    import type { devoir, devoirWithInfo, matiere } from "../index";
    import Navbar from "../components/Navbar.svelte";

    const id = $params?.id!;
    const date = $params?.date!;

    let devoir: devoirWithInfo = {
        aFaire: {
            contenu: "",
        },
    };

    $: devoir;

    if ($currentUser) {
        onMount(() => {
            const user = new User(
                $currentUser!.identifiant,
                $currentUser!.motdepasse
            );

            user.login().then(() => {
                user.getHomework(undefined).then((res) => {
                    if (res) {

                        user.getHomework(new Date($params?.date!)).then((res) => {
                            console.log(id);
                            console.log(res.matieres[0]);
                            devoir = res.matieres.filter((d: devoirWithInfo) => {
                                return d.id == Number($params?.id);
                            })[0];
                        });
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
