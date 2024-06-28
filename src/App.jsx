import AppNavigator from './infrastructure/navigation/app.navigator'
import {AuthenticationContextProvider} from './services/authentication/authentication.context'
function App() {
  return (
    <div>
      <AuthenticationContextProvider>
      <AppNavigator />
      </AuthenticationContextProvider>
    </div>
  );
}

export default App;
