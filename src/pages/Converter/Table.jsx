import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { copyOfProcDataSelector, updateProcData } from '~/redux/converterSlice';

const FIELDS = [
  'Name',
  'Alias',
  'Data Type',
  'Doc',
  'SV',
  'MV',
  'Transformation',
];

const TRANS = ['string-join', 'parse date', 'parse timestamp', 'substring'];

const InputField = ({ index, field, initValue, isCheckbox, isUpperCase }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

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
    style: isCheckbox ? { marginTop: 0, height: '38px', width: '38px' } : {},
    className: isCheckbox ? 'form-check-input' : 'form-control',
  };

  return <input {...inputProps} />;
};

const SelectField = ({ index, field, initValue }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

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

const DatalistField = ({ index, field, initValue }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

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
                should_parse_mv,
                transformation,
              },
              index,
            ) => (
              <tr key={index}>
                <td>
                  <InputField
                    index={index}
                    field="name"
                    initValue={name}
                    isUpperCase={true}
                  />
                </td>
                <td>
                  <InputField
                    index={index}
                    field="aliases"
                    initValue={aliases[0]}
                  />
                </td>
                <td>
                  <SelectField index={index} field="type" initValue={type[1]} />
                </td>
                <td>
                  <InputField index={index} field="doc" initValue={doc} />
                </td>
                <td>
                  <InputField
                    type="checkbox"
                    index={index}
                    field="should_parse_sv"
                    initValue={should_parse_sv}
                    isCheckbox={true}
                  />
                </td>
                <td>
                  <InputField
                    type="checkbox"
                    index={index}
                    field="should_parse_mv"
                    initValue={should_parse_mv}
                    isCheckbox={true}
                  />
                </td>
                <td>
                  <DatalistField
                    index={index}
                    field="transformation"
                    initValue={transformation}
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
