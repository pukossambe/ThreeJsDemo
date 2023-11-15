let arr = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 8]
let unique = [];
for (let i = 0; i < arr.length; i++) {
    if (unique.includes(arr[i])) {
        console.log(arr[i] + " Is duplicated");
    } else {
        unique.push(arr[i]);
    }
}