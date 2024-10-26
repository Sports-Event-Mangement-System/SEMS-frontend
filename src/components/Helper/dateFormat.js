export const dateFormatBackend = (date) => {
    if (!date) return null;
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(localDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
    console.log(formattedDate);
    return formattedDate;
};

export const dateFormatFrontend = (date) => {
    if (!date) return null;
    
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options); 
    
    return formattedDate;
  };