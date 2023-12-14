import axios from 'axios';

const getProcDataByKey = async (schemaName) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost/api/proc-data?schemaName=${schemaName.toUpperCase()}`,
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
    console.error('Error in getProcDataByKey:', error.message);
    throw error;
  }
};

const getEtlPipeline = async (
  procName,
  schemaName,
  procType,
  blobDelimiter,
  procData,
) => {
  try {
    const response = await axios.post(
      'http://localhost/api/etl-pipeline',
      {
        procName,
        schemaName,
        procType,
        blobDelimiter,
        procData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error in getEtlPipeline:', error.message);
    throw error;
  }
};

export { getProcDataByKey, getEtlPipeline };
