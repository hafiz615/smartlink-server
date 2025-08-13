const handleCoverImageUpload = (req, res) => {
  try {
    console.log(req.file, "uploaded cover image");
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `${process.env.NEXT_BACKEND_URL}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export default handleCoverImageUpload;
