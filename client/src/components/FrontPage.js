import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FaDumbbell, FaChartLine } from "react-icons/fa";

const FrontPage = () => (
  <>
    <Container className="mw-100 mx-0 px-0">
    <Carousel indicators={false}>
    <Carousel.Item>
    <div className="hero" id="hero1">
        <div className="overlay">
        <Row className="justify-content-center h-100 d-flex align-items-center">
            <Col className="text-center">
                <h1 className="header">Own Your Workout</h1>
            </Col>
        </Row>
        </div>
    </div>
    </Carousel.Item>
    <Carousel.Item>
    <div className="hero" id="hero2">
    <div className="overlay">
        <Row className="justify-content-center h-100 d-flex align-items-center">
            <Col className="text-center">
                <h1 className="header">Make Smart Decisions</h1>
            </Col>
        </Row>
        </div>
    </div>
    </Carousel.Item>
    
    <Carousel.Item>
    <div className="hero" id="hero3">
    <div className="overlay">
        <Row className="justify-content-center h-100 d-flex align-items-center">
            <Col className="text-center">
                <h1 className="header">See Results</h1>
            </Col>
        </Row>
        </div>
    </div>
    </Carousel.Item>
    
    </Carousel>
    </Container>
    <Container className="mw-100">
      <Row className="justify-content-center blurb">
        <Col className="py-5" xs={12} sm={8}>
          <p
            className="text-center"
            style={{ fontSize: "1.5rem", fontWeight: 300 }}
          >
            Liftify is a smart workout partner that uses the principles of
            progressive overload to make sure you maximize your potential.
          </p>
        </Col>
      </Row>
      <Row className="content-1 px-3 py-5 p-md-4">
        <Col xs={12} sm={8}>
          <Row>
            <Col xs={2} className="d-flex align-items-center px-0">
              <FaDumbbell className="front-page-icon" />
            </Col>
            <Col xs={10}>
              <h3 className="front-page-header header py-0 my-0">Starts where you do.</h3>
              <p className="front-page-p py-0">
                Liftify asks where you're currently at with your strength and
                builds your program accordingly.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="content-2 px-3 py-4 p-md-4 d-flex align-items-end justify-content-end">
        <Col xs={12} sm={8} className="text-right">
          <Row className="px-0 justify-content-end">
            <Col xs={9} className="mr-1">
              <h3 className="front-page-header header py-0 my-0">Grows at your pace.</h3>
              <p className="front-page-p py-0">
                Liftify will adapt your next week's workout based on how you did
                this week.
              </p>
            </Col>
            <Col xs={2} className="d-flex align-items-center px-0 mx-0">
              <FaChartLine className="front-page-icon" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);

export default FrontPage;
