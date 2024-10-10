export const dateFormatBackend = (date) => {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    return formattedDate;
};
export const dateFormatFrontend = (date) => {
    if (!date) return null;
    
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options); 
    
    return formattedDate;
  };