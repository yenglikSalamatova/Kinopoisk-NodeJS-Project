function saveToWatch(filmId) {
  axios.post("/api/saveToWatch", { filmId }).then((data) => {
    if (data.status == 200) {
      alert(data.data);
      location.reload();
    }
  });
}

function deleteFromToWatch(filmId) {
  axios.delete(`/api/saveToWatch/${filmId}`).then((data) => {
    if (data.status == 200) {
      alert(data.data);
      location.reload();
    }
  });
}
