export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(("text_copied") + `: ${text}`);
        })
        .catch(() => {
            console.log(("text_copied_error"));
        });
};

