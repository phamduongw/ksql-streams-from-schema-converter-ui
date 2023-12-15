import Table from './Table';
import Form from './Form';
import Button from './Button';
import SqlGenerator from './SqlGenerator';

const Converter = () => (
  <main className="container-fluid">
    <div className="row">
      <div className="col-sm-7">
        <Table />
      </div>
      <div className="col-sm-5">
        <Form />
        <Button />
        <SqlGenerator />
      </div>
    </div>
  </main>
);

export default Converter;
