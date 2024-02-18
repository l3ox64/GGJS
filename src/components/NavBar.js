import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import ThemeButton from "./ThemeButton";



export default function() {
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>GGJS</Navbar.Brand>
        <Navbar.Text>
            <ThemeButton></ThemeButton>
        </Navbar.Text>
      </Container>
    </Navbar>

    )
}