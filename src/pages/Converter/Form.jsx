import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  blobDelimSelector,
  setProcName,
  setSchemaName,
  setProcType,
  setBlobDelimiter,
} from '~/redux/converterSlice';

const Form = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);
  const blobDelim = useSelector(blobDelimSelector);

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
    <div className="row mt-2">
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
          <option value="XML">XML</option>
          <option value="BLOB">BLOB</option>
        </select>
      </div>
      <div className={`col ${procType == 'BLOB' ? 'd-block' : 'd-none'}`}>
        <input
          type="text"
          placeholder="BLOB delimiter"
          value={blobDelim}
          onChange={handleBLOBDelimiter}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default Form;
