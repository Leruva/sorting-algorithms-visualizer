async function quickSort(arr, low = 0, high = arr.length - 1) {
    const isRootCall = (low === 0 && high === arr.length - 1);

    if (isRootCall) {
        isSorting = true;
    }

    if (isStopped || low >= high) {
        if (isRootCall) {
            isSorting = false;
        }
        return;
    }

    const p = await partition(arr, low, high);
    if (isStopped) {
        if (isRootCall) isSorting = false;
        return;
    }

    await quickSort(arr, low, p - 1);
    if (isStopped) {
        if (isRootCall) isSorting = false;
        return;
    }

    await quickSort(arr, p + 1, high);
    if (isStopped) {
        if (isRootCall) isSorting = false;
        return;
    }

    if (isRootCall) {
        isSorting = false;
        if (!isStopped) {
            isSorted = true;
        }
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (isStopped) return;
        if (arr[j] <= pivot) {
            i++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            renderArray(arr);
            await sleep();
        }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    renderArray(arr);
    await sleep();

    return i + 1;
}

