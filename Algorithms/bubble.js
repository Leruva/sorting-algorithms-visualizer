async function bubbleSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    for (let i = 0; i < arr.length - 1; i++) {
        iterations++;

        for (let j = 0; j < arr.length - i - 1; j++) {
            comparisons++;

            if (arr[j] > arr[j + 1]) {
                swaps++;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
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
    }

    stopTimer();
    isSorting = false;
    isSorted = true;
}


