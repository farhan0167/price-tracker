import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Navigation(props) {
  function handleSignOut(e){
    e.preventDefault()
    //Clear the cache
    localStorage.setItem('data', JSON.stringify([]));
    localStorage.setItem('timestamp', 0);
    return props.userSignOut()
  }
  return (

      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>Price Tracker</Navbar.Brand>
          <Button onClick={handleSignOut}>SignOut</Button>
        </Container>
      </Navbar>

  );
}

export default Navigation;