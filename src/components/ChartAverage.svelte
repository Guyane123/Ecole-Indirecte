<script lang="ts">
    import { Chart } from "chart.js";
    import type { note } from "../index";
    import { averageCalculator } from "../lib/averageCalculator";
    import { addDays, startOfDay } from "../lib/date";
    import { onMount } from "svelte";

    export let notes: Array<note>;

    console.log(notes);

    let chartHTML: HTMLCanvasElement;

    onMount(() => {
        let orderedNotes = notes.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        let daysInChart: Array<Date> = [];

        const firstNote = new Date(orderedNotes[0].date);
        const lastNote = new Date(orderedNotes[orderedNotes.length - 1].date);

        const diff = lastNote.getTime() - firstNote.getTime();

        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

        for (let i = 0; i < diffDays; i++) {
            daysInChart.push(addDays(firstNote, i));
        }

        console.log(daysInChart);
        function data() {
            let number: number = 0;
            let notes: Array<note> = [];
            let data: Array<number | undefined> = [];

            for (let i = 0; i < daysInChart.length; i++) {
                console.log(startOfDay(orderedNotes[number].date));
                console.log(number);
                console.log(
                    startOfDay(new Date(daysInChart[i])).getTime() ==
                        startOfDay(orderedNotes[number].date).getTime()
                );
                console.log(startOfDay(new Date(daysInChart[i])).getTime());
                console.log(startOfDay(orderedNotes[number].date));
                console.log(orderedNotes[number]);

                let isNotes = false;

                while (
                    startOfDay(new Date(daysInChart[i])).getTime() ==
                    startOfDay(orderedNotes[number].date).getTime()
                ) {
                    isNotes = true;
                    notes.push(orderedNotes[number]);
                    const average = averageCalculator(notes);
                    data.push(average);
                    number++;
                    //orderedNotes[number]
                }

                if (!isNotes) {
                    const average = averageCalculator(notes);
                    data.push(average);
                }
            }

            return data;
        }

        const values = data();

        new Chart(
            chartHTML
                ? chartHTML
                : (document.getElementById("chart") as HTMLCanvasElement),
            {
                type: "line",
                data: {
                    labels: daysInChart.map((d) =>
                        d.toLocaleDateString("fr", {
                            day: "numeric",
                            month: "numeric",
                            year: "2-digit",
                        })
                    ),
                    datasets: [
                        {
                            label: "Moyenne",
                            data: values,
                            borderColor: "#CD5B63",
                        },
                    ],
                },
            }
        );
    });
</script>

<div>
    <canvas bind:this={chartHTML} id="chart"></canvas>
</div>
