import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  blobDelimSelector,
  procDataSelector,
  addFieldToProcData,
  sqlStatementSelector,
  setProcData,
  setCopyOfProcData,
  setSqlStatement,
} from '~/redux/converterSlice';

import { getProcDataByKey, getEtlPipeline } from '~/services';

const Generate = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const blobDelim = useSelector(blobDelimSelector);
  const procData = useSelector(procDataSelector);

  const handleGetEtlData = async () => {
    const { stmtRaw, stmtMapped, stmtMultival, stmtSink } =
      await getEtlPipeline(
        procName,
        schemaName,
        procType,
        blobDelim,
        procData.filter((item) => item.name !== ''),
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
        Get pipeline
      </button>
    </div>
  );
};

const AddField = () => {
  const dispatch = useDispatch();

  const scrollTableToBottom = () => {
    const table = document.querySelector('.table-responsive');
    table.scrollTop = table.scrollHeight;
  };

  const handleAddField = () => {
    dispatch(addFieldToProcData());
    dispatch(setCopyOfProcData());
    setTimeout(scrollTableToBottom);
  };

  return (
    <div className="col p-2 d-flex justify-content-center">
      <button
        type="button"
        onClick={handleAddField}
        className="btn btn-success"
      >
        Add field
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
    link.download = `${schemaName}.sql`;
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
          Get data
        </button>
      </div>
      <Generate />
      <AddField />
      <div className="col p-2 d-flex justify-content-center">
        <button
          type="button"
          onClick={handleDownload}
          className="btn btn-danger"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Button;
