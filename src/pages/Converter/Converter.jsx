import Form from './Form';
import Button from './Button';
import Table from './Table';

const Converter = () => {
  return (
    <main className="container-fluid p-3" style={{ overflowX: 'hidden' }}>
      <Form />
      {/* <div className="row">
        <div className="col-sm-7">
          <Table />
        </div>
        <div className="col-sm-5">
          <Button />
        </div>
      </div> */}
      <Table />
    </main>
  );
};

export default Converter;
