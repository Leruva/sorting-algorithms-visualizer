async function bubbleSort(arr) {
    isSorting = true;

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        if (isStopped) {
            isSorting = false;
            return;
        }

        for (let j = 0; j < n - i - 1; j++) {
            if (isStopped) {
                isSorting = false;
                return;
            }

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                renderArray(arr);
                await sleep();
            }
        }
    }

    renderArray(arr);
    isSorting = false;
    if (!isStopped) {
        isSorted = true;
    }
    return arr;
}

