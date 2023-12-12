import { useDispatch, useSelector } from 'react-redux';

import {
  procNameSelector,
  schemaNameSelector,
  procTypeSelector,
  setEtlData,
} from '~/redux/slices/converterSlice';

import { getEtlData } from '~/services';

const Button = () => {
  const dispatch = useDispatch();

  const procName = useSelector(procNameSelector);
  const schemaName = useSelector(schemaNameSelector);
  const procType = useSelector(procTypeSelector);

  const handleGetEtlData = async () => {
    let data = await getEtlData(procName, schemaName, procType);
    dispatch(setEtlData(data));
  };

  return (
    <div className="row">
      <div className="col p-4 d-flex justify-content-center">
        <button
          type="button"
          onClick={handleGetEtlData}
          className="btn btn-primary"
        >
          Get ETL data
        </button>
      </div>
      <div className="col p-4 d-flex justify-content-center">
        <button type="button" className="btn btn-success">
          Generate ETL pipeline
        </button>
      </div>
    </div>
  );
};

export default Button;
