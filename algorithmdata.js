const algorithmData = {
  insertion: {
    title: "Insertion Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: {
      worst: "O(1)",
      stable: "Yes",
      inPlace: "Yes",
    },
  },

  selection: {
    title: "Selection Sort",
    time: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: {
      worst: "O(1)",
      stable: "No",
      inPlace: "Yes",
    },
  },

  bubble: {
    title: "Bubble Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: {
      worst: "O(1)",
      stable: "Yes",
      inPlace: "Yes",
    },
  },

  quick: {
    title: "Quick Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    space: {
      worst: "O(log n)",
      stable: "No",
      inPlace: "Yes",
    },
  },

  merge: {
    title: "Merge Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: {
      worst: "O(n)",
      stable: "Yes",
      inPlace: "No",
    },
  },

  heap: {
    title: "Heap Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: {
      worst: "O(1)",
      stable: "No",
      inPlace: "Yes",
    },
  },
};
