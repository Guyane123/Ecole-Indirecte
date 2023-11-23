<script lang="ts">
    import JsBarcode from "jsbarcode";
    import { currentUser } from "../../stores";
    import { onMount } from "svelte";
    import Navbar from "../../lib/Navbar.svelte";

    let barecode: SVGSVGElement;

    $: codecantine= "";


    onMount(() => {
        codecantine = (
            $currentUser?.mainAccount?.modules?.filter(
                (m: any) => m.code == "CANTINE_BARCODE"
            )[0] as any
        ).params.numeroBadge;


       changeBarecode(codecantine)
    });

    function changeBarecode(code: string) {
        JsBarcode(barecode, code, { format: "CODE39", height: 200, width: 5 });
    }
</script>


<main>
    <Navbar />
    <div class="div">
        <svg id="codebar" bind:this={barecode}> </svg>
        

        <input type="number" class="input" bind:value={codecantine} on:change={() => changeBarecode(codecantine)}>
    </div>
</main>


<style>

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