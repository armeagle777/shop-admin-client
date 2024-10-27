export const getContainerStyles = (isDarkMode) => ({
  width: '25%',
  alignItems: 'center',
  padding: '10px 8px',
  backgroundImage: isDarkMode
    ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
    : '',
  backgroundColor: !isDarkMode ? 'rgb(245, 245, 245)' : '',
});
