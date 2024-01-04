import axios from 'axios';

// Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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

// Services
const getProcDataByKey = async (schemaName) => {
  const config = {
    method: 'get',
    url: `/api/proc-data?schemaName=${schemaName}`,
  };

  const data = await makeRequest(config, 'getProcDataByKey');

  if (!data) {
    alert('Table not found!');
  }

  return data.fields
    .filter((field) => {
      field.should_parse_sv = '';
      field.should_parse_vm = '';
      field.should_parse_vs = '';
      field.transformation = '';
      field.nested = '';
      return field.aliases[0].startsWith('c');
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
      collectionName: import.meta.env.VITE_COLLECTION_NAME,
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
    url: `/api/template/all?collectionName=${
      import.meta.env.VITE_COLLECTION_NAME
    }`,
  };

  return await makeRequest(config, 'getAllTemplates');
};

const updateAllTemplates = async (templateData) => {
  const config = {
    method: 'put',
    url: '/api/template/all',
    data: {
      collectionName: import.meta.env.VITE_COLLECTION_NAME,
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
