export function parseJDToHTML(jdString: string) {
  return (
    "<ul>" +
    jdString
      .replace(/\b([A-Z][A-Za-z ]+(?: [A-Z][A-Za-z ]+)*):/g, "|$1:")
      .split("|")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) =>
        item.replace(/^([A-Z][A-Za-z ]+(?: [A-Z][A-Za-z ]+)*):/, "<b>$1:</b>")
      )
      .map((point) => `<li>${point}</li>`)
      .join("") +
    "</ul>"
  );
}