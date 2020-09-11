'use strict';

// localStorage.clear()

const keyLocStore = 'example';
const valueLocStore = ['aaa', 'bbb', 'ccc'];

//saving the key and value into LocalStorage
function saveAll(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//getting all array value by the key and parsing into JSON format
function getAll(key) {
    let json = localStorage.getItem(key);
    return JSON.parse(json);
}

//getting particular keyIndex in the arr
function get(key, keyIndex) {
    let arr = getAll(key);
    if (arr[keyIndex] !== undefined) {
        return arr[keyIndex]
    } else {
        return null;
    }
}

//changing the particular keyIndex with new value in the arr of the local storage
function change(key, keyIndex, newValue) {
    let arr = getAll(key);

    arr[keyIndex] = newValue;

    saveAll(key, arr)
}
change(keyLocStore, 1, 'bbb');

//pushing newValue in local storage array
function push(key, newValue) {
    let arr = getAll(key);
    arr.push(newValue);

    saveAll(key, arr)
}

push(keyLocStore, 'ddd')


console.log(localStorage);













