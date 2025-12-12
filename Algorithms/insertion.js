async function insertionSort(arr) {
    isSorting = true;

    if(isStopped){
        isSorting = false;
        return;
    }
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
        if(isStopped) {
            isSorting = false;
            return;
        }
        renderArray(arr);
        await sleep();
        }
        if(isStopped){
            isSorting = false;
            return;
        }
        arr[j + 1] = temp;
        
        renderArray(arr);
        await sleep();
    }
    isSorting = false;
    if (!isStopped) {
        isSorted = true;     
    }
    return arr;
}

