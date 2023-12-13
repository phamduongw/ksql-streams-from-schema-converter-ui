import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  setEtlData,
} from '~/redux/slices/converterSlice';

import { getEtlData } from '~/services';
import { sqlStatementSelector } from '../../redux/slices/converterSlice';

const Button = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const sqlStatement = useSelector(sqlStatementSelector);

  const handleGetEtlData = async () => {
    let data = await getEtlData(procName, schemaName, procType);
    dispatch(setEtlData(data));
  };

  const handleDownload = () => {
    const blob = new Blob([sqlStatement], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="row">
      <div className="col p-2 d-flex justify-content-center">
        <button
          type="button"
          onClick={handleGetEtlData}
          className="btn btn-primary"
        >
          Get ETL data
        </button>
      </div>
      <div className="col p-2 d-flex justify-content-center">
        <button type="button" className="btn btn-secondary">
          Generate ETL pipeline
        </button>
      </div>
      <div className="col p-2 d-flex justify-content-center">
        <button
          type="button"
          onClick={handleDownload}
          className="btn btn-success"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Button;
