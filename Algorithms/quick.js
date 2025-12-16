async function quickSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    await quickSortHelper(arr, 0, arr.length - 1);

    stopTimer();
    isSorting = false;
    if (!isStopped) isSorted = true;
}

async function quickSortHelper(arr, low, high) {
    if (low >= high || isStopped) return;

    iterations++;

    const pivotIndex = await partition(arr, low, high);

    await quickSortHelper(arr, low, pivotIndex - 1);
    await quickSortHelper(arr, pivotIndex + 1, high);
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        comparisons++;

        if (arr[j] < pivot) {
            i++;
            swaps++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            updateStats();
            renderArray(arr);
            await sleep();
        }

        if (isStopped) return high;
    }

    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    updateStats();
    renderArray(arr);
    await sleep();

    return i + 1;
}
