"use strict";

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

console.log("doors open");
setTimeout(() => console.log("encore"), 1000);
setTimeout(() => console.log("soundcheck"), 0);
console.log("main act");
setTimeout(() => console.log("intermission"), 500);
console.log("lights down");

// Your prediction:
// 1. "doors open"
// 2. "main act"
// 3. "lights down"
// 4. "soundcheck"
// 5. "intermission"
// 6. "encore"

//Deliberate blocking:
//After clicking the Block button, the page other buttons didn't respond for 5 seconds.
//I couldn't click the shuffle button or the form submit button.
//I also couldn't select text during that time.
// The console logged "Blocking loop finished" after the 5 seconds. This is because the
// blocking loop is running on the main thread, which prevents any other code from
// executing until it finishes.

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

// function prepare(artist) {
//   return "Now playing " + format(artist);
// }
// function format(artist) {
//   return artist.name.toUpperCase();
// }
// console.log(prepare({ name: "Asake" }));

// Global context
// push: prepare
// push: format
// pop: format
// pop: prepare
// pop: Global context

// A countdown that displays 10 down to 0 using setInterval(), then stops itself with clearInterval() at zero
let count = 10;
const countdown = setInterval(() => {
  console.log(count);
  count--;
  if(count < 0) {
    clearInterval(countdown);
  }
}, 1200);


// How a single threaded language handles a thousand simultaneous waiting tasks without freezing
// The event loop is a mechanism that allows JavaScript to handle asynchronous operations without blocking the
// main thread. When a task is initiated, such as a network request or a timer, it is placed in the event queue.
// The main thread continues to execute other code while waiting for the task to complete. Once the task is finished,
// its callback function is added to the event queue, and the event loop checks if the main thread is free to execute it.
// This way, JavaScript can manage multiple tasks concurrently without freezing the user interface.