const save = async (e) => {
  e.preventDefault();
  let url;
  const userRef = doc(db, "users", user.email);
  if (loading) return;
  if (photo) {
    setLoading(true);
    // upload photo
    const imageRef = ref(storage, `certificates`);
    await uploadString(imageRef, photo, "data_url")
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        url = downloadURL;
        setPhotoUrl(downloadURL);
      })
      .then(async () => {
        let postData = { name, price, stock, photo: url, id: uuidv4() };
        await updateDoc(userRef, {
          products: arrayUnion(postData),
        });
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          localStorage.setItem("user__data", JSON.stringify(docSnap.data()));
          setUser(docSnap.data());
        }
        alert("Successfull Added");
        router.push("/products");
      });
  }
};
