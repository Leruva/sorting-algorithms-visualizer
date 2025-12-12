async function selectionSort(arr) {
    isSorting = true;

    if (isStopped) {
        isSorting = false;
        return;
    }

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (isStopped) {          
                isSorting = false;
                return;
            }
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        if (isStopped) {
            isSorting = false;
            return;
        }

        renderArray(arr);
        await sleep();                
    }

    isSorting = false;
    if (!isStopped) {
        isSorted = true;
    }
    return arr;
}
