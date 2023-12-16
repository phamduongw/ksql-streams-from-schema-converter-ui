import axios from 'axios';

const BASE_URL = 'http://192.168.100.82:8080';
const COLLECTION_NAME = 'test_stream_templates';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleAxiosError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error.message);
  throw error;
};

const makeRequest = async (config, functionName) => {
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    handleAxiosError(error, functionName);
  }
};

const getProcDataByKey = async (schemaName) => {
  const config = {
    method: 'get',
    url: `/api/proc-data?schemaName=${schemaName.toUpperCase()}`,
  };

  const data = await makeRequest(config, 'getProcDataByKey');

  return data.fields
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
};

const getEtlPipeline = async (
  procName,
  schemaName,
  procType,
  blobDelim,
  procData,
) => {
  const config = {
    method: 'post',
    url: '/api/etl-pipeline',
    data: {
      collectionName: COLLECTION_NAME,
      procName,
      schemaName,
      procType,
      blobDelim,
      procData,
    },
  };

  return await makeRequest(config, 'getEtlPipeline');
};

const getAllTemplates = async () => {
  const config = {
    method: 'get',
    url: `/api/template/all?collectionName=${COLLECTION_NAME}`,
  };

  return await makeRequest(config, 'getAllTemplates');
};

const updateAllTemplates = async (templateData) => {
  const config = {
    method: 'put',
    url: '/api/template/all',
    data: {
      collectionName: COLLECTION_NAME,
      templateData,
    },
  };

  return await makeRequest(config, 'updateAllTemplates');
};

export {
  getProcDataByKey,
  getEtlPipeline,
  getAllTemplates,
  updateAllTemplates,
};
