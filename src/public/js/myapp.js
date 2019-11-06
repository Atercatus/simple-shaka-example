// const manifestUrl = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

const manifestUrl = "/manifest"

function initApp(){
  shaka.polyfill.installAll();

  if(shaka.Player.isBrowserSupported()){
    initPlayer();
  } else{
    console.error("Browser not supported!");
  }
}

function initPlayer(){
  const video = document.getElementById('video');
  const player = new shaka.Player(video);

  window.player = player;

  player.addEventListener('error', onErrorEvent);

  player.load(manifestUrl).then(function(){
    console.log("The video has now been loaded!");
  }).catch(onError);
}

function onErrorEvent(event){
  onError(event.detail);
}

function onError(error){
  console.error("Error code", error.code, 'object', error);
}

document.addEventListener("DOMContentLoaded", initApp);
