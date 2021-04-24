const url = "https://twitch-proxy.freecodecamp.rocks/twitch-api/";

const streamers = ["soflowildlife","AUSTRALISFISHING","Therealshookon3","Splucy","AlecLudford","SteelHorseLive","Rellik","FinaoLive","Murda","LookOutRacing","Hossworth"];

for (const streamer of streamers) {
  Promise.all([
    fetch(url+"streams/"+streamer).then(res=>res.json()),
    fetch(url+"channels/"+streamer).then(res=>res.json())
  ]).then(data => {
    const streaming = data[0];
    const user = data[1];
    $("#streamers_container").append(`
      <div class="user OFFLINE" id=${streamer}>
        <a href=${user.url} target="_blank" class="name">
          <img src=${user.logo} onerror="this.src='https://i.ibb.co/JrvVLxB/hen.jpg'">
          <h2>${user.display_name}</h2></a>
        </a>
        <div class="stream"><h3>Offline</h3></div>
      </div>
    `);
    const id = `#${streamer}`;
    $(id).css("background-image",`url(${user.video_banner}), url(${user.profile_banner})`);
    if (streaming.stream !== null) {
      $(id).removeClass("OFFLINE").addClass("ONLINE");
      $(id+" > .stream").html(`
        <h3>🔴 ${streaming.stream.channel.status}</h3>
        <p class="game">${streaming.stream.game}</p>
      `);
    }
  });
}

const input = "input[name='selector']";
$(input).change(() => {
  $("#container").fadeToggle("fast", () => {
    switch ($(input+":checked").attr("id")) {
      case "ALL":
        $(".ONLINE, .OFFLINE, .stream").show();
        break;
      case "ONLINE":
        $(".ONLINE, .stream").show();
        $(".OFFLINE").hide();
        break;
      case "OFFLINE":
        $(".OFFLINE").show();
        $(".ONLINE, .stream").hide();
    }
  }).fadeToggle("fast");
});
