import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  blobDelimiterSelector,
  setProcName,
  setSchemaName,
  setProcType,
  setBlobDelimiter,
} from '~/redux/slices/converterSlice';

const Form = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const blobDelimiter = useSelector(blobDelimiterSelector);

  const handleChangeProcName = (event) => {
    dispatch(setProcName(event.target.value));
  };
  const handleChangeSchemaName = (event) => {
    dispatch(setSchemaName(event.target.value));
  };
  const handleChangeDataType = (event) => {
    dispatch(setProcType(event.target.value));
  };
  const handleBLOBDelimiter = (event) => {
    dispatch(setBlobDelimiter(event.target.value));
  };

  return (
    <div className="row gx-5">
      <div className="col">
        <input
          type="text"
          placeholder="ETL proc name"
          value={procName}
          onChange={handleChangeProcName}
          className="form-control"
        />
      </div>
      <div className="col">
        <input
          type="text"
          placeholder="Metadata schema name"
          value={schemaName}
          onChange={handleChangeSchemaName}
          className="form-control"
        />
      </div>
      <div className="col">
        <select
          value={procType}
          onChange={handleChangeDataType}
          className="form-select"
        >
          <option value="xml">XML</option>
          <option value="blob">BLOB</option>
        </select>
        <input
          type="text"
          placeholder="BLOB delimiter"
          value={blobDelimiter}
          onChange={handleBLOBDelimiter}
          className={`form-control ${
            procType == 'blob' ? 'visible' : 'invisible'
          }`}
        />
      </div>
    </div>
  );
};

export default Form;
