import { Col, Row } from 'react-bootstrap';
import TableRow from '../../features/TableRow/TableRow.js';
import { useSelector } from 'react-redux';
import { getLoading } from '../../../redux/loadingRedux';

const Home = () => {
  const loading = useSelector(getLoading);
  return (
    <>
      <Row className="mb-2 mt-2 justify-content-md-center">
        <Col xs={10}>
          <h1 className="display-6">All tables</h1>
        </Col>
      </Row>
      {loading ? " " : <TableRow />}
    </>
  );
};

export default Home;
