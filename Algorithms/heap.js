async function heapSort(arr) {
    isSorting = true;
    isStopped = false;
    resetStats();
    startTimer();

    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        iterations++;
        await heapify(arr, n, i);
        if (isStopped) {
            isSorting = false;
            stopTimer();
            return;
        }
    }

    for (let i = n - 1; i > 0; i--) {
        swaps++;
        [arr[0], arr[i]] = [arr[i], arr[0]];

        updateStats();
        renderArray(arr);
        await sleep();

        await heapify(arr, i, 0);
        if (isStopped) {
            isSorting = false;
            stopTimer();
            return;
        }
    }

    stopTimer();
    isSorting = false;
    isSorted = true;
}

async function heapify(arr, heapSize, rootIndex) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
        comparisons++;
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    if (right < heapSize) {
        comparisons++;
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== rootIndex) {
        swaps++;
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

        updateStats();
        renderArray(arr);
        await sleep();

        if (isStopped) return;

        await heapify(arr, heapSize, largest);
    }
}
