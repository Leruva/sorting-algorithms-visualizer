async function insertionSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    for (let i = 1; i < arr.length; i++) {
        iterations++;
        let temp = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > temp) {
            comparisons++;
            arr[j + 1] = arr[j];
            j--;

            updateStats();
            renderArray(arr);
            await sleep();

            if (isStopped) {
                isSorting = false;
                stopTimer();
                return;
            }
        }

        arr[j + 1] = temp;
        swaps++;
        updateStats();

        renderArray(arr);
        await sleep();
    }

    stopTimer();
    isSorting = false;
    isSorted = true;
}
