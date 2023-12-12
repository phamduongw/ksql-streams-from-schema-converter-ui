import axios from 'axios';

const getEtlData = async (procName, schemaName, procType) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost/etl-proc?procName=${procName.toUpperCase()}&schemaName=${schemaName.toUpperCase()}&procType=${procType}`,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getEtlData };
