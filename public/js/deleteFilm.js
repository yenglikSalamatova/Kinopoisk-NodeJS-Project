function deleteFilm(id, authorId) {
  console.log(id, authorId);
  axios.delete(`/api/films/${id}`).then((data) => {
    if (data.status == 205) {
      location.replace(`/admin/${authorId}`);
    } else if (data.status === 404) {
      location.replace("/not-found");
    }
  });
}
