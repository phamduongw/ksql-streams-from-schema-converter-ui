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

import { downloadFile } from '~/utils';

const Download = () => {
  const procName = useSelector(procNameSelector);
  const sqlStatement = useSelector(sqlStatementSelector);

  const handleDownload = () => {
    downloadFile('text/sql', `${procName}.sql`, sqlStatement);
  };

  return (
    <div className="col p-2 d-flex justify-content-center">
      <button type="button" onClick={handleDownload} className="btn btn-danger">
        Download
      </button>
    </div>
  );
};

const Generate = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const blobDelim = useSelector(blobDelimSelector);
  const procData = useSelector(procDataSelector);

  const handleGetEtlData = async () => {
    const { stmtRaw, stmtMapped, stmtMultival, stmtSink, stmtDdl } =
      await getEtlPipeline(
        procName,
        schemaName,
        procType,
        blobDelim,
        procData.filter((item) => item.name !== ''),
      );

    const statements = [
      stmtRaw,
      stmtMapped,
      stmtMultival,
      stmtSink,
      stmtDdl,
    ].filter((statement) => statement !== undefined);

    console.log(statements);

    dispatch(setSqlStatement(statements.join('\n\n')));
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

const GetData = () => {
  const dispatch = useDispatch();
  const schemaName = useSelector(schemaNameSelector);

  const handleGetEtlData = async () => {
    let data = await getProcDataByKey(schemaName);
    dispatch(setProcData(data));
    dispatch(setCopyOfProcData());
  };
  return (
    <div className="col p-2 d-flex justify-content-center">
      <button
        type="button"
        onClick={handleGetEtlData}
        className="btn btn-primary"
      >
        Get data
      </button>
    </div>
  );
};

const Button = () => (
  <div className="row">
    <GetData />
    <Generate />
    <AddField />
    <Download />
  </div>
);

export default Button;
