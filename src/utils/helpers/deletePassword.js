// delete password from documents
function deletePassword(doc) {
  console.log(doc);
  const object = doc.toObject();
  delete object.password;
  delete object.__v;
  return object;
}

module.exports = deletePassword;
