const stars = document.querySelectorAll(".comment-stars img");

function rateFilm(rate) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("active-star");
  }
  for (let i = 0; i < rate; i++) {
    stars[i].classList.add("active-star");
  }
}

function sendRate(e) {
  e.preventDefault();
  const activeStars = document.querySelectorAll(".active-star").length;
  const commentText = document.querySelector("#comment-text").value;
  const author = document.querySelector("#comment-author").value;
  const film = document.querySelector("#comment-film").value;
  console.log(activeStars, commentText, author, film);
  if (activeStars > 0) {
    axios
      .post("/api/rate", {
        rate: activeStars,
        text: commentText,
        authorId: author,
        filmId: film,
      })
      .then((data) => {
        if (data.status == 200) {
          location.reload();
        }
      });
  }
}
