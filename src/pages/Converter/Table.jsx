import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { copyOfProcDataSelector, updateProcData } from '~/redux/converterSlice';

const FIELDS = [
  'Name',
  'Alias',
  'Data Type',
  'Doc',
  'SV',
  'VM',
  'VS',
  'Transformation',
  'Nested',
];

const TRANS = [
  'string-join',
  'parse_date',
  'parse_timestamp',
  'substring',
  '[1]',
];

const InputField = ({
  copyOfProcData,
  index,
  field,
  initValue,
  isCheckbox,
  isUpperCase,
  style,
}) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [copyOfProcData]);

  const handleChangeValue = (event) => {
    const newValue = isCheckbox ? event.target.checked : event.target.value;
    setValue(isUpperCase ? newValue.toUpperCase() : newValue);
    dispatch(
      updateProcData({
        index,
        field,
        value: isUpperCase ? newValue.toUpperCase() : newValue,
      }),
    );
  };

  const inputProps = {
    type: isCheckbox ? 'checkbox' : 'text',
    value: isCheckbox ? undefined : value,
    checked: isCheckbox ? value : undefined,
    onChange: handleChangeValue,
    style,
    className: isCheckbox ? 'form-check-input' : 'form-control',
  };

  return <input {...inputProps} />;
};

const SelectField = ({ copyOfProcData, index, field, initValue }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [copyOfProcData]);

  const handleChangeValue = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    dispatch(
      updateProcData({
        index,
        field,
        value: newValue,
      }),
    );
  };

  return (
    <select value={value} onChange={handleChangeValue} className="form-select">
      <option value="string">string</option>
      <option value="double">number</option>
    </select>
  );
};

const DatalistField = ({ copyOfProcData, index, field, initValue }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [copyOfProcData]);

  const handleChangeValue = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    dispatch(
      updateProcData({
        index,
        field,
        value: newValue,
      }),
    );
  };

  return (
    <>
      <input
        type="text"
        list={index}
        value={value}
        onChange={handleChangeValue}
        className="form-control"
      />
      <datalist id={index}>
        {TRANS.map((tran) => (
          <option key={tran}>{tran}</option>
        ))}
      </datalist>
    </>
  );
};

const Table = () => {
  const copyOfProcData = useSelector(copyOfProcDataSelector);
  return (
    <div className="table-responsive" style={{ maxHeight: '100vh' }}>
      <table className="table">
        <thead>
          <tr>
            {FIELDS.map((field) => (
              <th key={field} className="text-center">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {copyOfProcData.map(
            (
              {
                name,
                aliases,
                type,
                doc,
                should_parse_sv,
                should_parse_vm,
                should_parse_vs,
                transformation,
                nested,
              },
              index,
            ) => (
              <tr key={index}>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="name"
                    initValue={name}
                    isUpperCase={true}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="aliases"
                    initValue={aliases[0]}
                    style={{ marginTop: 0, height: '38px', width: '95px' }}
                  />
                </td>
                <td>
                  <SelectField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="type"
                    initValue={type[1]}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="doc"
                    initValue={doc}
                    style={{ marginTop: 0, height: '38px', width: '60px' }}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    type="checkbox"
                    index={index}
                    field="should_parse_sv"
                    initValue={should_parse_sv}
                    isCheckbox={true}
                    style={{ marginTop: 0, height: '38px', width: '38px' }}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    type="checkbox"
                    index={index}
                    field="should_parse_vm"
                    initValue={should_parse_vm}
                    isCheckbox={true}
                    style={{ marginTop: 0, height: '38px', width: '38px' }}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    type="checkbox"
                    index={index}
                    field="should_parse_vs"
                    initValue={should_parse_vs}
                    isCheckbox={true}
                    style={{ marginTop: 0, height: '38px', width: '38px' }}
                  />
                </td>
                <td>
                  <DatalistField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="transformation"
                    initValue={transformation}
                  />
                </td>
                <td>
                  <InputField
                    copyOfProcData={copyOfProcData}
                    index={index}
                    field="nested"
                    initValue={nested}
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
