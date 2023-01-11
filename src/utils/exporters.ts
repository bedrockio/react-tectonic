export const downloadImage = (svg, width, height, filename) => {
  return new Promise((resolve, reject) => {
    reject(new Error("Not Implemented"));
    /*
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");

    // Set background to white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    let xml = new XMLSerializer().serializeToString(svg);
    let dataUrl = "data:image/svg+xml;utf8," + encodeURIComponent(xml);
    let img = new Image(width, height);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          saveFile(filename, new Blob([blob], { type: "image/png" }));
          resolve();
        },
        "image/png",
        1
      );
    };

    img.onerror = () => reject();

    img.src = dataUrl;
    */
  });
};

export const exportToCsv = (headers, data, filename) => {
  const csvData = [headers, ...data].map((row) => `${row.join(",")}\r\n`);
  saveFile(filename, new Blob(csvData, { type: "text/csv" }));
};

export const saveFile = (filename, blob) => {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(blob);

  // Use download attribute to set set desired file name
  a.setAttribute("download", filename);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};
