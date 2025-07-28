import { connectMqtt } from "./server/connect";
const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const spaceId = process.env.MP_SPACE_ID;
const key = process.env.MP_API_KEY;
showcase.src = `bundle/showcase.html?m=${spaceId}&play=1&qs=1&log=0&applicationKey=${key}`;
const showcaseWindow = showcase.contentWindow;

// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}
showcase.addEventListener('load', async function() {
  try {
    await showcaseWindow.MP_SDK.connect(showcase, key, '3.6')
    showcase.contentWindow.postMessage('hello from parent','*')
    connectMqtt();
  }
  catch(e) {
    console.error(e);
    return;
  }
});

