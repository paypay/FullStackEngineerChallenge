export const dateRenderer = (dateString) => {
    if (dateString) {
        const d = new Date(dateString);
        return d.toLocaleDateString("en-US");
    }
    return dateString;
};