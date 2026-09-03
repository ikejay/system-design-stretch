"use strict";

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.
//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
// Predicted output order:
// sync
// promise
// timeout

// Step 6: paste the final rethrown message that reached the top.
// Error loading artists: Error: Stretch Records artist page loading artists failed: Field name is missing
//     at loadArtists (script.js:72:13)Caused by: MissingArtistsError: Field name is missing
//     at checkArtist (script.js:48:11)
//     at script.js:65:5
//     at Array.forEach (<anonymous>)
//     at loadArtists (script.js:64:11)


function delayedTask(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
                return;
            } 
            resolve(`${name} completed`);
        }, delay);
    });
}


async function runTasks() {
    const tasks = [
        delayedTask("Load artists", 500),
        delayedTask("Load label", 800, true), // This task will fail
        delayedTask("Load featured artists", 300)
    ];

    const outcomes = await Promise.allSettled(tasks);
    console.log('Every outcome', outcomes);

    const survived = outcomes.filter(outcome => outcome.status === 'fulfilled')
    .map(outcome => outcome.value);
    console.log('Survived tasks', survived);
}

runTasks();