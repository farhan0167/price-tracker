
import './App.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig)

function App() {
  
  return (
    <div className="App">
      <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <p>Welcome {user.username}</p>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
      </Authenticator>
    </div>
  );
}

export default App;


//https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/authenticate-react-application-users-by-using-amazon-cognito-and-aws-amplify.html
//https://www.youtube.com/watch?v=g4qKydnd0vU&ab_channel=CompleteCoding