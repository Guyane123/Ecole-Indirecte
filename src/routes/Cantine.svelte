<script lang="ts">
    import JsBarcode from "jsbarcode";
    import { currentUser } from "../stores";
    import { onMount } from "svelte";
    import Navbar from "../components/Navbar.svelte";

    let barecode: SVGSVGElement;

    $: codecantine = "";



    onMount(() => {
        codecantine = (
            $currentUser?.mainAccount?.modules?.filter(
                (m: any) => m.code == "CANTINE_BARCODE"
            )[0] as any
        ).params.numeroBadge;

        changeBarecode(codecantine);

    });

    function changeBarecode(code: string) {
        JsBarcode(barecode, code, { format: "CODE39", height: 200, width: 5 });
    }
</script>

<main>
    <Navbar />

    <div>
        <!-- <div style="background-image: url(&quot;https://doc1.ecoledirecte.com/PhotoEleves/0560098C_643455574d33507062386f/4965542b4c67.jpg&quot;);" class="image"> -->

        <!-- <div
            class="profile"
            style={`background-image: url("https://doc1.ecoledirecte.com/PhotoEleves/0560098C_643455574d33507062386f/4965542b4c67.jpg");`}
        ></div> -->


        <!-- <image
            src="https://doc1.ecoledirecte.com/PhotoEleves/0560098C_643455574d33507062386f/4965542b4c67.jpg"
            alt="image"
        /> -->

        <!-- </div> -->

        <div class="info">
            <p class="nom">
                {$currentUser?.mainAccount?.prenom}
                {$currentUser?.mainAccount?.particule}
                {$currentUser?.mainAccount?.nom}
            </p>
            <p>
                {$currentUser?.mainAccount?.profile.classe.libelle}
            </p>
        </div>
    </div>

    <div class="div">
        <svg id="codebar" bind:this={barecode}> </svg>

        <input
            type="number"
            class="input"
            bind:value={codecantine}
            on:change={() => changeBarecode(codecantine)}
        />
    </div>
</main>

<style>
    .info {
        margin-bottom: 128px;
    }
    .nom {
        font-weight: 800;
    }
    #codebar {
        width: 100%;
    }
    .div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .input {
        width: 30%;
    }
</style>
