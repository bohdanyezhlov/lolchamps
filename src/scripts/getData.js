const url = '../data/dataDragonList.json';

const response = await fetch(url);
const data = await response.json();

export default data;
