const today = new Date();
const numberOfDaysToAdd = 1;
const date = today.setDate(today.getDate() + numberOfDaysToAdd);
const defaultValue = new Date(date).toISOString().split('T')[0]


export default defaultValue;