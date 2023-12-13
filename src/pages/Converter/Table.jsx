import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { etlDataSelector } from '../../redux/slices/converterSlice';

const Table = () => {
  const tbodyRef = useRef();
  const etlData = useSelector(etlDataSelector);

  const resetTableContent = () => {
    if (tbodyRef.current) {
      tbodyRef.current.innerHTML = '';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Alias</th>
            <th className="text-center">Data Type</th>
            <th className="text-center">Doc</th>
            <th className="text-center">SV</th>
            <th className="text-center">MV</th>
            <th className="text-center">Transformation</th>
          </tr>
        </thead>
        <tbody id="tbody" ref={tbodyRef}>
          {resetTableContent()}
          {etlData.map((data) => {
            const rowData = {
              name: data.name,
              aliases: data.aliases[0],
              type: data.type[1],
              doc: data.doc,
              should_parse_sv: data.should_parse_sv,
              should_parse_mv: data.should_parse_mv,
              transformation: data.should_parse_mv,
            };

            const newRow = document.createElement('tr');

            for (const [key, value] of Object.entries(rowData)) {
              const cell = document.createElement('td');

              if (key === 'type') {
                const select = document.createElement('select');
                select.style.width = '110px';
                select.className = 'form-select';

                const types = ['string', 'number'];

                for (const type of types) {
                  const option = document.createElement('option');
                  option.textContent = type;
                  option.value = type;

                  if (type === value) {
                    option.selected = true;
                  }

                  select.appendChild(option);
                }

                cell.appendChild(select);
              } else if (key === 'transformation') {
                const input = document.createElement('input');
                input.className = 'form-control';
                input.setAttribute('list', rowData['name']);
                const datalist = document.createElement('datalist');
                datalist.id = rowData['name'];
                const formats = [
                  'string-join',
                  'parse date',
                  'parse timestamp',
                ];
                for (const format of formats) {
                  const option = document.createElement('option');
                  option.textContent = format;
                  option.value = format;
                  datalist.appendChild(option);
                }
                cell.appendChild(input);
                cell.appendChild(datalist);
              } else {
                const input = document.createElement('input');
                input.value = value;

                if (key === 'should_parse_sv' || key === 'should_parse_mv') {
                  input.type = 'checkbox';
                  input.checked = value;
                  input.className = 'form-check-input';
                  input.style.marginTop = '0';
                  input.style.height = '38px';
                  input.style.width = '38px';
                } else {
                  input.type = 'text';
                  input.className = 'form-control';
                }

                cell.appendChild(input);
              }

              newRow.appendChild(cell);
            }

            tbodyRef.current.appendChild(newRow);
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
