import { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { abi, address } from '../abi/abi';
import { GlobalContext } from '../Context/colorContext';
import { Form, Label, Button, Container, Row, Col } from 'react-bootstrap';

const AddColor = () => {

    const { colors, colorInput } = useContext(GlobalContext);
    console.log(colors);
    const [contract, setContract] = useState('');
    const [accounts, setAccounts] = useState('');
    const [iColor, setIColor] = useState([]);

    useEffect(() => {
        const loadBlockchain = async () => {
            console.log("Web3 = ",Web3);
            console.log("Web3.givenProvider = ",Web3.givenProvider);
            try {
                if (Web3.givenProvider) {
                    const web3 = new Web3(Web3.givenProvider);
                    await Web3.givenProvider.enable();
                    const account = await web3.eth.getAccounts();
                    setAccounts(account[0]);
                    const contract = new web3.eth.Contract(abi, address);
                    setContract(contract);
                    const name = await contract.methods.name().call();
                    const total = await contract.methods.totalSupply().call();
                    console.log(name, total);
                    for (let i = 0; i <= total; i++) {
                        const c = await contract.methods.color(i).call({ from: account[0] });
                        colorInput(c);
                        console.log(c);
                    }
                }
                else {
                    console.log("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
                }
            }
            catch (error) {
                console.log("Error in loading Web3 = ", error);
            }
        }
        loadBlockchain();
    }, []);
    const formSubmit = (e) => {
        e.preventDefault();
        asyncColorInput(iColor);
    }
    console.log(accounts);
    const asyncColorInput = async (c) => {
        const receipt = await contract.methods.inputColor(c).send({ from: accounts });
    }

    return (
        <Container><br />
            <h3>Online : {accounts}</h3>
            <Row>
                <Col md={{ span: 6, offset: 5 }}>
                    <>
                        <Form onSubmit={formSubmit}>
                            <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                            <Form.Control
                                style={{ height: "100px", width: "100px" }}
                                type="color"
                                id="exampleColorInput"
                                onChange={(e) => setIColor(e.target.value)}
                                defaultValue="#563d7c"
                                title="Choose your color"
                            /><br />
                            <Button variant="primary" type="submit">
                                Add Nft
                            </Button>
                        </Form>
                    </>
                </Col>
            </Row>
        </Container>

    );
}

export default AddColor;
