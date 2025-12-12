async function mergeSort(arr, left = 0, right = arr.length - 1) {
    const isRootCall = (left === 0 && right === arr.length - 1);

    if (isRootCall) {
        isSorting = true;
    }

    if (isStopped || left >= right) {
        if (isRootCall) {
            isSorting = false;
        }
        return;
    }

    const mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    if (isStopped) {
        if (isRootCall) isSorting = false;
        return;
    }

    await mergeSort(arr, mid + 1, right);
    if (isStopped) {
        if (isRootCall) isSorting = false;
        return;
    }

    await merge(arr, left, mid, right);
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

async function merge(arr, left, mid, right) {
    if (isStopped) return;

    const temp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
        if (isStopped) return;
        if (arr[i] <= arr[j]) temp.push(arr[i++]);
        else temp.push(arr[j++]);
    }

    while (i <= mid) {
        if (isStopped) return;
        temp.push(arr[i++]);
    }

    while (j <= right) {
        if (isStopped) return;
        temp.push(arr[j++]);
    }

    for (let k = left; k <= right; k++) {
        if (isStopped) return;
        arr[k] = temp[k - left];
        renderArray(arr);
        await sleep();
    }
}

