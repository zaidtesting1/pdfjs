
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.endsWith(".pdf")) {
    return res.status(400).send("Invalid PDF URL");
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=document.pdf");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Failed to fetch PDF");
  }
}
