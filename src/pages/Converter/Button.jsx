import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  blobDelimiterSelector,
  procDataSelector,
  sqlStatementSelector,
  setProcData,
  setCopyOfProcData,
  setSqlStatement,
} from '~/redux/slices/converterSlice';

import { getProcDataByKey, getEtlPipeline } from '~/services';

const Generate = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const blobDelimiter = useSelector(blobDelimiterSelector);
  const procData = useSelector(procDataSelector);

  const handleGetEtlData = async () => {
    let { stmtRaw, stmtMapped, stmtMultival, stmtSink } = await getEtlPipeline(
      procName,
      schemaName,
      procType,
      blobDelimiter,
      procData,
    );

    const statements = [stmtRaw, stmtMapped, stmtMultival, stmtSink].filter(
      (stmt) => stmt !== null,
    );

    dispatch(setSqlStatement(statements.join('\n')));
  };

  return (
    <div className="col p-2 d-flex justify-content-center">
      <button
        type="button"
        onClick={handleGetEtlData}
        className="btn btn-secondary"
      >
        Generate ETL pipeline
      </button>
    </div>
  );
};

const Button = () => {
  const dispatch = useDispatch();

  const schemaName = useSelector(schemaNameSelector);
  const sqlStatement = useSelector(sqlStatementSelector);

  const handleGetEtlData = async () => {
    let data = await getProcDataByKey(schemaName);
    dispatch(setProcData(data));
    dispatch(setCopyOfProcData());
  };

  const handleDownload = () => {
    const blob = new Blob([sqlStatement], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schemaName.toUpperCase()}.sql`;
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
      <Generate />
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
