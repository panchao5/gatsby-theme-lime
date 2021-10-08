export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  const previouslyFocusedElement = document.activeElement;

  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  const success = document.execCommand("copy");
  el.remove();

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }

  if (previouslyFocusedElement) {
    // @ts-ignore
    previouslyFocusedElement.focus();
  }

  return success;
};

export default copyToClipboard;
