import { Sanitizer } from "./sanitize.js";

const casesDiv = document.getElementById("cases");
const rendersDiv = document.getElementById("renders");

export class Tester {
  // lookup table for testcase -> HTML element
  displayLookup = new Map();

  constructor() {
    window.addEventListener(
      "message",
      (event) => {
        const id = event.data;
        const display = this.displayLookup.get(id); 
        display.style.color = "red";
      },
      false
    );
  }

  // display a test case, generate a new ID for it, and return its ID
  displayCase(payload, cleaned) {
    const id = crypto.randomUUID();
    const testResult = document.createElement("pre");
    testResult.textContent = payload + "\n" + cleaned;
    // TODO: create an element to display the test case result
    // Use the payload and cleaned string variables to display the string pre- and post- sanitization
    // TODO: Append test case result div with casesDiv.appendChild()
    casesDiv.appendChild(testResult);
    this.displayLookup.set(id, testResult);
    testResult.style.color = "green";
    return id;
  }

  // test one test case
  testOne(payload) {
    let cleaned = Sanitizer.sanitize(payload);
    const id = this.displayCase(payload, cleaned);
    // If alert() is called by our code, post message to parent with test case ID number
    cleaned =
      `<script>function alert(text) { parent.postMessage(${JSON.stringify(
        id
      )}, ${JSON.stringify(location.origin)}); }</script>` + cleaned;
    // Test the payload
    // TODO: Create an iframe, set the srcdoc attribute to the html you want to render, and then render it by appending to the renderDiv
    const iframe = document.createElement('iframe');
    iframe.srcdoc = cleaned;
    rendersDiv.append(iframe);
  }
}
