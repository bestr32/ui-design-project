// Function in script.js

let music_player = document.querySelector(".music-player");
let search_results_div = document.getElementById("video-search-results");

let music = document.getElementById("audio-player");
let thumbnail = document.getElementById("thumbnail");

window.onload = (event) => {
  fetch_music("chart", "getTopTracks").then((data) => {
    console.log(data);
    get_music_list(data);

    const event = new CustomEvent("my-event", { detail: data });
    document.querySelector(".music-player").dispatchEvent(event);
  });
};

const append_children = (parent, children = []) => {
  for (const child of children) {
    parent.appendChild(child);
  }
};

const fetch_audio_track_blobbed = async (url_link) => {
  const audio = await fetch(url_link, {
    headers: { "Accept-Ranges": "bytes" },
  });

  const blob = await audio.blob();

  return blob;
};

const progress_bar_logic = (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let length = document.getElementById("progress-bar").offsetWidth;

  document.getElementById("progress-line").style.width = `${
    (x / length) * 100
  }%`;

  music.currentTime = (x / length) * music.duration;
};

const progress_bar_time_updater = () => {
  document
    .getElementById("progress-bar")
    .addEventListener("click", progress_bar_logic);

  music.ontimeupdate = function () {
    document.getElementById("progress-line").style.width = `${
      (music.currentTime / music.duration) * 100
    }%`;

    document.getElementById("current-track-time").textContent = convert_time(
      music.currentTime
    );
    document.getElementById("track-duration").textContent = convert_time(
      music.duration
    );
  };
};

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`http://localhost:3000/track?title=${e.target[0].value}`)
    .then((res) => res.json())
    .then((data) => {
      search_results_div.textContent = "";

      for (const video of data) {
        console.log(video);

        const video_data_div = create_element("div", ["video-card"]);
        const video_title = create_element("h2", ["video-title"], video.title);
        const video_duration = create_element(
          "p",
          ["video-duration"],
          video.duration_raw
        );

        const video_thumbnail = create_element("img", ["video-thumbnail"]);
        video_thumbnail.src = video.snippet.thumbnails.url;

        append_children(video_data_div, [
          video_title,
          video_duration,
          video_thumbnail,
        ]);

        const link_wrapper = create_element("a", ["link-wrapper"]);
        link_wrapper.href = `http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`;

        link_wrapper.addEventListener("click", async function (e) {
          e.preventDefault();

          const blob = await fetch_audio_track_blobbed(
            `http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`
          );

          if (blob) music.setAttribute("src", URL.createObjectURL(blob));

          document.getElementById("title-track").textContent = video.title;

          music.onloadedmetadata = progress_bar_time_updater;

          search_results_div.classList.add("hide-element");

          document
            .getElementById("aside-search-results")
            .classList.toggle("hide-element");

          display_is_pausing();

          search_results_div.style.overflowY = "none";
        });

        link_wrapper.appendChild(video_data_div);

        search_results_div.style.overflowY = "scroll";
        search_results_div.appendChild(link_wrapper);
      }
    });

  e.target.reset();
});

document
  .getElementById("aside-search-results")
  .addEventListener("click", () => {
    search_results_div.classList.toggle("hide-element");
    search_results_div.style.overflowY = "scroll";
    document
      .getElementById("aside-search-results")
      .classList.toggle("hide-element");
  });
