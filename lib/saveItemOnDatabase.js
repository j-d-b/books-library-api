const saveItemOnDatabase = (name, callback) => {
  const persistTime = Math.floor(Math.random() * name.length * 100);
  setTimeout(() => callback({ [name]: persistTime }), persistTime);
};

module.exports = saveItemOnDatabase;
