async function mergeSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    await mergeSortHelper(arr, 0, arr.length - 1);

    stopTimer();
    isSorting = false;
    if (!isStopped) isSorted = true;
}

async function mergeSortHelper(arr, left, right) {
    if (left >= right || isStopped) return;

    iterations++;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);

    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    if (isStopped) return;

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        comparisons++;

        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }

        swaps++;            
        updateStats();
        renderArray(arr);
        await sleep();

        if (isStopped) return;
    }

    while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        swaps++;
        updateStats();
        renderArray(arr);
        await sleep();

        if (isStopped) return;
    }

    while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        swaps++;
        updateStats();
        renderArray(arr);
        await sleep();

        if (isStopped) return;
    }
}

