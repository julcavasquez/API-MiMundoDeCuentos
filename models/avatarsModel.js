exports.getAllAvatars = (req) => {
  return [
    { id: 1, nombre: "Dragón Rojo", url: `${req.protocol}://${req.get('host')}/avatars/dragon.png` },
    { id: 2, nombre: "Unicornio", url: `${req.protocol}://${req.get('host')}/avatars/unicornio.png` },
    { id: 3, nombre: "Fénix", url: `${req.protocol}://${req.get('host')}/avatars/fenix.png` },
    { id: 4, nombre: "Grifo", url: `${req.protocol}://${req.get('host')}/avatars/grifo.png` }
  ];
};