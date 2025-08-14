function usrIMG(nombre) {
  const imageUrl = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(nombre)}`;
  return imageUrl;
}

module.exports = usrIMG;