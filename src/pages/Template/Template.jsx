import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllTemplates } from '~/services';

import {
  templateDataSelector,
  setCopyOfTemplateData,
  setTemplateData,
  copyOfTemplateDataSelector,
  updateTemplateData,
  addTemplateData,
} from '~/redux/templateSlice';
import { updateAllTemplates } from '../../services';

const TextField = ({ index, field, initValue, type }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);

  const handleChangeValue = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    dispatch(
      updateTemplateData({
        index,
        field,
        value: newValue,
      }),
    );
  };

  const inputProps = {
    type,
    value,
    onChange: handleChangeValue,
    className: 'form-control',
  };

  return type ? (
    <input {...inputProps} />
  ) : (
    <textarea rows="10" {...inputProps} />
  );
};

const UpdateButton = ({ fetchData }) => {
  const templateData = useSelector(templateDataSelector);

  const handleSaveTemplate = async () => {
    await updateAllTemplates(templateData);
    fetchData();
  };

  return (
    <button onClick={handleSaveTemplate} className="btn btn-primary">
      Save Templates
    </button>
  );
};

const Template = () => {
  const dispatch = useDispatch();

  const copyOfTemplateData = useSelector(copyOfTemplateDataSelector);

  const fetchData = useCallback(async () => {
    try {
      const data = setTemplateData(await getAllTemplates());
      dispatch(setTemplateData(data.payload));
      dispatch(setCopyOfTemplateData());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTemplate = () => {
    dispatch(addTemplateData());
  };

  return (
    <main className="container-fluid">
      <table className="table">
        <thead style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <tr>
            <th scope="col">KEY</th>
            <th scope="col">
              <div className="d-flex justify-content-between align-items-center">
                <span>TEMPLATE</span>
                <UpdateButton fetchData={fetchData} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {copyOfTemplateData?.map(({ template_name, template }, index) => (
            <tr key={index}>
              <td>
                <TextField
                  index={index}
                  field="template_name"
                  initValue={template_name}
                  type="text"
                />
              </td>
              <td>
                <TextField
                  index={index}
                  field="template"
                  initValue={template}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center pb-3">
        <button onClick={handleAddTemplate} className="btn btn-success">
          Add Template
        </button>
      </div>
    </main>
  );
};

export default Template;
