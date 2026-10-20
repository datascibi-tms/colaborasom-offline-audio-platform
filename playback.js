function playback(event) {
  //    canal 1
  var v1 = document.getElementById('sld1').value;
  dadoSecao.canais.c1.volume = v1;
  var playSound1 = ctx.createBufferSource();
  playSound1.buffer = audio1;
  ///// volume do canal do node da web audio api
  var gain1 = ctx.createGain();
  playSound1.connect(gain1);
  gain1.connect(ctx.destination);
  //gain1.connect(dest);
  gain1.gain.value = v1;

  //////////// keypresses
  ////osund press 1
  if (event.keyCode == "65") {
    playSound1.start(ctx.currentTime);
  } elseif (event.keyCode == "68") {
    playSound2.start(ctx.currentTime);
  }
}
