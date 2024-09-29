<script lang="ts">
    import User from "../lib/User";
    import { currentUser } from "../stores";
    import logo from "../assets/logo.svg";
    import { redirectTo } from "../lib/redirect";

    let error: HTMLElement;

    let selected: string | undefined
    let identifiant = "";
    let motdepasse = "";
    let qcm: undefined | { propositions: Array<string>; question: string } =
        undefined;
    $: qcm;
    let isQCM = false;
    let newUser: undefined | User;
    $:newUser;
    $: isQCM;
    if ($currentUser) {
        redirectTo("/home");
    }

    function handleSubmit(
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        },
    ) {
        e.preventDefault();

        newUser = new User(identifiant, motdepasse);

        newUser
            .login()
            .then((res) => {
                console.log(res);
                if (res?.question) {
                    isQCM = true;
                    qcm = res;
                    return;
                }
                currentUser.set(newUser!);
                console.log("currentUser set in /login:", $currentUser);
                redirectTo("/home");
            })
            .catch((err) => {
                if (err) {
                    error.innerText = err;
                }
            });
    }

    function handleQCMSubmit(
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        },
    ) {
        e.preventDefault();
        const selectedRadio: HTMLInputElement | null= document!.querySelector('input[name="qcm"]:checked')
        selected = selectedRadio!.value


        console.log(selected, "SELECTED")
        newUser!
            .qcm(selected)
            .then((res) => {
                currentUser.set(newUser!);
                console.log("currentUser set in /login:", $currentUser);
                redirectTo("/home");
            })
            .catch((err) => {
                if (err) {
                    error.innerText = err;
                }
            });
    }
</script>

<main class="main">
    <div class="flex white">
        <div class="flex col">
            <div>
                <img class="img" src={logo} alt="Logo" />
                <h1>EcoleIndirect</h1>

                <h2 class="h2">Connectez-vous !</h2>

                <p class="err" bind:this={error}></p>
            </div>
            {#if !isQCM}
                <form action="" class="form" on:submit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        name="identifiant"
                        class="input"
                        id="identifiant"
                        placeholder="Identifiant"
                        bind:value={identifiant}
                    />
                    <input
                        type="password"
                        name="motdepasse"
                        class="input"
                        id="motdepasse"
                        placeholder="Mot de passe"
                        bind:value={motdepasse}
                    />
                    <button type="submit" class="btn">Connexion</button>
                </form>
            {/if}

            {#if isQCM}
                <form
                    class="qcm"
                    action=""
                    on:submit={(e) => handleQCMSubmit(e)}
                >
                    <h3>{atob(qcm.question)}</h3>
                    <div class="radios">
                        {#each qcm.propositions as p}
                            <div>
                                <input
                                    on:select={() => selected = p}
                                    type="radio"
                                    id={p}
                                    name="qcm"
                                    value={p}
                                    class="radio"
                                />
                                <label for={p}>{atob(p)}</label>
                            </div>
                        {/each}
                    </div>
                    <div class="btns">
                        <button class="btn" type="submit">Envoyer</button>
                        <button
                            on:click={() => {
                                qcm = undefined;
                                isQCM = false;
                            }}
                            class="stop">Annuler</button
                        >
                    </div>
                </form>
            {/if}
        </div>
    </div>
    <div class="right"></div>
</main>

<style>
    @media (max-width: 1000px) {
        .right {
            width: 0% !important;
        }
        .white {
            width: 100% !important;
        }
        .col {
            height: 75%;
        }
    }
    .img {
        width: 173px;
        height: 113px;
    }
    .err {
        color: rgb(231, 50, 69);
    }
    .white {
        position: relative;
        background-color: white;
        width: 40%;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }
    .h2 {
        color: var(--primary);
    }
    .flex {
        display: flex;
    }

    .col {
        position: relative;
        width: 75%;
        height: 50%;

        flex-direction: column;
    }
    .main {
        position: absolute;
        margin: 0px;
        left: 0px;
        top: 0px;
        display: flex;
        width: 100%;
        height: 100%;
    }
    .form {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .input {
        all: unset;
        display: block;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        appearance: none;
        border-radius: 0.375rem;
        transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
    }
    .input:focus-visible {
        border: var(--secondary) 1px solid;
        box-shadow: 0px 0px 8px 2px pink;
    }
    .right {
        width: 60%;
        height: 100vh;
    }
    .btn {
        display: inline-block;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 16px;
        transition:
            color 0.15s ease-in-out,
            background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
    }

    .input,
    .btn {
        margin-bottom: 8px;
    }
    .btns {
        display: flex;
        flex-direction: column;
    }
    .qcm {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
        background-color: white;
    }
    .stop {
        all: unset;
        cursor: pointer;
        color: var(--primary);
        text-align: center;
        text-decoration: underline;
    }
    .radios {
        margin-bottom: 8px;
    }
</style>
