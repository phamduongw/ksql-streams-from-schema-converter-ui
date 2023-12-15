import { useSelector } from 'react-redux';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { sqlStatementSelector } from '~/redux/converterSlice';

const SqlGenerator = () => {
  const sqlStatement = useSelector(sqlStatementSelector);

  const codeStyle = {
    fontSize: '12px',
    maxHeight: '900px',
  };

  return (
    sqlStatement && (
      <SyntaxHighlighter language="sql" style={docco} customStyle={codeStyle}>
        {sqlStatement}
      </SyntaxHighlighter>
    )
  );
};

export default SqlGenerator;
