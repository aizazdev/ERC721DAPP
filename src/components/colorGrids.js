import React, { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { GlobalContext } from '../Context/colorContext';

const ColorGrids = () => {
    const { colors } = useContext(GlobalContext);
    console.log(colors);
    return (
        <Container>
            <Row>
                {colors.map((c, ind) => {
                    return (
                        <Col key={ind} xs={3} md={3} style={{
                            height: "150px",
                            borderRadius: "100%",
                            background: `${c}`,
                            position: "relative",
                            color: "white"
                        }}>
                            <h2 style={{
                                position: "absolute",
                                top: "50%",
                                right: "50%"
                            }}>
                                <h1>{ind}</h1>
                                {c} | 
                            </h2>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
export default ColorGrids;