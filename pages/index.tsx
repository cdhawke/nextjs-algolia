import type { NextPage } from 'next';
import { Form, Container, Row, Col } from 'react-bootstrap';

const HawkeSearch: NextPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Form
            action="/search"
            method="GET"
            role="search"
            className="d-flex align-items-center"
          ></Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HawkeSearch;
