import type { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './index.module.scss';

const HawkeSearch: NextPage = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-end mt-3">
          ^ Search for something
        </Col>
      </Row>
    </Container>
  );
};

export default HawkeSearch;
