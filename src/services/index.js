import axios from 'axios';

const getEtlData = async (procName, schemaName, procType) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost/api/etl-data?procName=${procName.toUpperCase()}&schemaName=${schemaName.toUpperCase()}&procType=${procType}`,
  };
  try {
    const response = await axios.request(config);
    return response.data.fields
      .filter((x) => {
        x.should_parse_sv = '';
        x.should_parse_mv = '';
        x.transformation = '';
        return x.aliases[0].startsWith('c');
      })
      .sort((a, b) => {
        const extractTag = (str) => parseInt(str.replace(/c(\d+).*/, '$1'));
        return extractTag(a.aliases[0]) - extractTag(b.aliases[0]);
      });
  } catch (error) {
    console.log(error);
  }
};

export { getEtlData };
