module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    date.setFullYear(date.getFullYear());
    return date.toLocaleTimeString();
  },
};
