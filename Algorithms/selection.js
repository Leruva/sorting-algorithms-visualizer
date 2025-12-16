async function selectionSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    for (let i = 0; i < arr.length - 1; i++) {
        iterations++;
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            comparisons++;

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            updateStats();
            renderArray(arr);
            await sleep();

            if (isStopped) {
                isSorting = false;
                stopTimer();
                return;
            }
        }

        if (minIndex !== i) {
            swaps++;
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

            updateStats();
            renderArray(arr);
            await sleep();
        }
    }

    stopTimer();
    isSorting = false;
    isSorted = true;
}
